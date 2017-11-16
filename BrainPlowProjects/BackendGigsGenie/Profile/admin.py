from django.contrib import admin

from .models import Contractor,AcedamicQualification,ExpressYourself,OtherExperiences,Skills,WorkExperience
admin.site.register(Contractor)
admin.site.register(AcedamicQualification)
admin.site.register(OtherExperiences)
admin.site.register(Skills)
admin.site.register(ExpressYourself)
admin.site.register(WorkExperience)
