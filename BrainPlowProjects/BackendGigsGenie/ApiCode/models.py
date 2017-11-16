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
    user = models.OneToOneField(User,on_delete=models.CASCADE,default=None)

    def __str__(self):
        return  self.PhoneNo


# Person Information
class Login(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    Password = models.CharField(max_length=100)
    UserType = models.CharField(max_length=100,null=True)


# Person Information
class AcedamicQualification(models.Model):
    UserName = models.ForeignKey(Contractor, on_delete=models.CASCADE, to_field="UserName", db_column="UserName")
    DegreeName = models.CharField(max_length=100, null=True)
    StartYear = models.DateField(null=True, blank=True)
    EndYear = models.DateField(null=True, blank=True)
    Institution = models.CharField(max_length=100, null=True)
    Percentile = models.FloatField(null=True)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

class ExpressYourself(models.Model):
    UserName = models.ForeignKey(Contractor, on_delete=models.CASCADE, to_field="UserName", db_column="UserName")
    FullName = models.CharField(max_length=100)
    Description = models.CharField(max_length=1000)
    Resume = models.ImageField(null=True)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

class OtherExperiences(models.Model):
    UserName = models.ForeignKey(Contractor, on_delete=models.CASCADE, to_field="UserName", db_column="UserName")
    Subject = models.CharField(max_length=100)
    Description = models.CharField(max_length=1000)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)


class Skills(models.Model):
    UserName = models.ForeignKey(Contractor, on_delete=models.CASCADE, to_field="UserName", db_column="UserName")
    SkillName = models.CharField(max_length=1000)
    SkillLevel = models.CharField(max_length=100)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)


# Work Exprience Information
class WorkExperience(models.Model):
    UserName = models.ForeignKey(Contractor, on_delete=models.CASCADE, to_field="UserName", db_column="UserName")
    CompanyName = models.CharField(max_length=100)
    Designation = models.CharField(max_length=100)
    StartYear = models.DateField()
    EndYear = models.DateField()
    Description = models.CharField(max_length=1000)
    Deleted = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)

