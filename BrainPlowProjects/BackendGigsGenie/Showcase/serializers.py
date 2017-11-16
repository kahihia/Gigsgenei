from django.contrib.auth.models import User
from rest_framework import serializers
from .models import GigsReviews,GigsImages,GigsFAQ,GigsSearchTerms,GigsRequirements,Gigs,GigsPrize
from Profile.models import ExpressYourself


class AddGigSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    user = serializers.CharField()
    Description = serializers.CharField(allow_blank=True)
    Catagory = serializers.CharField(allow_blank=True)
    Title = serializers.CharField(allow_blank=True)
    Time = serializers.CharField(allow_blank=True)
    Complete = serializers.BooleanField()
    Favourite = serializers.BooleanField()

    class Meta:
        model = Gigs
        fields = ('id','user','Catagory','Title','Time','Complete','Favourite','Description')

    def create(self, validated_data):
        return Gigs.objects.create(**validated_data)


class AddGigImagesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    user = serializers.CharField()
    GigId = serializers.CharField()
    Image = serializers.CharField(allow_blank=True)

    class Meta:
        model = GigsImages
        fields = ('id','user','GigId','Image')

    def create(self, validated_data):
        return Gigs.objects.create(**validated_data)


class AddGigPrizeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    user = serializers.CharField()
    GigId = serializers.CharField()
    MinPrize = serializers.IntegerField()
    MaxPrize = serializers.IntegerField()
    Days = serializers.IntegerField()
    class Meta:
        model = GigsPrize
        fields = ('id','user','GigId','MinPrize','MaxPrize','Days')

    def create(self, validated_data):
        return GigsPrize.objects.create(**validated_data)


class AddGigFAQSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    user = serializers.CharField()
    GigId = serializers.CharField()
    Question = serializers.CharField(allow_blank=True)
    Answer = serializers.CharField(allow_blank=True)
    class Meta:
        model = GigsFAQ
        fields = ('id','user','GigId','Question','Answer')

    def create(self, validated_data):
        return GigsFAQ.objects.create(**validated_data)


class AddGigRequirementsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    user = serializers.CharField()
    GigId = serializers.CharField()
    Requirement = serializers.CharField(allow_blank=True)
    IsMandatory = serializers.BooleanField()
    class Meta:
        model = GigsRequirements
        fields = ('id','user','GigId','Requirement','IsMandatory')

    def create(self, validated_data):
        return GigsRequirements.objects.create(**validated_data)


class AddGigSearcTermSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    user = serializers.CharField()
    GigId = serializers.CharField()
    SearchTerm = serializers.CharField(allow_blank=True)
    class Meta:
        model = GigsSearchTerms
        fields = ('id','user','GigId','SearchTerm')

    def create(self, validated_data):
        return GigsSearchTerms.objects.create(**validated_data)


# Getting User Info plus Its profile Pic for Gigs
class UserProfileImage(serializers.ModelSerializer):#all fields As we need it in choose gig
    class Meta:
        model = ExpressYourself
        fields = '__all__'
class UserInfoSerializer(serializers.ModelSerializer):
    image = UserProfileImage(many=True)

    class Meta:
        model = User
        fields = ('username','image')
class ViewGigImagesSerializer(serializers.ModelSerializer):
    tracks = serializers.StringRelatedField(many=True)
    user1 = UserInfoSerializer(source='user')
    prize = AddGigPrizeSerializer(many=True)
    class Meta:
        model = Gigs
        fields = ('id', 'user', 'Catagory', 'Title', 'Time', 'Complete', 'Favourite', 'Description','tracks','user1','prize')

# Foriegn Key Approach For getting Data from Oters Tables
class GigImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=GigsImages
        fields='__all__'
class GigRequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model=GigsRequirements
        fields='__all__'
class GigFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model=GigsFAQ
        fields='__all__'
class GigSearchtermsSerializer(serializers.ModelSerializer):
    class Meta:
        model=GigsSearchTerms
        fields='__all__'
class GigPrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model=GigsPrize
        fields='__all__'
class ViewGigImagesReqFaqSearchSerializer(serializers.ModelSerializer):
    tracks = GigImagesSerializer(many=True)
    requirements = GigRequirementsSerializer(many=True)
    faq = GigFAQSerializer(many=True)
    searchterms = GigSearchtermsSerializer(many=True)
    userinfo = UserInfoSerializer(source='user')
    prize = GigPrizeSerializer(many=True)
    class Meta:
        model = Gigs
        fields = ('id', 'user', 'Catagory', 'Title', 'Time', 'Complete', 'Favourite', 'Description','tracks', 'requirements','faq','searchterms','userinfo','prize')

class ViewGigImagesSerializerTest(serializers.ModelSerializer):
    class Meta:
        model=GigsImages
        fields='__all__'

class ViewGigSerializer(serializers.ModelSerializer):
    class Meta:
        model=GigsReviews
        fields='__all__'

class AddGigReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Gigs
        fields='__all__'


