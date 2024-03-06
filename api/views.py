from rest_framework import viewsets
from .models import WasteCollectionCenter, FillPercentageChange
from .serializers import WasteCollectionCenterSerializer, FillPercentageChangeSerializer

class WasteCollectionCenterViewSet(viewsets.ModelViewSet):
    queryset = WasteCollectionCenter.objects.all()
    serializer_class = WasteCollectionCenterSerializer

class FillPercentageChangeViewSet(viewsets.ModelViewSet):
    queryset = FillPercentageChange.objects.all()
    serializer_class = FillPercentageChangeSerializer
