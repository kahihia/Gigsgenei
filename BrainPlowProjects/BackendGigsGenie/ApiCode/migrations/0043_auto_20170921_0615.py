# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-09-21 06:15
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ApiCode', '0042_test_testquestions_testresults'),
    ]

    operations = [
        migrations.RenameField(
            model_name='testquestions',
            old_name='Option1',
            new_name='A',
        ),
        migrations.RenameField(
            model_name='testquestions',
            old_name='Option2',
            new_name='B',
        ),
        migrations.RenameField(
            model_name='testquestions',
            old_name='Option3',
            new_name='C',
        ),
        migrations.RenameField(
            model_name='testquestions',
            old_name='Option4',
            new_name='D',
        ),
    ]