from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

class JobCatagories(models.Model):
    Catagory = models.CharField(max_length=100)
    def __str__(self):
        return  self.Catagory
class JobSubCatagories(models.Model):
    Catagory = models.ForeignKey(JobCatagories,related_name='subcatagories',on_delete=models.CASCADE,default=None)
    SubCatagory = models.CharField(max_length=10000)
    def __str__(self):
        return  self.SubCatagory

class PostJob(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    JobCatagory = models.CharField(max_length=100)
    JobSubCatagory = models.CharField(max_length=100)
    JobName= models.CharField(max_length=100)
    Description = models.CharField(max_length=1000)
    SkillsNeeded = models.CharField(max_length=1000)
    ExprienceLevel = models.CharField(max_length=100)
    CompletionTime = models.FloatField(null=True)#number of days
    Status = models.FloatField(null=True)# complete=1 , uncomplete=0
    JobType = models.CharField(max_length=100)#Public, Private
    PostType = models.FloatField(null=True)# 0-free , 1-50$, 2-100$ ,3-200$
    Taken = models.IntegerField(null=True, default=None)  # 0=not taken Open for biding , 1=taken Close for Biding
    Budget = models.FloatField(null=True, default=None)
    Negotiatable = models.BooleanField(default=False)
    BidDays = models.IntegerField(null=True)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return  self.JobCatagory

class SkillsNeeded(models.Model):
    JobId = models.ForeignKey(PostJob,related_name='skillsneeded',on_delete=models.CASCADE,default=None)
    SkillName = models.CharField(max_length=100)
    def __str__(self):
        return  self.SkillName



class BookMark(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    Id = models.ForeignKey(PostJob, on_delete=models.CASCADE,default=None)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    class   Meta:
        unique_together = ('user','Id')
class Bid(models.Model):
    BidOwner = models.ForeignKey(User,related_name='bidowner',on_delete=models.CASCADE,default=None)
    JobId = models.ForeignKey(PostJob,related_name='bids', on_delete=models.CASCADE)
    Bidder = models.ForeignKey(User,related_name='bidder',on_delete=models.CASCADE,default=None)
    BidPrize = models.FloatField(null=True)
    Days = models.IntegerField(null=True)
    Title = models.CharField(max_length=1000, null=True)
    Status = models.IntegerField(null=True) # 1=Taken 0=Not Taken 2=Pending
    ExpertGuarantee = models.BooleanField(default=False)
    SponsorMyBid = models.BooleanField(default=False)
    HighlightMyBid = models.BooleanField(default=False)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    class   Meta:
        unique_together=('Bidder','JobId')
