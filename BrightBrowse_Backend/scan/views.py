import datetime
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Scan, Result, DarkPatternType, SubDarkPatternType, Report
from users.models import UserProfile
from .serializers import ScanSerializer, ResultSerializer, DarkPatternTypeSerializer, SubDarkPatternTypeSerializer, ReportSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from utils.main import main
from utils.malicious import malecious_url_check

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_scan(request):
    url = request.data.get('url')
    severity = request.data.get('severity')
    user_id = request.user.id
    current_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    scan_id = f"{user_id}_{current_time}"
    # risk_score = malecious_url_check(url)  TODO: when model fixed then uncomment it
    risk_score = 50
    success = risk_score < 70

    scan = Scan.objects.create(
        scan_id=scan_id,
        url=url,
        severity=severity,
        success=success,
        risk_score=risk_score
    )
    scan.save()

    message = "Scan created successfully." if success else "Scan created with high risk."
    return Response({'message': message, 'scan_id': scan.scan_id}, status=200)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def start_scan(request):
    scan_id = request.data.get('scan_id')
    content = request.data.get('content')

    user_profile = get_object_or_404(UserProfile, user=request.user)
    allowed_pattern = user_profile.allowed_pattern
    scan = Scan.objects.get(scan_id=scan_id)

    results = main(scan.url, scan.severity, content, allowed_pattern)

    if not results:
        return Response({"message": "Scan failed or no results found."}, status=400)

    response_data = {
        "message": "Scan complete",
        "scan_id": scan.scan_id,
        "url": scan.url,
        "severity": scan.severity,
        "results": results
    }
    return Response(response_data, status=200)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def fetch_scan_result(request, scan_id):
    results = Result.objects.filter(scan_id__scan_id=scan_id)
    serializer = ResultSerializer(results, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def fetch_past_scan_results(request):
    scans = Scan.objects.filter(scan_id__startswith=f"{request.user.id}_").order_by('-created_at')[:5]
    result_data = []
    for scan in scans:
        results = Result.objects.filter(scan_id=scan)
        serializer = ResultSerializer(results, many=True)
        result_data.append(serializer.data)
    return Response(result_data, status=200)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def report_pattern(request):
    user_id = request.user.id
    current_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    scan_id = f"{user_id}_{current_time}"
    scan_data = {
        'scan_id': scan_id,
        'url': request.data.get('url'),
        'severity': 'low',# Default value as per requirement
        'success': True,  # Assuming success is True for reported patterns
        'risk_score': 0,  # Assuming risk score is 0 for manual reports
    }
    scan_serializer = ScanSerializer(data=scan_data)
    if scan_serializer.is_valid():
        scan_serializer.save()
        report_data = request.data
        report_data['scan_id'] = scan_id
        report_serializer = ReportSerializer(data=report_data)
        if report_serializer.is_valid():
            report_serializer.save()
            return Response({'message': 'Report submitted successfully'}, status=200)
        return Response(report_serializer.errors, status=400)
    return Response(scan_serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_dark_pattern_types(request):
    dark_pattern_types = DarkPatternType.objects.all()
    serializer = DarkPatternTypeSerializer(dark_pattern_types, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_sub_dark_pattern_types(request):
    sub_dark_pattern_types = SubDarkPatternType.objects.all()
    serializer = SubDarkPatternTypeSerializer(sub_dark_pattern_types, many=True)
    return Response(serializer.data, status=200)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_dark_pattern_type(request):
    serializer = DarkPatternTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_dark_pattern_type(request, pk):
    dark_pattern_type = get_object_or_404(DarkPatternType, pk=pk)
    serializer = DarkPatternTypeSerializer(dark_pattern_type, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_dark_pattern_type(request, pk):
    dark_pattern_type = get_object_or_404(DarkPatternType, pk=pk)
    dark_pattern_type.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_sub_dark_pattern_type(request):
    serializer = SubDarkPatternTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_sub_dark_pattern_type(request, pk):
    dark_pattern_type = get_object_or_404(SubDarkPatternType, pk=pk)
    serializer = SubDarkPatternTypeSerializer(dark_pattern_type, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_sub_dark_pattern_type(request, pk):
    dark_pattern_type = get_object_or_404(SubDarkPatternType, pk=pk)
    dark_pattern_type.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)