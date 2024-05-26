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

class DarkPatternType(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class SubDarkPatternType(BaseModel):
    dark_pattern_type = models.ForeignKey(DarkPatternType, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Scan(BaseModel):
    scan_id = models.CharField(max_length=255, unique=True)
    severity = models.CharField(max_length=6, choices=SEVERITY_CHOICES)
    url = models.URLField(max_length=2048)
    success = models.BooleanField()
    risk_score = models.IntegerField()

    def __str__(self):
        return self.scan_id

class Report(BaseModel):
    scan_id = models.ForeignKey(Scan, on_delete=models.CASCADE)
    url = models.URLField(max_length=2048)
    dark_pattern_type = models.ForeignKey(DarkPatternType, on_delete=models.CASCADE)
    topic = models.CharField(max_length=255)
    description = models.TextField()
    solution = models.TextField()

    def __str__(self):
        return self._id

class Result(BaseModel):
    scan_id = models.ForeignKey(Scan, on_delete=models.CASCADE)
    index = models.TextField()
    text = models.TextField()
    flag = models.IntegerField()
    dark_pattern = models.CharField(max_length=255)
    sub_dark_pattern = models.CharField(max_length=255)
    solution = models.TextField()

    def __str__(self):
        return self.dark_pattern
