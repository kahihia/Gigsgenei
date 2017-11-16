from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from django.contrib.auth.models import User;
from rest_framework import status
from Profile.models import Contractor
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


from .serializers import ChangePasswordSerializer

@api_view(['PUT'])
@permission_classes((permissions.AllowAny,))
def ChangePassword(request, old_password, new_password):
    if request.user.is_authenticated():
        def get_object(self, queryset=None):
            return self.request.user

        try:
            users = User.objects.get(pk=get_object.id)
        except users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'PUT':
            self = get_object()
            serializer = ChangePasswordSerializer(data=request.data)
            if serializer.is_valid():
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                    # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)