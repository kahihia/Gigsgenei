from django.contrib.auth.models import User
from rest_framework import serializers
from Showcase.models import Gigs,GigsImages
from .models import GigOrder
class GigOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=GigOrder
        fields='__all__'
class GigImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=GigsImages
        fields='__all__'
class ViewGigImagesTitleSerializer(serializers.ModelSerializer):
    tracks = GigImagesSerializer(many=True)
    class Meta:
        model = Gigs
        fields = ('id', 'user', 'Catagory', 'Title', 'Description','tracks')



