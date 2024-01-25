from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone
# from Patterns.models import *

# USER MODEL
class User(AbstractUser):
    # AbstractUser includes first_name and last_name fields
    email = models.EmailField(unique=True)  # Override email field to make it unique
    is_verified = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'    # Set email as the username field
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']  # email is already the username field

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_on = timezone.now()
        self.updated_on = timezone.now()
        return super(User, self).save(*args, **kwargs)

# USER SETTINGS MODEL   
class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
    sensitivityLevel = models.CharField(max_length=10)
    selectedPatterns = ArrayField(models.UUIDField(), blank=True)  # Assuming Pattern is another model with UUID as primary key
    automatic_scanning = models.BooleanField(default=False)
    whitelist = ArrayField(models.CharField(max_length=200), blank=True)
    blacklist = ArrayField(models.CharField(max_length=200), blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.createdAt = timezone.now()
        self.updatedAt = timezone.now()
        return super(UserSettings, self).save(*args, **kwargs)