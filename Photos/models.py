from django.utils import timezone
from django.db import models
import base64
from django.contrib.auth.models import User
from PIL import Image


# Create your models here.
class Photo(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='photos')
    date_taken = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True, default="Описание")
    title = models.CharField(max_length=100, null=True, blank=True, default="Заголовок")
    meta = models.BooleanField(default=False)
    changeable = models.BooleanField(default=False)

    def __str__(self):
        return self.title + " " + self.description


    def get_absolute_url(self):
        return reverse('photo-detail', kwargs={'pk': self.pk})


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > 800 or img.width > 800:
            img.thumbnail((800, 800))
            img.save(self.image.path)


class Comments(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ForeignKey(Photo, on_delete=models.CASCADE)
    content = models.TextField()
    date_added = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content

    def get_absolute_url(self):
        return reverse('comment-detail', kwargs={'pk': self.pk})
