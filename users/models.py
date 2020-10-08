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
    left = models.IntegerField(null=True, blank=True)
    upper = models.IntegerField(null=True, blank=True)
    right = models.IntegerField(null=True, blank=True)
    lower = models.IntegerField(null=True, blank=True)


    def __str__(self):
        return f"{self.user.username} Профиль"

    def save(self, *args, **kwargs):

        if ((self.left or self.upper or self.right or self.lower) and (type(self.left)==int) ):
            print("FROM FORM: ")
            print(self.left , self.upper , self.right , self.lower)

            super().save(*args, **kwargs)
            img = Image.open(self.image.path)
            img_cropped = img.crop((self.left, self.upper, self.right, self.lower))
            # if img_cropped.height > 300 or img_cropped.width > 300:
            #     output_size = (300, 300)
            #     img_cropped.thumbnail(output_size)
            #     img_cropped.save(self.image.path)
            img_cropped.save(self.image.path)
        else:
            super().save(*args, **kwargs)
            img = Image.open(self.image.path)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.image.path)

