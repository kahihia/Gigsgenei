from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from Test.models import Test, TestQuestions
from .models import AddDescription
from django.core import serializers
from rest_framework.decorators import api_view
from  rest_framework.views import APIView
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
import base64
from itertools import chain
from django.views.decorators.csrf import csrf_exempt
from Test.models import TestQuestions,TestResults



from .serializers import AddTestSerializer, AddTestQuestionsSerializer, AddDescriptionSerializer



#Admin can Get, Update the Description

@api_view(['GET','PUT'])
@permission_classes((permissions.AllowAny,))
def AddDescriptions(request):
    try:
        add = AddDescription.objects.get()
    except AddDescription.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        add = AddDescription.objects.get()
        serializer = AddDescriptionSerializer(add)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AddDescriptionSerializer(add,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#Admin can Get, add the categories

@api_view(['GET','POST'])
@permission_classes((permissions.AllowAny,))
def AddTest(request):


    if request.method == 'GET':
        test = Test.objects.all()
        serializer = AddTestSerializer(test, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AddTestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#Admin can update or delete the categories

@api_view(['GET','PUT', 'DELETE'])
@permission_classes((permissions.AllowAny,))
def UpdateTest(request, pk):

    try:
        test = Test.objects.get(pk=pk)
    except Test.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        test = Test.objects.get(pk=pk)
        serializer = AddTestSerializer(test)
        return Response(serializer.data)

    if request.method == 'PUT':
        print request.data
        serializer = AddTestSerializer(test, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':

        test.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



#Admin can get, add and update the Test Questions
@api_view(['GET','POST', 'PUT'])
@permission_classes((permissions.AllowAny,))
def AddTestQuestions(request, catagory):
    # print("------------------------"+catagory)
    # try:
    #  catagory = Test.objects.get(catagory=catagory)
    # except Test.DoesNotExist:
    #  return Response(status=404)


    if request.method == 'GET':
        obj1=Test.objects.get(Catagory=catagory)
        addquestions = TestQuestions.objects.filter(Catagory=obj1)

        serializer = AddTestQuestionsSerializer(addquestions, many=True)
        return Response(serializer.data)


    elif request.method == 'POST':
        serializer = AddTestQuestionsSerializer(data=request.data)
        if serializer.is_valid():
            print serializer.data
            catagory = Test.objects.get(Catagory=serializer.validated_data['Catagory'])
            Question = serializer.validated_data['Question']
            print Question
            A = serializer.validated_data['A']
            print A
            B = serializer.validated_data['B']
            print B
            C = serializer.validated_data['C']
            print C
            D = serializer.validated_data['D']
            print D
            Answer = serializer.validated_data['Answer']
            print Answer

            obj= TestQuestions(Catagory=catagory, Question=Question, A=A, B=B, C=C, D=D, Answer=Answer)

            obj.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Admin can update the Test Questions
#
# @api_view(['PUT'])
# @permission_classes((permissions.AllowAny,))
# def AddTestQuestions(request):