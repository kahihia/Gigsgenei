from channels import Channel
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
import collections
from django.utils import timezone

from .models import GigOrder
from Showcase.models import Gigs
from .serializers import GigOrderSerializer,ViewGigImagesTitleSerializer

@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def AddGigOrder(request):
    if request.method == 'GET':
        gigorder = GigOrder.objects.filter(Sender=request.user.id)
        serializer = GigOrderSerializer(gigorder, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        request.data['Sender'] = request.user.id
        serializer = GigOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def GetRecievedGigOrders(request):
    if request.method == 'GET':
        gigorder = GigOrder.objects.filter(Reciever=request.user.id)
        serializer = GigOrderSerializer(gigorder, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def ViewGigImagesTitle(request):
    if request.method == 'GET':
        viewgig = Gigs.objects.filter(user=request.user.id)
        serializer = ViewGigImagesTitleSerializer(viewgig, many=True)
        return Response(serializer.data)


