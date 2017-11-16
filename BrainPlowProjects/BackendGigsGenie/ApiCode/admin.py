# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib import admin

from .models import Contractor
from .models import Login,AppliedJobs
from .models import AcedamicQualification
from .models import OtherExperiences,PostJob
from .models import Skills
from .models import Catagories,JobCatagories,Test,TestQuestions,TestResults
from .models import Countries,Bid
from .models import Person,DegreeName,SkillCatagory,SkillName,CompanyName,Designation,GigsRequirements,GigsFAQ,GigsSearchTerms
from .models import WorkExperience,InstituteName,BookMark,FirstTimeLogin1,ExpressYourself,Gigs,GigsImages
admin.site.register(Contractor)
admin.site.register(Login)
admin.site.register(AcedamicQualification)
admin.site.register(OtherExperiences)
admin.site.register(Skills)
admin.site.register(Catagories)
admin.site.register(Countries)
admin.site.register(ExpressYourself)
admin.site.register(WorkExperience)
admin.site.register(InstituteName)
admin.site.register(DegreeName)
admin.site.register(SkillCatagory)
admin.site.register(SkillName)
admin.site.register(CompanyName)
admin.site.register(Designation)
admin.site.register(JobCatagories)
admin.site.register(PostJob)
admin.site.register(BookMark)
admin.site.register(FirstTimeLogin1)
admin.site.register(Gigs)
admin.site.register(GigsImages)
admin.site.register(GigsRequirements)
admin.site.register(GigsFAQ)
admin.site.register(TestResults)
admin.site.register(TestQuestions)
admin.site.register(Test)
admin.site.register(Bid)
admin.site.register(AppliedJobs)

# Register your models here.
