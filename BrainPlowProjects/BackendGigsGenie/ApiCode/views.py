# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from  django.core.files.base import ContentFile
from django.core import serializers
import base64
from django.contrib.auth.models import User;
from itertools import chain
from django.views.decorators.csrf import csrf_exempt
from itertools import chain
from django.shortcuts import render
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import TemplateHTMLRenderer
from  rest_framework.views import APIView
from django.db import transaction,IntegrityError
from rest_framework.response import Response
from rest_framework import status
from .models import Catagories
from .models import Countries,TestQuestions
from .models import Contractor, BookMark,Bid
from .models import Login, Gigs, GigsImages,Test,GigsReviews
from .models import AcedamicQualification,AppliedJobs
from .models import OtherExperiences, InstituteName,GigsSearchTerms,GigsFAQ,GigsRequirements
from .models import Skills, PostJob, FirstTimeLogin1
from .models import Person, Contractor, WorkExperience, ExpressYourself,TestResults
from .models import DegreeName, SkillCatagory, SkillName, CompanyName, Designation, JobCatagories

from .serializers import ContractorSerializer, TestResultSerializer,AddGetBidSerializer,GetBidsByJobIdSerializer,UserSerializer
from .serializers import LoginSerializer, AddGigSerializer, AddGigImagesSerializer, ViewGigImagesSerializer, ViewGigImagesSerializerTest
from .serializers import AcedamicQualificationSerializer, CheckBookMarkSerializer
from .serializers import OtherExperiencesSerializer,ViewGigImagesReqFaqSearchSerializer,TestCatagorySerializer
from .serializers import SkillsSerializer, PostJobSerializerList
from .serializers import CatagoriesSerializer, BookMarkSerializer, FirstTimeLoginSerializer,AddAppliedJobsSerializer
from .serializers import CountriesSerializer, JobCatagoriesSerializer
from .serializers import PersonSerializer, AcedamicQualificationListSerializer, WorkExperienceSerializer, \
    ViewGigSerializer, AddGigFAQSerializer,AddGigRequirementsSerializer,AddGigSearcTermSerializer
from .serializers import SkillsSerializer, InstituteNameSerializer, LoginAuthSerializerList
from .serializers import ExpressYourselfSerializer, ExpressYourselfListSerializer, PostJobSerializer,GetBiddedJobsSerializerList
from .serializers import DegreeNameSerializer, SkillCatagorySerializer, SkillNameSerializer, CompanyNameSerializer, \
    DesignationSerializer,InstituteNameSerializer1,TestQuestionsSerializer,AddGigReviewSerializer
from django.db.models import Q

from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.generics import ListAPIView

