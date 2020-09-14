from django import forms


class PhotoForm(forms.Form):
    image = forms.ImageField(widget=forms.ClearableFileInput(attrs={'multiple': True}))


# class PhotoDescForm(forms.Form):
#     description = forms.TextField()
