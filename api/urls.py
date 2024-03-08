from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WasteCollectionCenterViewSet, FillPercentageChangeViewSet

router = DefaultRouter()
router.register(r'waste-collection-centers', WasteCollectionCenterViewSet)
router.register(r'waste-collection-centers/(?P<center_id>\d+)', WasteCollectionCenterViewSet)
router.register(r'fill-percentage-history/(?P<center_id>\d+)', FillPercentageChangeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
