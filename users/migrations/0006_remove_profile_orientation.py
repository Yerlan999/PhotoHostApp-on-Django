# Generated by Django 3.0.7 on 2020-10-09 17:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_profile_orientation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='orientation',
        ),
    ]
