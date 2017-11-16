from django.conf.urls import url
from django.contrib import admin
from ApiCode import views
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import include,url
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token
urlpatterns = [
    url(r'^profile/', include('Profile.urls')),
    url(r'^gig/', include('Showcase.urls')),
    url(r'^bid/', include('Bidding.urls')),
    url(r'^suggestion/', include('Suggestions.urls')),
    url(r'^chat/', include('websocketchannel.urls')),
    url(r'^test/', include('Test.urls')),
    url(r'^order/', include('ManageOrder.urls')),
    url(r'^admin1/', include('Admin1.urls')),


    url(r'^admin/', admin.site.urls),
    url(r'^login/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
    # url(r'^contractor/', views.ContractorList),
    # url(r'^user/', views.UsersList),
    # # url(r'^login/', views.LoginList),
    # url(r'^acedamicqualification/', views.AcedamicQualificationList),
    # url(r'^otherexperiences/(?P<username>\w{0,50})', views.OtherExperiencesList),
    # url(r'^acedamyqualification/', views.AcedamicQualificationList),
    # url(r'^workexperience/', views.WorkExperienceList),
    # url(r'^skills/', views.AddSkills),#Updated Fully

    # url(r'^skills/', views.SkillsList),
    # url(r'^usernamexist/(?P<username>[\w.@+-]+)$', views.UserNameExist),
    # url(r'^emailexist/(?P<email>[\w.@+-]+)$', views.EmailExist),#[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$
    url(r'^catagories/', views.CatagoriesList),
    url(r'^countries/', views.CountriesList),
    url(r'^institute/(?P<username>\w{0,50})', views.InstituteNameList),
    url(r'^degreename/(?P<username>\w{0,50})', views.DegreeNameList),
    url(r'^designation/(?P<username>\w{0,50})', views.DesignationList),
    url(r'^skillcatagory/(?P<username>\w{0,50})', views.SkillCatagoryList),
    url(r'^skillname/(?P<username>\w{0,50})', views.SkillNameList),
    url(r'^companyname/(?P<username>\w{0,50})', views.CompanyNameList),
    url(r'^expressyourself/', views.ExpressYourselfList),
    url(r'^jobcatagories/', views.JobCatagoriesList),
    url(r'^postjob/', views.PostJobList),
    url(r'^loadpostjob/', views.LoadPostJobList),
    url(r'^getjobbyid/(?P<pk>\w{0,50})]', views.GetJobById),
    url(r'^firsttimelogin/(?P<username>\w{0,50})', views.FirstTimeLoginList),
    url(r'^checkbookmark/(?P<username>\w{0,50})', views.CheckBookMark),
    url(r'^count/(?P<username>\w{0,50})', views.CountProfileInfo),
    url(r'^deletebookmark/(?P<username>\w{0,50})/(?P<id>\w{0,50})', views.deleteBookMark),
    url(r'^joblist/(?P<type>\w{0,50})/(?P<start>\w{0,50})/(?P<username>\w{0,50})', views.PostJobStartEndList),
    url(r'^addbookmark/', views.BookMarkList),
    url(r'^bookmarkstartend/(?P<freelancer>\w{0,50})/(?P<start>\w{0,50})/(?P<end>\w{0,50})', views.BookMarkStartEndList),
    url(r'^loginauth/', views.LoginAuth),
    # url(r'^addgig/', views.AddGig),
    # url(r'^addgigimages/', views.AddGigImages),
    # url(r'^addgigrequirements/', views.AddGigRequirements),
    # url(r'^addgigfaq/', views.AddGigFAQ),
    # url(r'^addgigsearchterms/', views.AddGigSearcTerm),
    # url(r'^viewgigs/', views.ViewGigs),
    # url(r'^viewgigswithimages/', views.ViewGigsWithImages),
    # url(r'^viewgigswitheverything/(?P<id>\w{0,50})/(?P<username>\w{0,50})', views.ViewGigImagesReqFaqSearch),
    url(r'^testquestions/(?P<catagory>\w{0,50})', views.TestQuestionsList),
    url(r'^testcatagories/', views.TestCatagoryList),
    url(r'^testresult/', views.TestResult),
    url(r'^addbid/', views.AddGetBid),
    url(r'^getbiddedjob/', views.GetBiddedJob),
    url(r'^listbidbyjobid/(?P<jobid>\w{0,50})', views.GetBidsByJobId),
    url(r'^addappliedjob/', views.AddAppliedJobs),

    # url(r'^message/', views.websocket),

    #  BookMarkStartEndList DegreeName,SkillCatagory,SkillName,CompanyName,Designation
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

#Channels
# in routing.py websocketchannel

from channels.routing import route
from websocketchannel.consumers import ws_connect, ws_message, ws_disconnect,msg_consumer,my_background_task

channel_routing = [
    route("websocket.connect", ws_connect, path=r"^/(?P<room_name>\w{0,50})/(?P<user_name>\w{0,50})"),
    route("websocket.receive", ws_message, path=r"^/(?P<room_name>\w{0,50})/(?P<user_name>\w{0,50})"),
    route("websocket.disconnect", ws_disconnect, path=r"^/(?P<room_name>\w{0,50})"),
    route("chat-messages", msg_consumer),
    route("my-background-task", my_background_task),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns = format_suffix_patterns(urlpatterns)