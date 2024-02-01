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


