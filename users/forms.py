from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UsernameField
from .models import Profile
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import password_validation
from django.forms.widgets import ClearableFileInput



class CustomUserLoginForm(AuthenticationForm):
    username = UsernameField(label='Фамилия и Имя', widget=forms.TextInput(attrs={'autofocus': True}),
        help_text='<strong>Необходимо ввести фамилию и имя через _ (нижний прочерк)</strong>')
    password = forms.CharField(
        label=_("Пароль"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'current-password'}),
    )

    error_messages = {
        'invalid_login': _(
            "Пожалуйста введи правильный логин и пароль. Заметь что "
            "оба поля чувствительны к заглавным буквам."
        ),
        'inactive': _("Этот аккаунт не действителен."),
    }


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(label='Почта', error_messages={
        'invalid': _('Неправильно!'),
        'required': _('Надо ввести!'),
        'item_invalid': _('Неправльно сук!'),
        })
    key_word = forms.CharField(max_length=10, required=True, label='Кодовое слово', help_text='''
                    <strong>Марка самого известного трактора</strong>
                    ''')
    username = forms.CharField(label='Фамилия и Имя', error_messages={'unique': 'Пользователь с таким именем уже существует '},
                    help_text='''
                    <strong>Обязательно! Введи Фамилию и Имя через _ (нижний прочерк)</strong><br>
                    <i>Сайт сам заменит _ на пробел</i>
                    ''')

    error_messages = {
        'password_mismatch': _('А пароли не сходятся!'),
        'item_invalid': _('Неправльно сук!'),
        'unique': _('Должно быть уникальным!'),
        'null': _('Не должно быть пустым!'),
        'not_a_string': _('Должно состоять только из букв!'),
        'invalid': _('Неправильно!'),
        'required': _('Надо ввести!'),
    }
    password1 = forms.CharField(
        label= _("Придумай пароль"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        help_text="""<ul>
                        <li>Твой пароль должен состоять как минимум из 8-и символов</li>
                        <li>Твой пароль должен состоять исключительно из цифр</li>
                    </ul>""",)

    password2 = forms.CharField(
        label= _("Введи пароль еще раз"),
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        strip=False,
        help_text= _("Постарайся запомнить свой пароль!"),
    )


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
                'Вспомни это слово'])

        # return any errors if found
        return self.cleaned_data




class UserUpdateForm(forms.ModelForm):

    email = forms.EmailField(label='Почта', error_messages={
        'invalid': _('Неправильно!'),
        'required': _('Надо ввести!'),
        'item_invalid': _('Неправльно сук!'),
        })
    username = forms.CharField(label='Фамилия и Имя', error_messages={'unique': 'Пользователь с таким именем уже существует '},
                    help_text='Обязательно. Не больше 30 символов. Разрешаются @/./+/-/_ ')

    class Meta:
        model = User
        fields = ["username", "email"]





class MyClearableFileInput(ClearableFileInput):
    initial_text = 'Текущая картинка'
    input_text = 'Изменить на:'
    clear_checkbox_label = 'Очистить'


BIRTH_YEAR_CHOICES = ['2000', '1999', '1998', '1997', '1996']
MONTHS = {
    1:_('Январь'), 2:_('Февраль'), 3:_('Март'), 4:_('Апрель'),
    5:_('Май'), 6:_('Июнь'), 7:_('Июль'), 8:_('Август'),
    9:_('Сентябрь'), 10:_('Октябрь'), 11:_('Ноябрь'), 12:_('Декабрь')
}



class ProfileUpdateForm(forms.ModelForm):

    birthday = forms.DateField(label='Дата Рождения', localize=True, widget=forms.SelectDateWidget(
        years=BIRTH_YEAR_CHOICES,
        months=MONTHS, empty_label=("Год рождения", "Месяц", "День")), required=False)
    cap = forms.BooleanField(label='Ты был(а) старостой?', help_text='Отметь если ты Жора', required=False)
    nickname = forms.CharField(label='Как тебя все называли?', help_text= _("Пример: Бигсом/Пазик/Герыч"), required=False)
    image = forms.ImageField(label='<strong>Аватарка</strong>', widget=MyClearableFileInput(), help_text='Картинка будет переформатированна в целях сохранения памяти')
    x = forms.IntegerField(widget=forms.HiddenInput(), required=False)
    y = forms.IntegerField(widget=forms.HiddenInput(), required=False)
    width = forms.IntegerField(widget=forms.HiddenInput(), required=False)
    height = forms.IntegerField(widget=forms.HiddenInput(), required=False)

    class Meta:
        model = Profile # Model that we are going to work with
        fields = ["image", 'birthday', 'nickname', 'cap', 'x', 'y', 'width', 'height']

