from Test import views
from django.conf.urls import url

urlpatterns=[
    url(r'^testquestions/(?P<catagory>\w{0,50})', views.TestQuestionsList),
    url(r'^testcatagories/', views.TestCatagoryList),
    url(r'^testresult/', views.TestResult),
]
