from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import WasteCollectionCenter, FillPercentageChange
from .serializers import WasteCollectionCenterSerializer, FillPercentageChangeSerializer


class WasteCollectionCenterViewSet(viewsets.ModelViewSet):
    queryset = WasteCollectionCenter.objects.all()
    serializer_class = WasteCollectionCenterSerializer


class FillPercentageChangeViewSet(viewsets.ModelViewSet):
    queryset = FillPercentageChange.objects.all()
    serializer_class = FillPercentageChangeSerializer

    def get_queryset(self):
        center_id = self.kwargs['center_id']
        return FillPercentageChange.objects.filter(collection_center_id=center_id)

    def create(self, request, *args, **kwargs):
        center_id = self.kwargs['center_id']

        fill_percentage = request.data.get('fill_percentage')

        if not fill_percentage:
            return Response({'error': 'fill_percentage is required'}, status=status.HTTP_400_BAD_REQUEST)

        fill_percentage_change = FillPercentageChange.objects.create(
            collection_center_id=center_id,
            fill_percentage=fill_percentage
        )

        serializer = FillPercentageChangeSerializer(fill_percentage_change)

        return Response(serializer.data, status=status.HTTP_201_CREATED)