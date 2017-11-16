from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class AddDescription(models.Model):
    description = models.CharField(max_length=1000)
    user = models.OneToOneField(User,null=True)
    def __str__(self):
        return  self.description