from __future__ import unicode_literals

from django.db import models

class DegreeName(models.Model):
    Name=models.CharField(max_length=100)

    def __str__(self):
        return  self.Name

class InstituteName(models.Model):
    Name=models.CharField(max_length=100)

    def __str__(self):
        return  self.Name

class SkillName(models.Model):
    Name=models.CharField(max_length=100)

    def __str__(self):
        return  self.Name

class CompanyName(models.Model):
    Name=models.CharField(max_length=100)

    def __str__(self):
        return  self.Name

class Designation(models.Model):
    Name=models.CharField(max_length=100)

    def __str__(self):
        return  self.Name
