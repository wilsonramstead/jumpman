# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2019-05-29 17:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('falling_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='highscore',
            name='score',
            field=models.IntegerField(),
        ),
    ]
