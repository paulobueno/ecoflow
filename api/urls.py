from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WasteCollectionCenterViewSet, FillPercentageChangeViewSet

router = DefaultRouter()
router.register(r'waste-collection-centers', WasteCollectionCenterViewSet)
router.register(r'fill-percentage-history/(?P<center_id>\d+)', FillPercentageChangeViewSet)

urlpatterns = [
    # path('waste-collection-centers', WasteCollectionCenterViewSet.as_view({'get': 'list'})),
    # path('fill-percentage-history/<int:center_id>/', FillPercentageChangeViewSet.as_view({'get': 'list'})),
    path('', include(router.urls)),
]
