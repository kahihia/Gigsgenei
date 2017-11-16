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

from .models import Test,TestResults,TestQuestions
from .serializers import TestCatagorySerializer,TestQuestionsSerializer,TestResultSerializer
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

