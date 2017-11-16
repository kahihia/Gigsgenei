from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

# Contractor Information Information
class Contractor(models.Model):
    PhoneNo=  models.CharField(max_length=50)
    Country = models.CharField(max_length=100)
    AcountActive = models.BooleanField(default=True)
    FirstTimeLogin=  models.BooleanField(default=True)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

    ROLE_CHOICES = (
        ('A','Admin'),
        ('U', 'User'),
        )
    Role = models.CharField(max_length=1,choices=ROLE_CHOICES,default='U')
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='profile_user',default=None)

    def __str__(self):
        return  self.PhoneNo

# Person Information
class AcedamicQualification(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    DegreeName = models.CharField(max_length=100, null=True)
    StartYear = models.DateField(null=True, blank=True)
    EndYear = models.DateField(null=True, blank=True)
    Institution = models.CharField(max_length=100, null=True)
    Percentile = models.FloatField(null=True)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

class ExpressYourself(models.Model):
    user = models.ForeignKey(User,related_name='image',on_delete=models.CASCADE,default=None,unique=True)
    FullName = models.CharField(max_length=100)
    Description = models.CharField(max_length=1000)
    Resume = models.ImageField(null=True)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

class OtherExperiences(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    Subject = models.CharField(max_length=100)
    Description = models.CharField(max_length=1000)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)


class Skills(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    SkillName = models.CharField(max_length=1000)
    SkillLevel = models.CharField(max_length=100)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)


# Work Exprience Information
class WorkExperience(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    CompanyName = models.CharField(max_length=100)
    Designation = models.CharField(max_length=100)
    StartYear = models.DateField()
    EndYear = models.DateField()
    Description = models.CharField(max_length=1000)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

