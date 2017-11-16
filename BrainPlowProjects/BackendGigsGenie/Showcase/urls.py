from Showcase import views
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

# from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns=[
    url(r'^addgig/', views.AddGig),
    url(r'^addgigimages/', views.AddGigImages),
    url(r'^addgigrequirements/', views.AddGigRequirements),
    url(r'^addgigprize/', views.AddGigPrize),
    url(r'^addgigfaq/', views.AddGigFAQ),
    url(r'^addgigsearchterms/', views.AddGigSearcTerm),
    url(r'^viewgigs/', views.ViewGigs),
    url(r'^viewgigswithimages/', views.ViewGigsWithImages),
    url(r'^viewgigswithimagesbyusername/(?P<username>\w{0,50})/', views.ViewGigsWithImagesByUserName),
    url(r'^viewgigsbyuserid/', views.ViewGigsByUserId),
    url(r'^viewgigswitheverything/(?P<id>\w{0,50})/', views.ViewGigImagesReqFaqSearch),
]
# urlpatterns = format_suffix_patterns(urlpatterns)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
