from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Contractor
from .models import Login
from .models import AcedamicQualification
from .models import OtherExperiences,AppliedJobs
from .models import Skills, Gigs, GigsImages,TestQuestions,Bid
from .models import Catagories,PostJob,BookMark,TestResults,GigsReviews
from .models import Countries,InstituteName,JobCatagories,GigsFAQ, GigsRequirements, GigsSearchTerms
from .models import Person,WorkExperience, ExpressYourself,FirstTimeLogin1
from .models import DegreeName,SkillCatagory,SkillName,CompanyName,Designation,Test
class UserNameSerializer(serializers.ModelSerializer):

    class Meta:
        model=Contractor
        fields=('UserName','id')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields='__all__'
class ContractorSerializer(serializers.ModelSerializer):

    class Meta:
        model=Contractor
        fields='__all__'
class LoginSerializer(serializers.ModelSerializer):

    class Meta:
        model=Login
        fields='__all__'
class AcedamicQualificationListSerializer(serializers.ModelSerializer):

    class Meta:
        model=AcedamicQualification
        fields='__all__'


class AcedamicQualificationSerializer(serializers.ModelSerializer):
    # username=serializers.CharField()
    class Meta:
        model=AcedamicQualification
        fields='__all__'

    # def create(self, validated_data):
    #     profile_data = validated_data.pop('UserName')
    #     user = AcedamicQualification.objects.create(**validated_data)
    #     AcedamicQualification.objects.create(user=user, **profile_data)
    #     return user

class ExpressYourselfSerializer(serializers.ModelSerializer):
    username=serializers.CharField()
    class Meta:
        model=ExpressYourself
        fields=('username', 'FullName', 'Description')

# class ExpressYourselfListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ExpressYourself
#         fields = '__all__'

class AddGigSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    UserName = serializers.CharField()
    Description = serializers.CharField(allow_blank=True)
    Catagory = serializers.CharField(allow_blank=True)
    Title = serializers.CharField(allow_blank=True)
    Time = serializers.CharField(allow_blank=True)
    Complete = serializers.BooleanField()
    Favourite = serializers.BooleanField()
    # Image1 = serializers.CharField(allow_blank=True)
    # Image2 = serializers.CharField(allow_blank=True)
    # Image3 = serializers.CharField(allow_blank=True)

    class Meta:
        model = Gigs
        fields = ('id','UserName','Catagory','Title','Time','Complete','Favourite','Description')

    def create(self, validated_data):
        return Gigs.objects.create(**validated_data)


class AddGigImagesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    UserName = serializers.CharField()
    GigId = serializers.CharField()
    Image = serializers.CharField(allow_blank=True)

    class Meta:
        model = GigsImages
        fields = ('id','UserName','GigId','Image')

    def create(self, validated_data):
        return Gigs.objects.create(**validated_data)


class AddGigFAQSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    UserName = serializers.CharField()
    GigId = serializers.CharField()
    Question = serializers.CharField(allow_blank=True)
    Answer = serializers.CharField(allow_blank=True)
    class Meta:
        model = GigsFAQ
        fields = ('id','UserName','GigId','Question','Answer')

    def create(self, validated_data):
        return GigsFAQ.objects.create(**validated_data)


class AddGigRequirementsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    UserName = serializers.CharField()
    GigId = serializers.CharField()
    Requirement = serializers.CharField(allow_blank=True)
    IsMandatory = serializers.BooleanField()
    class Meta:
        model = GigsRequirements
        fields = ('id','UserName','GigId','Requirement','IsMandatory')

    def create(self, validated_data):
        return GigsRequirements.objects.create(**validated_data)


class AddGigSearcTermSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    UserName = serializers.CharField()
    GigId = serializers.CharField()
    SearchTerm = serializers.CharField(allow_blank=True)
    class Meta:
        model = GigsSearchTerms
        fields = ('id','UserName','GigId','SearchTerm')

    def create(self, validated_data):
        return GigsSearchTerms.objects.create(**validated_data)


class ViewGigImagesSerializer(serializers.ModelSerializer):
    tracks = serializers.StringRelatedField(many=True)

    class Meta:
        model = Gigs
        fields = ('id', 'UserName', 'Catagory', 'Title', 'Time', 'Complete', 'Favourite', 'Description','tracks')

class ViewGigImagesReqFaqSearchSerializer(serializers.ModelSerializer):
    tracks = serializers.StringRelatedField(many=True)
    requirements = serializers.StringRelatedField(many=True)
    faq = serializers.StringRelatedField(many=True)
    searchterms = serializers.StringRelatedField(many=True)

    class Meta:
        model = Gigs
        fields = ('id', 'UserName', 'Catagory', 'Title', 'Time', 'Complete', 'Favourite', 'Description','tracks', 'requirements','faq','searchterms')

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

class ExpressYourselfListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    UserName = serializers.CharField()
    FullName = serializers.CharField()
    Description = serializers.CharField()
    Resume = serializers.CharField()

    class Meta:
        model = ExpressYourself
        fields = ('id','UserName','FullName','Description','Resume')

    def create(self, validated_data):
        return ExpressYourself.objects.create(**validated_data)


class WorkExperienceSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(label='ID', read_only=True)
    # UserName = serializers.CharField()
    # CompanyName = serializers.CharField()
    # Designation = serializers.CharField()
    # StartYear = serializers.CharField()
    # EndYear = serializers.CharField()
    # Description = serializers.CharField()
    # Deleted = serializers.CharField()
    class Meta:
        model=WorkExperience
        fields='__all__'#('id','UserName', 'CompanyName', 'Designation', 'StartYear', 'EndYear','Description','Deleted')

class FirstTimeLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model=FirstTimeLogin1
        fields='__all__'

class CheckBookMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model=BookMark
        fields=('Id',)

class OtherExperiencesSerializer(serializers.ModelSerializer):

    class Meta:
        model=OtherExperiences
        fields='__all__'

class PostJobSerializerList(serializers.ModelSerializer):#LoginAuthSerializerList

    class Meta:
        model=PostJob
        fields='__all__'


class BookMarkSerializer(serializers.ModelSerializer):#LoginAuthSerializerList

    class Meta:
        model=BookMark
        fields='__all__'


class LoginAuthSerializerList(serializers.ModelSerializer):
    #UserType=serializers.CharField()
    class Meta:
        model=Contractor
        fields=('UserType','UserName')


class PostJobSerializer(serializers.ModelSerializer):
    # username = serializers.CharField()

    class Meta:
        model = PostJob
        fields = '__all__'#('username', 'jobcatagory', 'jobname', 'description','files','skillsneeded','expriencelevel','completiontime','status','jobtype','posttype')


class SkillsSerializer(serializers.ModelSerializer):
    # username = serializers.CharField()

    class Meta:
        model = Skills
        fields = '__all__'#('username', 'SkillCatagory', 'SkillName', 'SkillLevel')


class CountriesSerializer(serializers.ModelSerializer):

    class Meta:
        model=Countries
        fields='__all__'
class CatagoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model=Catagories
        fields='__all__'


# class InstituteNameSerializer(serializers.ModelSerializer):
#     def __init__(self, *args, **kwargs):
#         many = kwargs.pop('many', True)
#         super(InstituteNameSerializer, self).__init__(many=many, *args, **kwargs)
#
#     class Meta:
#         model = InstituteName
#         fields = '__all__'

class InstituteNameSerializer(serializers.ModelSerializer):
    class Meta:
        model=InstituteName
        fields=('name',)
class InstituteNameSerializer1(serializers.ModelSerializer):
    class Meta:
        model=InstituteName
        fields= '__all__'


class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = '__all__'


class DegreeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DegreeName
        fields = '__all__'


class SkillCatagorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCatagory
        fields = '__all__'


class SkillNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillName
        fields = '__all__'


class CompanyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyName
        fields = '__all__'


class JobCatagoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCatagories
        fields = '__all__'

class PersonSerializer(serializers.ModelSerializer):

    class Meta:
        model=Person
        fields='__all__'

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
class AddGetBidSerializer(serializers.ModelSerializer):# For Adding Bids
    id = serializers.IntegerField(label='ID', read_only=True)
    BidOwner = serializers.CharField()
    JobId = serializers.CharField()
    Bidder = serializers.CharField()
    BidPrize = serializers.CharField()
    Days = serializers.CharField()
    Title = serializers.CharField()
    Status = serializers.IntegerField()
    ExpertGuarantee = serializers.BooleanField()
    SponsorMyBid = serializers.BooleanField()
    HighlightMyBid = serializers.BooleanField()
    class Meta:
        model=Bid
        fields=('id','BidOwner','JobId','Bidder','BidPrize','Days','Title','Status','ExpertGuarantee','SponsorMyBid','HighlightMyBid','CreatedAt')
class BidsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bid
        fields=('id','BidOwner','JobId','Bidder','BidPrize','Days','Title','Status','ExpertGuarantee','SponsorMyBid','HighlightMyBid','CreatedAt')
class GetBidsByJobIdSerializer(serializers.ModelSerializer):#under servalance
    bids = BidsSerializer(many=True, read_only=True)
    class Meta:
        model=PostJob
        fields = ('UserName', 'jobcatagory', 'jobname', 'description','files','skillsneeded','expriencelevel','completiontime','status','jobtype','posttype',
                  'taken','budget','negotiatable','BidDays','createdat','bids')
class AddAppliedJobsSerializer(serializers.ModelSerializer):#under servalance
    id = serializers.IntegerField(label='ID', read_only=True)
    JobApplier = serializers.CharField()
    AppliedJobId = serializers.CharField()
    class Meta:
        model=AppliedJobs
        fields = ('id','JobApplier', 'AppliedJobId')
class GetBiddedJobsSerializerList(serializers.ModelSerializer):
    JobDetail = PostJobSerializerList(source='JobId')
    class Meta:
        model=Bid
        fields = ('BidOwner','JobId','Bidder','BidPrize','Days','Title','Status','ExpertGuarantee','SponsorMyBid','HighlightMyBid','CreatedAt','JobDetail')


