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

    def clean(self):

        # data from the form is fetched using super function
        super(UserCreationForm, self).clean()

        # extract the username and text field from the data
        keyword = self.cleaned_data.get('key_word')

        # conditions to be met for the username length
        if keyword != 'JohnDeere':
            self._errors['key_word'] = self.error_class([
                'Remember the tractor'])

        # return any errors if found
        return self.cleaned_data

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
        fields = ["image", 'birthday', 'nickname', 'cap']
