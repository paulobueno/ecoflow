from django.core.exceptions import ValidationError
from django.db import models


class WasteCollectionCenter(models.Model):
    friendly_id = models.CharField(max_length=50, unique=True)
    fill_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    pickup_fill_percentage_threshold = models.DecimalField(max_digits=5, decimal_places=2, default=80)
    pickup_requested = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.friendly_id} - {self.fill_percentage}% Full"

    class Meta:
        verbose_name_plural = "Waste Collection Centers"

    def clean(self):
        if not (0 <= self.fill_percentage <= 100):
            raise ValidationError({'fill_percentage': 'Fill percentage must be between 0 and 100'})

        if not (0 <= self.pickup_fill_percentage_threshold <= 100):
            raise ValidationError({'fill_percentage': 'Pickup threshold must be between 0 and 100'})

    def save(self, *args, **kwargs):
        self.full_clean()
        if self.fill_percentage > self.pickup_fill_percentage_threshold:
            if not self.pickup_requested:
                PickupRequest.objects.create(collection_center=self)
                self.pickup_requested = True
        else:
            self.pickup_requested = False
        super().save(*args, **kwargs)


class FillPercentageChange(models.Model):
    collection_center = models.ForeignKey(WasteCollectionCenter, on_delete=models.CASCADE)
    fill_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    modification_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.collection_center.friendly_id} - {self.fill_percentage}% Full on {self.modification_date}"

    class Meta:
        verbose_name_plural = "Fill Percentage History"

    def save(self, *args, **kwargs):
        self.collection_center.fill_percentage = self.fill_percentage
        self.collection_center.save()
        super().save(*args, **kwargs)


class PickupRequest(models.Model):
    collection_center = models.ForeignKey(WasteCollectionCenter, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.collection_center.friendly_id} - {self.creation_date}"
