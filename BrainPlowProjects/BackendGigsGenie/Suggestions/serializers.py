from django.contrib.auth.models import User
from rest_framework import serializers
from .models import InstituteName,Designation,CompanyName,DegreeName,SkillName

class SkillNameSerializer(serializers.ModelSerializer):
    # username = serializers.CharField()

    class Meta:
        model = SkillName
        fields = '__all__'
class InstituteNameSerializer(serializers.ModelSerializer):
    class Meta:
        model=InstituteName
        fields=('name',)
class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = '__all__'
class DegreeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DegreeName
        fields = '__all__'
class CompanyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyName
        fields = '__all__'

