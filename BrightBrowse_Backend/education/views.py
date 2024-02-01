from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from .models import EducationalContent
from .serializers import EducationalContentSerializer

@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
class EducationalContentView(generics.ListCreateAPIView):
    serializer_class = EducationalContentSerializer

    def get_queryset(self):
        return EducationalContent.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
class EducationalContentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EducationalContentSerializer

    def get_queryset(self):
        return EducationalContent.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=204)