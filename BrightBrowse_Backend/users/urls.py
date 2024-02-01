from django.urls import path
from .views import UserRegistrationView, UserLoginView, EmailVerifyView, UserSettingsView, BackendStatusView, ResendVerificationEmailView

urlpatterns = [
    path('', BackendStatusView.as_view(), name='backend-status'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('email-verify/', EmailVerifyView.as_view(), name='email-verify'),
    path('resend-verification/', ResendVerificationEmailView.as_view(), name='resend-verification'),
    path('settings/', UserSettingsView.as_view(), name='user-settings'),
]