class FirstTimeLogin1(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    Firsttime = models.BooleanField(default=False)

class Catagories(models.Model):
    catagory=models.CharField(max_length=100)

    def __str__(self):
        return  self.catagory

class InstituteName(models.Model):
    alpha_two_code=models.CharField(max_length=100, default=None)
    name=models.CharField(max_length=100, default=None)
    country=models.CharField(max_length=100, default=None)
    web_page=models.CharField(max_length=100, default=None)
    domain=models.CharField(max_length=100, default=None)

    def __str__(self):
        return  self.name

class DegreeName(models.Model):
    Name=models.CharField(max_length=100)

    def __str__(self):
        return  self.Name

class SkillCatagory(models.Model):
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



class Countries(models.Model):
    country=models.CharField(max_length=100)

    def __str__(self):
        return  self.country
class JobCatagories(models.Model):
    catagory = models.CharField(max_length=100)
    values = models.CharField(max_length=10000)

    def __str__(self):
        return  self.catagory


class PostJob(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    jobcatagory = models.CharField(max_length=100)
    jobname= models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    files = models.CharField(max_length=100)
    skillsneeded = models.CharField(max_length=1000)
    expriencelevel = models.CharField(max_length=100)
    completiontime = models.FloatField(null=True)#number of days
    status = models.FloatField(null=True)# complete=1 , uncomplete=0
    jobtype = models.CharField(max_length=100)#Public, Private
    posttype = models.FloatField(null=True)# 0-free , 1-50$, 2-100$ ,3-200$
    taken = models.IntegerField(null=True, default=None)  # 0=not taken Open for biding , 1=taken Close for Biding
    budget = models.FloatField(null=True, default=None)
    negotiatable = models.BooleanField(default=False)
    BidDays = models.IntegerField(null=True);
    createdat = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return  self.jobcatagory


class BookMark(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    Freelancer = models.CharField(max_length=100)
    Id = models.ForeignKey(PostJob, to_field="id", db_column="Id")
    jobcatagory = models.CharField(max_length=100)
    jobname = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    files = models.CharField(max_length=100)
    skillsneeded = models.CharField(max_length=1000)
    expriencelevel = models.CharField(max_length=100)
    completiontime = models.FloatField(null=True)#number of days
    status = models.FloatField(null=True)# complete=1 , uncomplete=0
    jobtype = models.CharField(max_length=100)#Public, Private
    posttype = models.FloatField(null=True)# 0-free , 1-50$, 2-100$ ,3-200$
    class   Meta:
        unique_together = ('UserName','Id')

    # def __str__(self):
    #     return  self.jobcatagory


class Person(models.Model):
    txtPName=models.CharField(max_length=100)
    txtPEmail = models.CharField(max_length=100)
    txtPPassword = models.CharField(max_length=100)
    txtPMobileNo = models.CharField(max_length=100)

    def __str__(self):
        return  self.txtPName



class Gigs(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    Catagory = models.CharField(max_length=100, null=True)
    Title = models.CharField(max_length=100, null=True)
    Description = models.CharField(max_length=1000, null=True)
    Time = models.DateTimeField(null=True)
    Complete = models.BooleanField(default=False)
    Favourite = models.BooleanField(default=False)
    # def __str__(self):
    #     return  self.pk

class GigsImages(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    GigId = models.ForeignKey(Gigs, related_name='tracks',on_delete=models.CASCADE)
    Image = models.ImageField(null=True)
    def __unicode__(self):
        return '%s' % (self.Image)
class GigsRequirements(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    GigId = models.ForeignKey(Gigs, related_name='requirements',on_delete=models.CASCADE)
    Requirement = models.CharField(max_length=100, null=True)
    IsMandatory = models.BooleanField(default= False)
    def __unicode__(self):
        return '%s,%s' % (self.Requirement, self.IsMandatory)
class GigsFAQ(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    GigId = models.ForeignKey(Gigs, related_name='faq', on_delete=models.CASCADE)
    Question = models.CharField(max_length=1000, null=True)
    Answer = models.CharField(max_length=1000, null=True)
    def __unicode__(self):
        return '%s,%s' % (self.Question,self.Answer)
class GigsSearchTerms(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    GigId = models.ForeignKey(Gigs,related_name='searchterms', on_delete=models.CASCADE)
    SearchTerms = models.CharField(max_length=1000, null=True)
    def __unicode__(self):
        return '%s' % (self.SearchTerms)

class GigsReviews(models.Model):
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName")
    GigId = models.ForeignKey(Gigs,related_name='reviews', on_delete=models.CASCADE)
    Reviewer = models.CharField(max_length=1000, null=True)
    Review = models.CharField(max_length=1000, null=True)
    def __unicode__(self):
        return '%s' % (self.Review)

class Test(models.Model):
    UserType = models.CharField(max_length=1000, null=True)
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
    UserName = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName", on_delete=models.CASCADE)
    Catagory = models.ForeignKey(Test, to_field="Catagory", db_column="Catagory")
    Percentage = models.FloatField(null=True)
    # def __str__(self):
    #     return  self.UserName

class Bid(models.Model):
    BidOwner = models.ForeignKey(Contractor,related_name='bidowner', to_field="UserName", on_delete=models.CASCADE,default=None)
    JobId = models.ForeignKey(PostJob,related_name='bids', on_delete=models.CASCADE)
    Bidder = models.ForeignKey(Contractor,related_name='bidder', to_field="UserName",  on_delete=models.CASCADE,default=None)
    BidPrize = models.FloatField(null=True)
    Days = models.IntegerField(null=True)
    Title = models.CharField(max_length=1000, null=True)
    Status = models.IntegerField(null=True) # 1=Taken 0=Not Taken 2=Pending
    ExpertGuarantee = models.BooleanField(default=False)
    SponsorMyBid = models.BooleanField(default=False)
    HighlightMyBid = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    class   Meta:
        unique_together=('Bidder','JobId')

class AppliedJobs(models.Model):
    JobApplier = models.ForeignKey(Contractor, to_field="UserName", db_column="UserName", on_delete=models.CASCADE)
    AppliedJobId = models.ForeignKey(PostJob, related_name='appliedjob', on_delete=models.CASCADE,unique=True)
        # def __unicode__(self):
    #     return '%s,%s,%s,%s,%s,%s' % (self.BidOwner, self.JobId,self.Bidder,self.BidPrize,self.Days,self.Title)

# Create your models here.
