from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from middleware.auth import Authentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import UserProfile, Whitelist
from .serializers import (UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, WhitelistSerializer, UserDetailSerializer)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"user_id": user.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        return Response(data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([Authentication])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    serializer = UserDetailSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@authentication_classes([Authentication])
@permission_classes([IsAuthenticated])
def update_settings(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        user_profile = UserProfile.objects.create(user=request.user)
    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        if 'whitelist_urls' in request.data:
            Whitelist.objects.filter(user=request.user).delete()
            for url in request.data['whitelist_urls']:
                Whitelist.objects.create(user=request.user, url=url)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([Authentication])
@permission_classes([IsAuthenticated])
def get_settings(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    profile_serializer = UserProfileSerializer(user_profile)
    whitelist_urls = Whitelist.objects.filter(user=request.user)
    whitelist_serializer = WhitelistSerializer(whitelist_urls, many=True)
    return Response({
        'user_settings': profile_serializer.data,
        'whitelist_urls': whitelist_serializer.data
    }, status=status.HTTP_200_OK)
