from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    key_word = forms.CharField(max_length=10, required=True)


    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]


class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ["username", "email"]

BIRTH_YEAR_CHOICES = ['2000', '1999', '1998', '1997', '1996']

class ProfileUpdateForm(forms.ModelForm):
    birthday = forms.DateField(label='Дата Рождения', widget=forms.SelectDateWidget(years=BIRTH_YEAR_CHOICES))

    class Meta:
        model = Profile # Model that we are going to work with
        fields = ["image", 'birthday', 'nickname']
