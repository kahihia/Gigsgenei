from django.contrib import admin
from .models import InstituteName,SkillName,DegreeName,CompanyName,Designation
# Register your models here.\
admin.site.register(InstituteName)
admin.site.register(SkillName)
admin.site.register(DegreeName)
admin.site.register(CompanyName)
admin.site.register(Designation)
