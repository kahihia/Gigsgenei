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

from .models import SkillName,DegreeName,CompanyName,Designation,InstituteName
from .serializers import SkillNameSerializer,DegreeNameSerializer,CompanyNameSerializer,DesignationSerializer,InstituteNameSerializer

# List All Institute
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def DegreeNameList(request):
    if request.method == 'GET':
        queryset = DegreeName.objects.all()
        serializer = DegreeNameSerializer(queryset, many=True)
        return Response(serializer.data)
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def SkillNameList(request):
    if request.method == 'GET':
        queryset = SkillName.objects.all()
        serializer = SkillNameSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        for obj in request.data:
            serializer = SkillNameSerializer(data=obj)
            if serializer.is_valid():
                serializer.save()
                print 'save'
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def CompanyNameList(request):
    if request.method == 'GET':
        queryset = CompanyName.objects.all()
        serializer = CompanyNameSerializer(queryset, many=True)
        return Response(serializer.data)
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def DesignationList(request):
    if request.method == 'GET':
        queryset = Designation.objects.all()
        serializer = DesignationSerializer(queryset, many=True)
        return Response(serializer.data)