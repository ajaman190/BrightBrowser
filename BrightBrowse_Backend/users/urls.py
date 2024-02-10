from django.urls import path
from .views import register_user, login_user, get_user_details, update_settings, get_settings

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('user/', get_user_details, name='user_details'),
    path('settings/update/', update_settings, name='update_settings'),
    path('settings/', get_settings, name='get_settings'),
]
