from django.utils import timezone
from django.db import models
import base64
from django.contrib.auth.models import User
from PIL import Image


# Create your models here.
class Photo(models.Model):
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    image = models.ImageField(upload_to='photos')
    date_taken = models.DateTimeField(null=True, blank=True)
    description = models.TextField(blank=True, default="Description")
    title = models.CharField(max_length=100, null=True, blank=True, default="Title")

    def __str__(self):
        return self.title + " " + self.description


    def get_absolute_url(self):
        return reverse('photo-detail', kwargs={'pk': self.pk})


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > 300 or img.width > 500:
            img.thumbnail((500, 300))
            img.save(self.image.path)


class Comments(models.Model):
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    image = models.ForeignKey(Photo, on_delete=models.CASCADE)
    content = models.TextField()
    date_added = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content

    def get_absolute_url(self):
        return reverse('comment-detail', kwargs={'pk': self.pk})
