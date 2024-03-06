from django.contrib import admin
from .models import WasteCollectionCenter, FillPercentageChange, PickupRequest

admin.site.register(WasteCollectionCenter)
admin.site.register(FillPercentageChange)
admin.site.register(PickupRequest)

