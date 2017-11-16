from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Gigs(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    Catagory = models.CharField(max_length=100, null=True)
    Title = models.CharField(max_length=100, null=True)
    Description = models.CharField(max_length=1000, null=True)
    Time = models.DateTimeField(null=True)
    Complete = models.BooleanField(default=False)
    Favourite = models.BooleanField(default=False)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return  self.pk

class GigsImages(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    GigId = models.ForeignKey(Gigs, related_name='tracks',on_delete=models.CASCADE)
    Image = models.ImageField(null=True)
    def __unicode__(self):
        return '%s' % (self.Image)
class GigsPrize(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    GigId = models.ForeignKey(Gigs, related_name='prize',on_delete=models.CASCADE)
    MinPrize = models.IntegerField(null=True)
    MaxPrize = models.IntegerField(null=True)
    Days = models.IntegerField(null=True)

class GigsRequirements(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    GigId = models.ForeignKey(Gigs, related_name='requirements',on_delete=models.CASCADE)
    Requirement = models.CharField(max_length=100, null=True)
    IsMandatory = models.BooleanField(default= False)
    def __unicode__(self):
        return '%s,%s' % (self.Requirement, self.IsMandatory)
class GigsFAQ(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    GigId = models.ForeignKey(Gigs, related_name='faq', on_delete=models.CASCADE)
    Question = models.CharField(max_length=1000, null=True)
    Answer = models.CharField(max_length=1000, null=True)
    def __unicode__(self):
        return '%s,%s' % (self.Question,self.Answer)
class GigsSearchTerms(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    GigId = models.ForeignKey(Gigs,related_name='searchterms', on_delete=models.CASCADE)
    SearchTerms = models.CharField(max_length=1000, null=True)
    def __unicode__(self):
        return '%s' % (self.SearchTerms)

class GigsReviews(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    GigId = models.ForeignKey(Gigs,related_name='reviews', on_delete=models.CASCADE)
    Review = models.CharField(max_length=1000, null=True)
    def __unicode__(self):
        return '%s' % (self.Review)
