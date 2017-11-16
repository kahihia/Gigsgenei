import uuid
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

from .models import Room,Message
from .serializers import RoomSerializer,MessageSerializer,UserSerializer
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated,))
def AddGetRoom(request):
    if request.method == 'POST':
        try:
            obj = Room.objects.get((Q(HFW=request.data['HFW']) & Q(LFW=request.data['LFW'])) | (Q(HFW=request.data['LFW']) & Q(LFW=request.data['HFW'])))
            if obj:
                serializer = RoomSerializer(obj)
                return Response(serializer.data)
            else:
                print 'else .....................'
                print request.data
                request.data['RoomNo'] = uuid.uuid4().hex[:6].upper()
                serializer = RoomSerializer(data=request.data)
                if serializer.is_valid():
                    HFW = serializer.validated_data['HFW']
                    LFW = serializer.validated_data['LFW']#Current User
                    RoomNo = serializer.validated_data['RoomNo']
                    print '....................;;;;;;;'
                    print RoomNo
                    Deleted = serializer.validated_data['Deleted']
                    obj = Room(HFW=HFW, LFW=LFW, RoomNo=RoomNo,
                               Deleted=Deleted)

                    obj.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            print 'Except......................'
            serializer = RoomSerializer(data=request.data)
            if serializer.is_valid():
                HFW = User.objects.get(pk=serializer.validated_data['HFW'])
                LFW = User.objects.get(pk=serializer.validated_data['LFW'])
                RoomNo = uuid.uuid4().hex[:6].upper()
                print '....................;;;;;;;'
                print RoomNo
                Deleted = serializer.validated_data['Deleted']
                obj = Room(HFW=HFW, LFW=LFW,RoomNo=RoomNo,
                           Deleted=Deleted)

                obj.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def GetUsersForChat(request):
    if request.method == 'GET':
        user = User.objects.filter(~Q(pk=request.user.id))
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def GetMessagesByRoomName(request,id):
    if request.method == 'GET':
        user = Message.objects.filter(Room=id).order_by('CreatedAt')
        serializer = MessageSerializer(user, many=True)
        return Response(serializer.data)


