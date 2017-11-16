
from rest_framework import serializers
from Test.models import Test, TestQuestions
from .models import AddDescription


class AddTestSerializer(serializers.ModelSerializer):

    class Meta:
        model=Test
        fields='__all__'



class EditTestSerializer(serializers.ModelSerializer):

    class Meta:
        model=Test
        fields='__all__'


class AddTestQuestionsSerializer(serializers.ModelSerializer):
    Catagory = serializers.CharField()
    Question = serializers.CharField()
    A=serializers.CharField()
    B = serializers.CharField()
    C = serializers.CharField()
    D = serializers.CharField()
    Answer = serializers.IntegerField()

    class Meta:
        model = TestQuestions
        fields = ( 'Catagory','Question', 'A', 'B', 'C', 'D', 'Answer')

    # def create(self, validated_data):
    #     return TestQuestions.objects.create(**validated_data)



#Add Description Serializer
class AddDescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model=AddDescription
        fields='__all__'