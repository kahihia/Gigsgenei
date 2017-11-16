from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Test,TestResults,TestQuestions
class TestQuestionsSerializer(serializers.ModelSerializer):

    class Meta:
        model=TestQuestions
        fields='__all__'

class TestCatagorySerializer(serializers.ModelSerializer):

    class Meta:
        model=Test
        fields=('Catagory',)
class TestResultSerializer(serializers.ModelSerializer):

    class Meta:
        model=TestResults
        fields='__all__'
