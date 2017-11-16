from Admin1 import views1
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns=[


    url(r'^addtest/', views1.AddTest),  # Get, Add, Test Category
    url(r'^updatetest/(?P<pk>\w{0,50})', views1.UpdateTest), # Update and Delete Test Category

    url(r'^addtestquestions/(?P<catagory>\w{0,50})', views1.AddTestQuestions),  # Add Test Questions

    url(r'^addhomepagedescription/', views1.AddDescriptions),   #Add HomePage Description

]