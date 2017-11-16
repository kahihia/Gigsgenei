from Bidding import views
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

# from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns=[
    url(r'^checkbookmark/', views.CheckBookMark),
    url(r'^deletebookmark/(?P<id>\w{0,50})', views.deleteBookMark),
    url(r'^addbookmark/', views.BookMarkList),
    url(r'^bookmarkstartend/(?P<start>\w{0,50})/(?P<end>\w{0,50})', views.BookMarkStartEndList),

    url(r'^jobcatagories/', views.JobCatagoriesList),
    url(r'^postjob/', views.PostJobList),
    url(r'^loadpostjob/', views.LoadPostJobList),
    url(r'^addbid/', views.AddGetBid),
    url(r'^getjobbyid/(?P<pk>\w{0,50})', views.GetJobById),
    url(r'^joblist/(?P<type>\w{0,50})/(?P<start>\w{0,50})/(?P<username>\w{0,50})', views.PostJobStartEndList),
    url(r'^getbiddedjob/', views.GetBiddedJob),
    url(r'^listbidbyjobid/(?P<jobid>\w{0,50})', views.GetBidsByJobId),#Getting Bidding Info For Seller Dashboard
    # url(r'^addappliedjob/', views.GetBiddedJob),
# Flatten Urls
    url(r'^floadpostjob/(?P<start>\w{0,50})', views.LoadPostJobListFlatten),

    url(r'^androidpostjob/', views.PostJobListAndroid),
    url(r'^androidskillsneeded/', views.PostJobSkillsNeededAndroid),

]
# urlpatterns = format_suffix_patterns(urlpatterns)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
