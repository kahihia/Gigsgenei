from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

class Test(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    Catagory = models.CharField(max_length=1000, null=True,unique=True)
    def __str__(self):
        return  self.Catagory

class TestQuestions(models.Model):
    Catagory = models.ForeignKey(Test, to_field="Catagory", db_column="Catagory", on_delete=models.CASCADE)
    Question = models.CharField(max_length=1000, null=True)
    A = models.CharField(max_length=1000, null=True)
    B = models.CharField(max_length=1000, null=True)
    C = models.CharField(max_length=1000, null=True)
    D = models.CharField(max_length=1000, null=True)
    Answer = models.IntegerField(null=True)

class TestResults(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    Catagory = models.ForeignKey(Test, to_field="Catagory", db_column="Catagory")
    Percentage = models.FloatField(null=True)
