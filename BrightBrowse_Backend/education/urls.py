from django.urls import path
from .views import get_tips, get_articles, add_education, update_education, delete_education

urlpatterns = [
    path('tips/', get_tips, name='get_tips'),
    path('articles/', get_articles, name='get_articles'),
    path('add/', add_education, name='add_education'),
    path('update/<int:pk>/', update_education, name='update_education'),
    path('delete/<int:pk>/', delete_education, name='delete_education'),
]
