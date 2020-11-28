from .models import Photo
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os


@receiver(post_delete, sender=Photo)
def delete_photo(sender, instance, **kwargs):
    os.remove(os.path.abspath(instance.image.path))

