from .models import Post
from django.db.models.signals import post_delete, pre_save, post_save
from django.dispatch import receiver
import os


@receiver(post_delete, sender=Post)
def delete_post(sender, instance, **kwargs):
    try:
        os.remove(os.path.abspath(instance.image.path))
    except:
        pass


@receiver(post_save, sender=Post)
def create_post(sender, instance, created, **kwargs):
    if created:
        try:
            instance.current_image_name = instance.image.path
        except:
            print("ERROR WITH IMAGE PATH ASSINGMENT")
        finally:
            instance.save()


@receiver(pre_save, sender=Post)
def save_post(sender, instance, **kwargs):

    try:
        print("Instance Image: ", instance.image)
        if instance.current_image_name != instance.image.path:
            try:
                os.remove(os.path.abspath(instance.current_image_name))
            except:
                print("ERROR WITH REMOVING IMAGE!")
            instance.current_image_name = instance.image.path
    except:
        if instance.image == "":
            try:
                os.remove(os.path.abspath(instance.current_image_name))
            except:
                print("ERROR WITH REMOVING IMAGE 2!")




