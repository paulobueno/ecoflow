from rest_framework import serializers
from .models import WasteCollectionCenter, FillPercentageChange


class WasteCollectionCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteCollectionCenter
        fields = '__all__'


class FillPercentageChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FillPercentageChange
        fields = '__all__'
