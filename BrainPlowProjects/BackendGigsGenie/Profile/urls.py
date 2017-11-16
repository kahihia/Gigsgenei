from Profile import views
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

# from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns=[
    url(r'^contractor/', views.ContractorList),
    url(r'^user/', views.UsersList),
    url(r'^acedamyqualification/', views.AcedamicQualificationList),
    url(r'^otherexperiences/', views.OtherExperiencesList),
    url(r'^expressyourself/', views.ExpressYourselfList),
    url(r'^workexperience/', views.WorkExperienceList),
    url(r'^skills/', views.AddSkills)  ,  # Updated Fully
    url(r'^usernamexist/', views.UserNameExist),
    url(r'^emailexist/', views.EmailExist),  # [a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$

    url(r'^editworkexperience/(?P<pk>[0-9]+)$', views.WorkExperienceEditDelete),
    url(r'^editacedamyqualification/(?P<pk>[0-9]+)$', views.AcedamicQualificationEditDelete),
    url(r'^editskills/(?P<pk>[0-9]+)$', views.SkillsEditDelete),

]
# urlpatterns = format_suffix_patterns(urlpatterns)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
