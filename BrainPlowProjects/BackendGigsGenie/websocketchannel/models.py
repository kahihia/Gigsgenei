from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Room(models.Model):
    HFW = models.ForeignKey(User,related_name='HFW',on_delete=models.CASCADE,default=None)#post a job
    LFW = models.ForeignKey(User,related_name='LFW',on_delete=models.CASCADE,default=None)#create a gig
    RoomNo = models.CharField(max_length=1000,unique=True)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('HFW', 'LFW')
class Message(models.Model):
    Room = models.ForeignKey(Room,on_delete=models.CASCADE,default=None)
    Sender = models.ForeignKey(User,related_name='sender',on_delete=models.CASCADE,default=None)
    MessageText = models.CharField(max_length=10000)
    Seen = models.BooleanField(default=False)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)
