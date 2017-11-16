from changepassword import views
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns=[


    url(r'^change_password/', views.ChangePassword),  # User can change the password


]