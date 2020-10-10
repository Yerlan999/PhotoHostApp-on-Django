from django.db import models
from django.contrib.auth.models import User
from PIL import Image

user_image_path = ''


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default="default.jpg", upload_to="profile_pics")
    nickname = models.CharField(max_length=100, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    cap = models.BooleanField(null=True, blank=True)
    left = models.IntegerField(null=True, blank=True)
    upper = models.IntegerField(null=True, blank=True)
    right = models.IntegerField(null=True, blank=True)
    lower = models.IntegerField(null=True, blank=True)


    def __str__(self):
        return f"{self.user.username} Профиль"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)
        if img.getexif().get(274):
            orientation = img.getexif()[274]
        else:
            if img.width > img.height or img.width == img.height:
                orientation = 1
            else:
                orientation = 6

        if ((self.left and self.upper and self.right and self.lower) and (type(self.left)==int) ):
            if orientation == 6:
                img = img.transpose(method=Image.ROTATE_270)
            elif orientation == 3:
                img = img.transpose(method=Image.ROTATE_180)
            elif orientation == 8:
                img = img.transpose(method=Image.ROTATE_90)
            img = img.crop((self.left, self.upper, self.right, self.lower))
            img.load()
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.image.path)
        else:
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.image.path)