# User Personal Information
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def UsersList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User Personal Information
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def ContractorList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        contractor = Contractor.objects.all()
        serializer = ContractorSerializer(contractor, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ContractorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List All Institute
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def DegreeNameList(request, username):
    if request.method == 'GET':
        # list=[]
        queryset = DegreeName.objects.filter(reduce(lambda x, y: x | y, [Q(Name__contains=word) for word in username]))
        # queryset = queryset.filter(full_name__icontains=string)
        serializer = DegreeNameSerializer(queryset, many=True)
        return Response(serializer.data)


# List All Institute
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def SkillCatagoryList(request, username):
    if request.method == 'GET':
        # list=[]
        queryset = SkillCatagory.objects.filter(
            reduce(lambda x, y: x | y, [Q(Name__contains=word) for word in username]))
        # queryset = queryset.filter(full_name__icontains=string)
        serializer = SkillCatagorySerializer(queryset, many=True)
        return Response(serializer.data)


# List All Institute
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def SkillNameList(request, username):
    if request.method == 'GET':
        # list=[]
        queryset = SkillName.objects.filter(reduce(lambda x, y: x | y, [Q(Name__contains=word) for word in username]))
        # queryset = queryset.filter(full_name__icontains=string)
        serializer = SkillNameSerializer(queryset, many=True)
        return Response(serializer.data)


# List All Institute
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def CompanyNameList(request, username):
    if request.method == 'GET':
        # list=[]
        queryset = CompanyName.objects.filter(reduce(lambda x, y: x | y, [Q(Name__contains=word) for word in username]))
        # queryset = queryset.filter(full_name__icontains=string)
        serializer = CompanyNameSerializer(queryset, many=True)
        return Response(serializer.data)


# List All Institute
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def DesignationList(request, username):
    if request.method == 'GET':
        # list=[]
        queryset = Designation.objects.filter(reduce(lambda x, y: x | y, [Q(Name__contains=word) for word in username]))
        # queryset = queryset.filter(full_name__icontains=string)
        serializer = DesignationSerializer(queryset, many=True)
        return Response(serializer.data)


# List All Institute
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def InstituteNameList(request, username):
    username = request.GET.get('query', '')
    print username
    if request.method == 'GET':
        # list=[]
        queryset1 = InstituteName.objects.filter(
           Q(name__istartswith=username, country__istartswith='pakistan'))[0:10]
        queryset2 = InstituteName.objects.filter(
           Q(name__istartswith=username))[0:10]
        queryset = chain(queryset1, queryset2)
        # queryset = queryset.filter(full_name__icontains=string)
        serializer = InstituteNameSerializer(queryset, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        for data in request.data:
             serializer = InstituteNameSerializer1(data=data)
             if serializer.is_valid():
                 serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List All Countries
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def CountriesList(request):
    if request.method == 'GET':
        countries = Countries.objects.all()
        serializer = CountriesSerializer(countries, many=True)
        return Response(serializer.data)


# List All Job Catagories
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def CatagoriesList(request):
    if request.method == 'GET':
        catagories = Catagories.objects.all()
        serializer = CatagoriesSerializer(catagories, many=True)
        return Response(serializer.data)


# Temporary
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def PersonList(request):
    if request.method == 'POST':
        serializer = PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        person = Person.objects.all()
        serializer = PersonSerializer(person, many=True)
        return Response(serializer.data)


# Counts of different things for Profile Completion
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def CountProfileInfo(request, username):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        count1 = WorkExperience.objects.filter(UserName=username).count()
        count2 = AcedamicQualification.objects.filter(UserName=username).count()
        count3 = Skills.objects.filter(UserName=username).count()
        count4 = ExpressYourself.objects.filter(UserName=username).count()
        count5 = OtherExperiences.objects.filter(UserName=username).count()

        List12 = []
        List12.append(count1)  # Work Experience
        List12.append(count2)  # Educational Info
        List12.append(count3)  # Skills
        List12.append(count4)  # Express YourSElf Plus CV
        List12.append(count5)  # Other Experience
        return Response(List12)


# .objects.filter(username='myname', status=0).count()

# First Time Login
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def FirstTimeLoginList(request, username):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        firsttimeLogin = FirstTimeLogin1.objects.filter(UserName=username)
        serializer = FirstTimeLoginSerializer(firsttimeLogin, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FirstTimeLoginSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User Login Information
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def LoginList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        login = Login.objects.all()
        serializer = LoginSerializer(login, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            # obj =Login(UserName=Contractor.objects.get(UserName=serializer.validated_data['username']),
            #                            Password=serializer.validated_data['Password'],
            #                            UserType=serializer.validated_data['UserType'])
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Gigs Information Of Users/////////////////////////////////////////////////////////////////////////////////////////////



#View Gigs
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def ViewGigs(request):
    if request.method == 'GET':
        viewgig = Gigs.objects.all()
        serializer = ViewGigSerializer(viewgig, many=True)
        return Response(serializer.data)
# View Gigs Images
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def ViewGigsWithImages(request):
    if request.method == 'GET':
        viewgig = Gigs.objects.all()
        serializer = ViewGigImagesSerializer(viewgig, many=True)
        print serializer.data
        data = []
        data.append(serializer.data)
        return Response(data)

        # return Response(serializer.data)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def ViewGigImagesReqFaqSearch(request,id,username):
    if request.method == 'GET':
        viewgig = Gigs.objects.filter(id=id,UserName=username)
        serializer = ViewGigImagesReqFaqSearchSerializer(viewgig, many=True)
        print serializer.data
        data = []
        data.append(serializer.data)
        return Response(data)

        # return Response(serializer.data)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def AddGig(request):
    serializer = AddGigSerializer(data=request.data)
    if serializer.is_valid():
        UserName = Contractor.objects.get(UserName=serializer.validated_data['UserName'])
        Description = serializer.validated_data['Description']
        Catagory = serializer.validated_data['Catagory']
        Title = serializer.validated_data['Title']
        Time = serializer.validated_data['Time']
        Complete = serializer.validated_data['Complete']
        Favourite = serializer.validated_data['Favourite']
        image_obj = Gigs(UserName=UserName, Catagory=Catagory, Title=Title, Description=Description,
                         Time=Time, Complete=Complete, Favourite=Favourite)

        image_obj.save()
        return Response(image_obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def AddGigImages(request):

    serializer = AddGigImagesSerializer(data=request.data)
    if serializer.is_valid():
        complete_file_name1 = "%s.%s" % ('abc1', 'png',)
        # print complete_file_name
        image_1 = ContentFile(base64.b64decode(serializer.validated_data['Image']), name=complete_file_name1)
        print serializer.validated_data['UserName']
        UserName = Contractor.objects.get(UserName=serializer.validated_data['UserName'])
        GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
        # print GigId
        image_obj = GigsImages(UserName=UserName, GigId=GigId , Image=image_1)

        image_obj.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def AddGigFAQ(request):
    print request.data
    for faq in request.data['obj']:
        serializer = AddGigFAQSerializer(data=faq)
        if serializer.is_valid():
            UserName = Contractor.objects.get(UserName=serializer.validated_data['UserName'])
            GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
            Question = serializer.validated_data['Question']
            Answer = serializer.validated_data['Answer']
            obj = GigsFAQ(UserName=UserName, GigId=GigId,Question=Question, Answer=Answer)

            obj.save()
    return Response(obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def AddGigRequirements(request):
    for req in request.data['obj']:
        serializer = AddGigRequirementsSerializer(data=req)
        if serializer.is_valid():
            UserName = Contractor.objects.get(UserName=serializer.validated_data['UserName'])
            GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
            Requirement = serializer.validated_data['Requirement']
            IsMandatory = serializer.validated_data['IsMandatory']
            obj = GigsRequirements(UserName=UserName, GigId=GigId,Requirement=Requirement, IsMandatory=IsMandatory)

            obj.save()
    return Response(obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def AddGigSearcTerm(request):
    print request.data['obj']

    for searchterm in request.data['obj']:
        # objdata=[];
        # objdata.UserName = request.data['UserName']
        print searchterm
        serializer = AddGigSearcTermSerializer(data=searchterm)
        if serializer.is_valid():
            UserName = Contractor.objects.get(UserName=serializer.validated_data['UserName'])
            print UserName
            GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
            print GigId
            SearchTerms = serializer.validated_data['SearchTerm']
            obj = GigsSearchTerms(UserName=UserName, GigId=GigId,SearchTerms=SearchTerms)

            obj.save()
    return Response(obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# End Gigs Information Of Users/////////////////////////////////////////////////////////////////////////////////////////////



# User Profil Information /////////////////////////////////////////////////////////////////////////////////////////////////



# User Information about his/her Experiences In Life
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def OtherExperiencesList(request, username):
    if request.method == 'GET':
        otherExperiences = OtherExperiences.objects.filter(UserName=username)
        serializer = OtherExperiencesSerializer(otherExperiences, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = OtherExperiencesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Acedamic Information
@api_view(['GET','POST'])
@permission_classes((permissions.AllowAny,))
def AcedamicQualificationList(request):
    # try:
    #     contractor = Contractor.objects.get(UserName=request.data["UserName"])
    #     print contractor
    # except Contractor.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        acedamicQualification = AcedamicQualification.objects.all()
        serializer = AcedamicQualificationSerializer(acedamicQualification, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        for objeducation in request.data["education"]:
            try:
                print objeducation
                serializer = AcedamicQualificationSerializer(data=objeducation)
                print 'before'
                if serializer.is_valid():
                    print 'save'
                    serializer.save()
            except:
                continue
        return Response(serializer.errors,status=status.HTTP_201_CREATED)

# User Work Experience Information
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def WorkExperienceList(request):
    print 'hello'
    # try:
    #     contractor = Contractor.objects.get(UserName=request.data["UserName"])
    #     print contractor
    # except Contractor.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        workExperience = WorkExperience.objects.all()
        print workExperience
        serializer = WorkExperienceSerializer(workExperience, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        print 'user : '+request.data["UserName"]
        for objwork in request.data["workexprience"]:
            try:
                print objwork
                serializer = WorkExperienceSerializer(data=objwork)
                if serializer.is_valid():
                    print 'saved'
                    serializer.save()
            except:
                print 'except'
                continue
        return Response(serializer.errors, status=status.HTTP_201_CREATED)


        # serializer.save()
            # except:
            #     continue

# User Skill Set Information
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def AddSkills(request):
    # try:
    #     contractor = Contractor.objects.get(UserName=request.data["UserName"])
    #     print contractor
    # except Contractor.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        skills = Skills.objects.all()
        serializer = SkillsSerializer(skills, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        for objskills in request.data["skills"]:
            try:
                print objskills
                serializer = SkillsSerializer(data=objskills)
                if serializer.is_valid():
                    serializer.save()
            except:
                continue
        return Response(serializer.data,status=status.HTTP_201_CREATED)


# User Express Yourself
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def ExpressYourselfList(request):
    serializer = ExpressYourselfListSerializer(data=request.data)
    if serializer.is_valid():
        complete_file_name = "%s.%s" % ('abc', 'png',)
        image_1 = ContentFile(base64.b64decode(serializer.validated_data['Resume']), name=complete_file_name)
        UserName = Contractor.objects.get(UserName=serializer.validated_data['UserName'])
        FullName = serializer.validated_data['FullName']
        Description = serializer.validated_data['Description']
        image_obj = ExpressYourself(UserName=UserName, FullName=FullName, Description=Description, Resume=image_1)
        image_obj.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# End User Profile Information //////////////////////////////////////////////////////////////////////////////////////////







# User's UserName and Password Auth Entry.objects.filter(name='name', title='title').exists()
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def LoginAuth(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'POST':
        usertype = Contractor.objects.filter(UserName=request.data['username'], Password=request.data['password'])
        serializer = LoginAuthSerializerList(usertype, many=True)
        if (Contractor.objects.filter(UserName=request.data['username'], Password=request.data['password']).exists()):
            return Response(serializer.data)
        else:
            return Response(False)


# User's Email already exist Entry.objects.filter(name='name', title='title').exists()
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def EmailExist(request, email):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        if (Contractor.objects.filter(Email=email).exists()):
            return Response(True)
        else:
            return Response(False)


# User Skill Set Information
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def GetJobById(request, pk):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        postjob = PostJob.objects.filter(pk=pk)
        serializer = PostJobSerializerList(postjob, many=True)
        return Response(serializer.data)


# User BookMarked Jobs List
@api_view(['GET', ])
@permission_classes((permissions.AllowAny,))
def CheckBookMark(request, username):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        bookmark = BookMark.objects.filter(Freelancer=username)
        serializer = CheckBookMarkSerializer(bookmark, many=True)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        bookmark = BookMark.objects.get(Id=username)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# User Delete BookMarked Job
@api_view(['DELETE', ])
@permission_classes((permissions.AllowAny,))
def deleteBookMark(request, username, id):
    """
    List all snippets, or create a new snippet.
    """
    try:
        bookmark = BookMark.objects.get(Freelancer=username, Id=id)
    except bookmark.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# User Skill Set Information GetJobById
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def PostJobStartEndList(request, type, start,username):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        end = int(start) + 10
        postjob= PostJob.objects.filter(~Q(UserName=username),Q(jobtype=type)).order_by('id')[start:end]  # objects.filter(UserName=username)
        # postjob = tmp.exclude(Username=username)
        serializer = PostJobSerializerList(postjob, many=True)
        return Response(serializer.data)


# User Load Template Post a Job
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def LoadPostJobList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'POST':#id=request.data['id'],
        end = int(request.data['start']) + 10
        postjob = PostJob.objects.filter( UserName=request.data['username']).order_by('id')[0:end]
        serializer = PostJobSerializerList(postjob, many=True)
        return Response(serializer.data)

# User Post a Job
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def PostJobList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        postjob = PostJob.objects.all()
        serializer = PostJobSerializerList(postjob, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostJobSerializer(data=request.data)
        if serializer.is_valid():
            # obj = PostJob(UserName=Contractor.objects.get(UserName=serializer.validated_data['username']),
            #     jobcatagory=serializer.validated_data['jobcatagory'],
            #     jobname=serializer.validated_data['jobname'],
            #     description=serializer.validated_data['description'],
            #     files= serializer.validated_data['files'],
            #     skillsneeded = serializer.validated_data['skillsneeded'],
            #     expriencelevel = serializer.validated_data['expriencelevel'],
            #     completiontime = serializer.validated_data['completiontime'],
            #     status = serializer.validated_data['status'],
            #     jobtype = serializer.validated_data['jobtype'],
            #     posttype=serializer.validated_data['posttype'])
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Book Mark JOb getting
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def BookMarkStartEndList(request, freelancer, start, end):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        bookmark = BookMark.objects.filter(Freelancer=freelancer).order_by('id')[start:end]
        serializer = BookMarkSerializer(bookmark, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def BookMarkList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        bookmark = BookMark.objects.all()
        serializer = BookMarkSerializer(bookmark, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookMarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User Personal Information
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def JobCatagoriesList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        jobcatagories = JobCatagories.objects.all()
        serializer = JobCatagoriesSerializer(jobcatagories, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = JobCatagoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User's Email already exist Entry.objects.filter(name='name', title='title').exists()
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def UserNameExist(request, username):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        if (Contractor.objects.filter(UserName=username).exists()):
            return Response(True)
        else:
            return Response(False)


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def UserNameExistTemp(username):
    arr = Contractor.objects.filter(UserName=username)
    if (arr.count() > 0):
        data = {'exists': 'Yes'}
        return Response(data)
    else:
        data = {'exists': 'No'}
        return Response(data)

# class StockList(APIView):
#
#     def get(self,request):
#         stocks = Stock.objects.all()
#         serializer = StockSerializer(stocks, many=True)
#         return Response(serializer.data)
#
#     def post(self):
#         pass

# Get Test
@api_view(['GET','POST'])
@permission_classes((permissions.AllowAny,))
def TestQuestionsList(request, catagory):
    if request.method == 'GET':
        jobcatagories = TestQuestions.objects.filter(Catagory=catagory)
        serializer = TestQuestionsSerializer(jobcatagories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TestQuestionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Post and Get Test Results
@api_view(['GET','POST'])
@permission_classes((permissions.AllowAny,))
def TestResult(request):
    if request.method == 'GET':
        jobcatagories = TestResults.objects.all()
        serializer = TestResultSerializer(jobcatagories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TestResultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def TestCatagoryList(request):
    if request.method == 'GET':
        jobcatagories = Test.objects.all()
        serializer = TestCatagorySerializer(jobcatagories, many=True)
        return Response(serializer.data)

@api_view(['GET','POST'])
@permission_classes((permissions.AllowAny,))
def AddGetBid(request):
    if request.method == 'GET':
        bids = Bid.objects.all()
        serializer = AddGetBidSerializer(bids, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AddGetBidSerializer(data=request.data)
        if serializer.is_valid():
            BidOwner = Contractor.objects.get(UserName=serializer.validated_data['BidOwner'])
            print BidOwner
            JobId = PostJob.objects.get(id=serializer.validated_data['JobId'])
            print JobId
            Bidder = Contractor.objects.get(UserName=serializer.validated_data['Bidder'])
            BidPrize = serializer.validated_data['BidPrize']
            Days = serializer.validated_data['Days']
            Title = serializer.validated_data['Title']
            Status = serializer.validated_data['Status']
            ExpertGuarantee = serializer.validated_data['ExpertGuarantee']
            SponsorMyBid = serializer.validated_data['SponsorMyBid']
            HighlightMyBid = serializer.validated_data['HighlightMyBid']
            bidobj = Bid(BidOwner=BidOwner, JobId=JobId, Bidder=Bidder, BidPrize=BidPrize,
                          Days=Days, Title=Title, Status=Status,ExpertGuarantee=ExpertGuarantee,
                         SponsorMyBid=SponsorMyBid,HighlightMyBid=HighlightMyBid)

            bidobj.save()
            return Response(bidobj.id, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def GetBidsByJobId(request, jobid):
    if request.method == 'GET':
        bid = PostJob.objects.filter(id=jobid)
        serializer = GetBidsByJobIdSerializer(bid, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def AddAppliedJobs(request):
    if request.method == 'POST':
        serializer = AddAppliedJobsSerializer(data=request.data)
        if serializer.is_valid():
            JobApplier = Contractor.objects.get(UserName=serializer.validated_data['JobApplier'])
            AppliedJobId = PostJob.objects.get(id=serializer.validated_data['AppliedJobId'])
            appliedjobobj = AppliedJobs(JobApplier=JobApplier, AppliedJobId=AppliedJobId)
            appliedjobobj.save()
            return Response(appliedjobobj.id, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def GetBiddedJob(request):# Jobs User has Bidded So far
    if request.method == 'POST':
        print request.data['start']
        print request.data['username']
        end = int(request.data['start']) + 10
        appliedjob = Bid.objects.filter( Bidder=request.data['username']).order_by('id')[0:end]
        serializer = GetBiddedJobsSerializerList(appliedjob, many=True)
        return Response(serializer.data)


