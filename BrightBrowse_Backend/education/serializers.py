from rest_framework import serializers
from .models import EducationalContent

class EducationalContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalContent
        fields = '__all__'