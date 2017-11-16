from django.shortcuts import render
from  django.core.files.base import ContentFile
from django.core import serializers
import base64
from django.contrib.auth.models import User;
from itertools import chain
from django.views.decorators.csrf import csrf_exempt
from itertools import chain
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import TemplateHTMLRenderer
from  rest_framework.views import APIView
from django.db import transaction,IntegrityError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django.db.models import Q

from .models import Contractor,AcedamicQualification,ExpressYourself,OtherExperiences,Skills,WorkExperience
from .serializers import UserSerializer,ContractorSerializer,AcedamicQualificationSerializer,\
    ExpressYourselfSerializer,SkillsSerializer,WorkExperienceSerializer,OtherExperiencesSerializer


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def UsersList(request):
    if request.method == 'GET':
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            userobj=User(
                username=request.data['username'],
                email=request.data['email']
            )
            userobj.set_password(request.data['password'])
            userobj.save()
            return Response(True, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def ContractorList(request):
    if request.method == 'GET':
        try:
            userobj = User.objects.get(pk=request.user.id)
            serializer = UserSerializer(userobj)
            return Response(serializer.data)
        except Contractor.DoesNotExist:
            return Response(status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        serializer = ContractorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def OtherExperiencesList(request):
    if request.method == 'GET':
        otherExperiences = OtherExperiences.objects.filter(user=request.user.id)
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
@permission_classes((IsAuthenticated,))# (permissions.AllowAny,)
def AcedamicQualificationList(request):
    if request.method == 'GET':
        acedamicQualification = AcedamicQualification.objects.filter(user=request.user.id)
        serializer = AcedamicQualificationSerializer(acedamicQualification, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        for objeducation in request.data["education"]:
            try:
                print objeducation
                serializer = AcedamicQualificationSerializer(data=objeducation)
                if serializer.is_valid():
                    obj = AcedamicQualification(
                    user=User.objects.get(pk=request.user.id),
                    DegreeName=serializer.validated_data['DegreeName'],
                    StartYear=serializer.validated_data['StartYear'],
                    EndYear=serializer.validated_data['EndYear'],
                    Institution= serializer.validated_data['Institution'],
                    Percentile = serializer.validated_data['Percentile'],
                    Deleted = serializer.validated_data['Deleted'])
                    obj.save()
                # if serializer.is_valid():
                #     print 'save'
                #     serializer.save()
            except:
                continue
        return Response(True,status=status.HTTP_201_CREATED)

# User Acedamy Qualifications Information Edit and Delete
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def AcedamicQualificationEditDelete(request, pk):
    try:
        acedamicQualification = AcedamicQualification.objects.get(pk=pk, user=request.user.id)
    except AcedamicQualification.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        acedamicQualification = AcedamicQualification.objects.get(pk=pk)
        serializer = AcedamicQualificationSerializer(acedamicQualification)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AcedamicQualificationSerializer(acedamicQualification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        acedamicQualification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# User Work Experience Information
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def WorkExperienceList(request):
    if request.method == 'GET':
        workExperience = WorkExperience.objects.filter(user=request.user.id)
        print workExperience
        serializer = WorkExperienceSerializer(workExperience, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        for objwork in request.data["workexprience"]:
            try:
                print objwork
                serializer = WorkExperienceSerializer(data=objwork)
                if serializer.is_valid():
                    print 'valid'
                    obj = WorkExperience(
                        user=User.objects.get(pk=request.user.id),
                        CompanyName=serializer.validated_data['CompanyName'],
                        Designation=serializer.validated_data['Designation'],
                        StartYear=serializer.validated_data['StartYear'],
                        EndYear = serializer.validated_data['EndYear'],
                        Description = serializer.validated_data['Description'],
                        Deleted = serializer.validated_data['Deleted'])
                    print obj
                    obj.save()
                    print 'save'
            except:
                print 'except'
                # return Response(serializer.errors, status=status.HTTP_201_CREATED)
                continue
        return Response(True, status=status.HTTP_201_CREATED)

# User Work Experience Information Edit and Delete
@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated,))
def WorkExperienceEditDelete(request,pk):
    try:
        workExperience = WorkExperience.objects.get(pk=pk, user=request.user.id)
    except WorkExperience.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        workExperience = WorkExperience.objects.get(pk=pk)
        serializer = WorkExperienceSerializer(workExperience)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = WorkExperienceSerializer(workExperience, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        workExperience.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# User Skill Set Information
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def AddSkills(request):
    if request.method == 'GET':
        skills = Skills.objects.filter(user=request.user.id)
        serializer = SkillsSerializer(skills, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        for objskills in request.data["skills"]:
            try:
                serializer = SkillsSerializer(data=objskills)
                if serializer.is_valid():
                    obj = Skills(
                        user=User.objects.get(pk=request.user.id),
                        SkillName=serializer.validated_data['SkillName'],
                        SkillLevel=serializer.validated_data['SkillLevel'],
                        Deleted=serializer.validated_data['Deleted'])
                    obj.save()
                    print 'save'
            except:
                print 'except'
                continue
        return Response(True, status=status.HTTP_201_CREATED)


# User Skill Information Edit and Delete
@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated,))
def SkillsEditDelete(request,pk):
    try:
        skill = Skills.objects.get(pk=pk, user=request.user.id)
    except Skills.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        skill = Skills.objects.get(pk=pk)
        serializer = SkillsSerializer(skill)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SkillsSerializer(skill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        skill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# User Express Yourself
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated,))
def ExpressYourselfList(request):
    if request.method == 'GET':
        exp = ExpressYourself.objects.get(user=request.user.id)
        serializer = ExpressYourselfSerializer(exp)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ExpressYourselfSerializer(data=request.data)
        if serializer.is_valid():
            complete_file_name = "%s.%s" % ('abc', 'png',)
            image_1 = ContentFile(base64.b64decode(serializer.validated_data['Resume']), name=complete_file_name)
            UserName = User.objects.get(pk=request.user.id)
            print UserName
            FullName = serializer.validated_data['FullName']
            Description = serializer.validated_data['Description']
            Deleted= serializer.validated_data['Deleted']
            image_obj = ExpressYourself(user=UserName, FullName=FullName, Description=Description, Resume=image_1, Deleted=Deleted)
            image_obj.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def UserNameExist(request):
    if request.method == 'POST':
        if (User.objects.filter(username=request.data['username']).exists()):
            return Response(True)
        else:
            return Response(False)

# User's Email already exist Entry.objects.filter(name='name', title='title').exists()
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def EmailExist(request):
    if request.method == 'POST':
        if (User.objects.filter(email=request.data['email']).exists()):
            return Response(True)
        else:
            return Response(False)







