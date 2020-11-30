from django.db.models.signals import post_save, pre_save, pre_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile
import os


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    if not instance.profile:
        instance.profile.save()


@receiver(post_save, sender=Profile)
def profile_image(sender, instance, created, **kwargs):
    if created:
        instance.current_image_name = instance.image.path
        instance.save()



@receiver(pre_save, sender=Profile)
def save_post(sender, instance, **kwargs):
    if instance.current_image_name != None:
        if (instance.current_image_name[-11:] != 'default.jpg') and (instance.image.path != instance.current_image_name):
            try:
                os.remove(os.path.abspath(instance.current_image_name))
            except:
                print("Error when deleting old profile image")
    instance.current_image_name = instance.image.path



@receiver(pre_delete, sender=Profile)
def delete_profile(sender, instance, **kwargs):
    if instance.current_image_name[-11:] != 'default.jpg':
        try:
            os.remove(os.path.abspath(instance.current_image_name))
        except:
            print("Error when deleting old profile image 2")
