# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-31 20:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ApiCode', '0011_auto_20170728_2313'),
    ]

    operations = [
        migrations.AddField(
            model_name='postjob',
            name='posttype',
            field=models.FloatField(null=True),
        ),
    ]
