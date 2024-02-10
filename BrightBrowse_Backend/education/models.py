from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

TYPE_CHOICES = [
    ('tip', 'Tip'),
    ('article', 'Article'),
]

class Education(BaseModel):
    type = models.CharField(max_length=7, choices=TYPE_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField()
    link = models.URLField(max_length=2048)

    def __str__(self):
        return self.title
