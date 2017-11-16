from django.contrib import admin

from .models import JobCatagories,JobSubCatagories,PostJob,Bid,BookMark,SkillsNeeded
admin.site.register(JobCatagories)
admin.site.register(JobSubCatagories)
admin.site.register(Bid)
admin.site.register(BookMark)
admin.site.register(SkillsNeeded)
admin.site.register(PostJob)