from django.db import models
from django.contrib.auth.models import User
from PIL import Image


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default="default.jpg", upload_to="profile_pics")
    nickname = models.CharField(max_length=100, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    cap = models.BooleanField(null=True, blank=True)
    x = models.IntegerField(null=True, blank=True)
    y = models.IntegerField(null=True, blank=True)
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} Профиль"

    def save(self, *args, **kwargs):

        if ((self.x and self.y and self.width and self.height) and (type(self.x)==int) ):
            print("FROM FORM: ")
            print(self.x, self.y, self.width, self.height)

            super().save(*args, **kwargs)
            img = Image.open(self.image.path)
            print('Image Size: ')
            print(img.width, img.height)
            left = self.x
            upper = self.y + img.height
            right =  self.width + left
            lower = img.height + upper

            print('EDITED: ')
            print(left, upper, right, lower)

            # img = img.crop((left, upper, right, lower))
            img.save(self.image.path)

        else:
            super().save(*args, **kwargs)
            img = Image.open(self.image.path)
            # if img.height > 300 or img.width > 300:
            #     output_size = (300, 300)
            #     img.thumbnail(output_size)
            img.save(self.image.path)

