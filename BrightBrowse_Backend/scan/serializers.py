from rest_framework import serializers
from .models import Scan, Result, DarkPatternType, SubDarkPatternType, Report

class ScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scan
        fields = ['url', 'severity', 'scan_id', 'success', 'risk_score']

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['index', 'text', 'flag', 'dark_pattern', 'sub_dark_pattern', 'solution', 'scan_id']

class DarkPatternTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DarkPatternType
        fields = ['id', 'title', 'description']

class SubDarkPatternTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubDarkPatternType
        fields = ['id', 'dark_pattern_type', 'title']

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['url', 'dark_pattern_type', 'topic', 'description', 'solution', 'scan_id']
