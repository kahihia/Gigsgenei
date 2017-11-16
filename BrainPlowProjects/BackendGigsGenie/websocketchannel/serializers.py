from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Room,Message
from Profile.models import ExpressYourself


class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = '__all__'
class ExpressYourselfSerializer(serializers.ModelSerializer):

    class Meta:
        model=ExpressYourself
        fields=('Resume',)

class UserSerializer(serializers.ModelSerializer):
    image = ExpressYourselfSerializer(many=True)
    # HFW = RoomSerializer(many=True)
    # LFW = RoomSerializer(many=True)
    class Meta:
        model=User
        fields=('id','username','image')

class MessageSerializer(serializers.ModelSerializer):
    # Sender = UserSerializer()
    # Room = RoomSerializer()
    class Meta:
        model = Message
        fields = ('Sender','MessageText','Seen','Deleted','CreatedAt')#,'Sender','Room')

