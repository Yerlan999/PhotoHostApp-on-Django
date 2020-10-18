# Generated by Django 3.0.7 on 2020-10-18 05:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='default.jpg', upload_to='profile_pics')),
                ('nickname', models.CharField(blank=True, max_length=100, null=True)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('cap', models.BooleanField(blank=True, null=True)),
                ('left', models.IntegerField(blank=True, null=True)),
                ('upper', models.IntegerField(blank=True, null=True)),
                ('right', models.IntegerField(blank=True, null=True)),
                ('lower', models.IntegerField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
