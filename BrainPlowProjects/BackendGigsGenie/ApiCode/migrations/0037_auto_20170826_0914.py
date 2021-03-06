# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-26 09:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ApiCode', '0036_auto_20170825_0721'),
    ]

    operations = [
        migrations.CreateModel(
            name='GigsImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Image', models.ImageField(null=True, upload_to=b'')),
            ],
        ),
        migrations.RemoveField(
            model_name='gigs',
            name='Image1',
        ),
        migrations.RemoveField(
            model_name='gigs',
            name='Image2',
        ),
        migrations.RemoveField(
            model_name='gigs',
            name='Image3',
        ),
        migrations.AddField(
            model_name='gigsimages',
            name='GigId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCode.Gigs'),
        ),
        migrations.AddField(
            model_name='gigsimages',
            name='UserName',
            field=models.ForeignKey(db_column='UserName', on_delete=django.db.models.deletion.CASCADE, to='ApiCode.Contractor', to_field='UserName'),
        ),
    ]
