from django.contrib.auth.models import User
from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

SEVERITY_CHOICES = [
    ('low', 'Low'),
    ('medium', 'Medium'),
    ('high', 'High'),
]

class UserProfile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    severity = models.CharField(max_length=6, choices=SEVERITY_CHOICES, default=SEVERITY_CHOICES[0])
    allowed_pattern = models.TextField()  # Patterns joined by '|'
    auto_scan = models.BooleanField(default=False)

class Whitelist(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.URLField(max_length=2048)
