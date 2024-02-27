from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import UserProfile, Whitelist
from scan.models import DarkPatternType
from datetime import datetime, timedelta
import jwt
import os

SECRET = os.getenv('JWT_SECRET_KEY')

class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('confirm_password'):
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        try:
            validate_password(attrs['password'])
        except ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        return attrs
    
    def create(self, validated_data):
            user = User.objects.create_user(
                email=validated_data['email'],
                username=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )
            allowed_patterns = '|'.join(DarkPatternType.objects.values_list('title', flat=True))

            UserProfile.objects.update_or_create(
                user=user,
                defaults={'allowed_pattern': allowed_patterns}
            )
            return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['email'], password=attrs['password'])
        if not user:
            raise serializers.ValidationError('Incorrect credentials.')
        if not user.is_active:
            raise serializers.ValidationError('User account is disabled.')
        
        payload = {
            "id": user.id,
            "exp": datetime.utcnow() + timedelta(days=90),
            "iat": datetime.utcnow(),
        }

        token = jwt.encode(payload, SECRET, algorithm='HS256')
        return {
            'access': str(token)
        }

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['severity', 'allowed_pattern', 'auto_scan']

class WhitelistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Whitelist
        fields = ['url']

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']
