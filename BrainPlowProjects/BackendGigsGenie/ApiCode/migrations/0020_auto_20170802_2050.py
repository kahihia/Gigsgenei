# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-02 20:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ApiCode', '0019_auto_20170802_2050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contractor',
            name='Password',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
