from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import WasteCollectionCenter, FillPercentageChange
from .serializers import WasteCollectionCenterSerializer, FillPercentageChangeSerializer


@permission_classes([AllowAny])
class WasteCollectionCenterViewSet(viewsets.ModelViewSet):
    queryset = WasteCollectionCenter.objects.all()
    serializer_class = WasteCollectionCenterSerializer


@permission_classes([AllowAny])
class FillPercentageChangeViewSet(viewsets.ModelViewSet):
    queryset = FillPercentageChange.objects.all()
    serializer_class = FillPercentageChangeSerializer
