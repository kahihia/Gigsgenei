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

from .models import Gigs,GigsRequirements,GigsSearchTerms,GigsFAQ,GigsImages,GigsReviews,GigsPrize
from .serializers import AddGigFAQSerializer,AddGigImagesSerializer,AddGigRequirementsSerializer,AddGigReviewSerializer,AddGigSearcTermSerializer,\
    ViewGigSerializer,ViewGigImagesSerializer,ViewGigImagesReqFaqSearchSerializer,AddGigSerializer,AddGigPrizeSerializer
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def ViewGigs(request):
    if request.method == 'GET':
        viewgig = Gigs.objects.all()
        serializer = ViewGigSerializer(viewgig, many=True)
        return Response(serializer.data)
# View Gigs Images ViewGigsWithImagesByUserName
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

# View Gigs Images
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def ViewGigsWithImagesByUserName(request,username):
    if request.method == 'GET':
        viewgig = Gigs.objects.filter(user=User.objects.get(username=username))
        serializer = ViewGigImagesSerializer(viewgig, many=True)
        print serializer.data
        data = []
        data.append(serializer.data)
        return Response(data)

        # return Response(serializer.data)

# View Gigs Images
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def ViewGigsByUserId(request):
    if request.method == 'GET':
        viewgig = Gigs.objects.filter(user=request.user.id)
        serializer = ViewGigImagesSerializer(viewgig, many=True)
        print serializer.data
        data = []
        data.append(serializer.data)
        return Response(data)

        # return Response(serializer.data)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def ViewGigImagesReqFaqSearch(request,id):
    if request.method == 'GET':
        viewgig = Gigs.objects.filter(id=id)
        serializer = ViewGigImagesReqFaqSearchSerializer(viewgig, many=True)
        return Response(serializer.data)

        # return Response(serializer.data)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddGig(request):
    serializer = AddGigSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.get(pk=request.user.id)
        Description = serializer.validated_data['Description']
        Catagory = serializer.validated_data['Catagory']
        Title = serializer.validated_data['Title']
        Time = serializer.validated_data['Time']
        Complete = serializer.validated_data['Complete']
        Favourite = serializer.validated_data['Favourite']
        gig_obj = Gigs(user=user, Catagory=Catagory, Title=Title, Description=Description,
                         Time=Time, Complete=Complete, Favourite=Favourite)

        gig_obj.save()
        return Response(gig_obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddGigImages(request):

    serializer = AddGigImagesSerializer(data=request.data)
    if serializer.is_valid():
        complete_file_name1 = "%s.%s" % ('abc1', 'png',)
        # print complete_file_name
        image_1 = ContentFile(base64.b64decode(serializer.validated_data['Image']), name=complete_file_name1)
        print serializer.validated_data['user']
        user = User.objects.get(pk=request.user.id)
        GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
        # print GigId
        image_obj = GigsImages(user=user, GigId=GigId , Image=image_1)

        image_obj.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddGigFAQ(request):
    print request.data
    for faq in request.data['obj']:
        serializer = AddGigFAQSerializer(data=faq)
        if serializer.is_valid():
            user = User.objects.get(pk=request.user.id)
            GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
            Question = serializer.validated_data['Question']
            Answer = serializer.validated_data['Answer']
            obj = GigsFAQ(user=user, GigId=GigId,Question=Question, Answer=Answer)

            obj.save()
    return Response(obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddGigPrize(request):
    print request.data
    serializer = AddGigPrizeSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.get(pk=request.user.id)
        GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
        MinPrize = serializer.validated_data['MinPrize']
        MaxPrize = serializer.validated_data['MaxPrize']
        Days = serializer.validated_data['Days']
        obj = GigsPrize(user=user, GigId=GigId,MinPrize=MinPrize, MaxPrize=MaxPrize,Days=Days)

        obj.save()
        return Response(obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddGigRequirements(request):
    for req in request.data['obj']:
        serializer = AddGigRequirementsSerializer(data=req)
        if serializer.is_valid():
            user = User.objects.get(pk=request.user.id)
            GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
            Requirement = serializer.validated_data['Requirement']
            IsMandatory = serializer.validated_data['IsMandatory']
            obj = GigsRequirements(user=user, GigId=GigId,Requirement=Requirement, IsMandatory=IsMandatory)

            obj.save()
    return Response(obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddGigSearcTerm(request):
    print request.data['obj']

    for searchterm in request.data['obj']:
        # objdata=[];
        # objdata.user = request.data['user']
        print searchterm
        serializer = AddGigSearcTermSerializer(data=searchterm)
        if serializer.is_valid():
            user = User.objects.get(pk=request.user.id)
            print user
            GigId = Gigs.objects.get(id=serializer.validated_data['GigId'])
            print GigId
            SearchTerms = serializer.validated_data['SearchTerm']
            obj = GigsSearchTerms(user=user, GigId=GigId,SearchTerms=SearchTerms)

            obj.save()
    return Response(obj.id, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
