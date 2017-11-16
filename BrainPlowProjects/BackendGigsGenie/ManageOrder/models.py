from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from Showcase.models import Gigs
class GigOrder(models.Model):
    Sender = models.ForeignKey(User,related_name='order_sender',on_delete=models.CASCADE,default=None)
    Reciever = models.ForeignKey(User,related_name='order_reciever',on_delete=models.CASCADE,default=None)
    GigId = models.ForeignKey(Gigs, on_delete=models.CASCADE,default=None)
    Description = models.CharField(max_length=10000,default=False)
    Prize = models.IntegerField(default=False)
    Days = models.CharField(max_length=10000,default=False)
    Accepted = models.BooleanField(default=False)
    Completed = models.BooleanField(default=False)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)
