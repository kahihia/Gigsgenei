from Suggestions import views
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

# from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns=[
    url(r'^degreename/', views.DegreeNameList),
    url(r'^skillname/', views.SkillNameList),
    url(r'^designationname/', views.DesignationList),
    url(r'^companyname/', views.CompanyNameList),
]
# urlpatterns = format_suffix_patterns(urlpatterns)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
