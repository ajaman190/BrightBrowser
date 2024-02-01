from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSettingsSerializer
from django.contrib.auth import authenticate
from itsdangerous import URLSafeTimedSerializer as utsr
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from .models import User, UserSettings

SECRET = getattr(settings, 'SECRET', "secret")
ALGO = getattr(settings,'ALGO', 'HS256')
EMAIL_HOST_USER = getattr(settings,'EMAIL_HOST_USER', 'localhost')

# Check the status of the backend.
class BackendStatusView(views.APIView):
    def get(self, request):
        return Response({"message": "Backend is running"}, status=status.HTTP_200_OK)


# Generates and confirms unique tokens for email verification.
class TokenGenerator:
    def __init__(self, secret_key):
        self.secret_key = secret_key
        self.serializer = utsr(self.secret_key)

    def generate_confirmation_token(self, email):
        return self.serializer.dumps(email, salt='email-confirmation-salt')

    def confirm_token(self, token, expiration=3600):
        try:
            email = self.serializer.loads(token, salt='email-confirmation-salt', max_age=expiration)
        except:
            return False
        return email


# Handles user registration and sends email verification link.
class UserRegistrationView(views.APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token_generator = TokenGenerator(settings.SECRET_KEY)
            token = token_generator.generate_confirmation_token(user.email)
            verification_url = request.build_absolute_uri(reverse('email-verify')) + '?token=' + token
            
            send_mail(
                'Verify your email',
                f'Please click on the link to verify your email: {verification_url}',
                EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
            
            return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Handles user login and returns JWT tokens upon successful authentication.
class UserLoginView(views.APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user is not None:
                if user.is_verified:
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "User not verified. Please verify your account."}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Handles email verification via a tokenized link.
class EmailVerifyView(views.APIView):
    def get(self, request):
        token = request.GET.get('token')
        token_generator = TokenGenerator(settings.SECRET_KEY)
        email = token_generator.confirm_token(token)
        if email:
            try:
                user = User.objects.get(email=email)
                user.is_verified = True
                user.save()
                return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

class ResendVerificationEmailView(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        if email:
            try:
                user = User.objects.get(email=email)
                if not user.is_verified:
                    token_generator = TokenGenerator(settings.SECRET_KEY)
                    token = token_generator.generate_confirmation_token(user.email)
                    verification_url = request.build_absolute_uri(reverse('email-verify')) + '?token=' + token
                    
                    send_mail(
                        'Verify your email',
                        f'Please click on the link to verify your email: {verification_url}',
                        EMAIL_HOST_USER,
                        [user.email],
                        fail_silently=False,
                    )
                    return Response({"message": "Verification email resent."}, status=status.HTTP_200_OK)
                return Response({"error": "User already verified."}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

# Retrieve or update a user's settings.
class UserSettingsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        settings = UserSettings.objects.get(user=request.user)
        serializer = UserSettingsSerializer(settings)
        return Response(serializer.data)

    def put(self, request):
        settings = UserSettings.objects.get(user=request.user)
        serializer = UserSettingsSerializer(settings, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
