# Generated by Django 3.0.7 on 2020-09-23 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20200907_2238'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='cap',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]