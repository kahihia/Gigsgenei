from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Contractor,AcedamicQualification,ExpressYourself,OtherExperiences,Skills,WorkExperience

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields='__all__'
class ContractorSerializer(serializers.ModelSerializer):

    class Meta:
        model=Contractor
        fields='__all__'
class AcedamicQualificationSerializer(serializers.ModelSerializer):

    class Meta:
        model=AcedamicQualification
        fields='__all__'
class ExpressYourselfSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    user = serializers.CharField()
    FullName = serializers.CharField()
    Description = serializers.CharField()
    Resume = serializers.CharField()
    Deleted = serializers.BooleanField()

    class Meta:
        model = ExpressYourself
        fields = ('id','user','FullName','Description','Resume','Deleted')

    def create(self, validated_data):
        return ExpressYourself.objects.create(**validated_data)

class SkillsSerializer(serializers.ModelSerializer):

    class Meta:
        model=Skills
        fields='__all__'
class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model=WorkExperience
        fields='__all__'

class OtherExperiencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherExperiences
        fields = '__all__'


                # def create(self, validated_data):
        #     profile_data = validated_data.pop('UserName')
        #     user = AcedamicQualification.objects.create(**validated_data)
        #     AcedamicQualification.objects.create(user=user, **profile_data)
        #     return user
