from django.db import models
from django.utils import timezone

class EducationalContent(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title