from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Bid,BookMark,PostJob,JobCatagories,JobSubCatagories,SkillsNeeded
from Profile.models import ExpressYourself

class SkillsNeededSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillsNeeded
        fields = ('SkillName',)#('username', 'jobcatagory', 'jobname', 'description','files','skillsneeded','expriencelevel','completiontime','status','jobtype','posttype')
class PostJobSerializer(serializers.ModelSerializer):
    skillsneeded = SkillsNeededSerializer(many=True)
    class Meta:
        model = PostJob
        fields = ('user', 'id','JobCatagory', 'JobSubCatagory', 'JobName','Description','SkillsNeeded','ExprienceLevel','CompletionTime','Status','JobType','PostType',
                  'Taken','Budget','Negotiatable','BidDays','Deleted','CreatedAt','skillsneeded')

    def create(self, validated_data):
        skills_data = validated_data.pop('skillsneeded')
        JobId = PostJob.objects.create(**validated_data)
        for track_data in skills_data:
            print track_data
            print '..............'
            SkillsNeeded.objects.create(JobId=JobId, **track_data)
        return JobId


class JobSubCatagoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSubCatagories
        fields = ('SubCatagory',)
class JobCatagoriesSerializer(serializers.ModelSerializer):
    subcatagories = JobSubCatagoriesSerializer(many=True)
    class Meta:
        model = JobCatagories
        fields = ('Catagory','subcatagories')
class BookMarkSerializer(serializers.ModelSerializer):#LoginAuthSerializerList

    class Meta:
        model=BookMark
        fields='__all__'
class CheckBookMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model=BookMark
        fields=('Id',)

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


class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model=ExpressYourself
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    image = ProfilePicSerializer(many=True)
    class Meta:
        model=User
        fields=('username','id','image')


class BidsSerializer(serializers.ModelSerializer):
    BidOwner = UserSerializer()
    Bidder = UserSerializer()
    class Meta:
        model=Bid
        fields=('id','BidOwner','JobId','Bidder','BidPrize','Days','Title','Status','ExpertGuarantee','SponsorMyBid','HighlightMyBid','CreatedAt','BidOwner','Bidder')

class GetBidsByJobIdSerializer(serializers.ModelSerializer):#under servalance
    # user=UserSerializer()
    bids = BidsSerializer(many=True, read_only=True)
    skillsneeded = SkillsNeededSerializer(many=True)
    class Meta:
        model=PostJob
        fields = ('user', 'id','JobCatagory', 'JobSubCatagory', 'JobName','Description','SkillsNeeded','ExprienceLevel','CompletionTime','Status','JobType','PostType',
                  'Taken','Budget','Negotiatable','BidDays','Deleted','CreatedAt','skillsneeded','bids')



class JobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=PostJob
        fields = ('JobName',)
class GetBiddedJobsSerializerList(serializers.ModelSerializer):
    JobDetail = JobDetailSerializer(source='JobId')
    class Meta:
        model=Bid
        fields = ('BidOwner','JobId','Bidder','JobDetail')#'BidPrize','Days','Title','Status','ExpertGuarantee','SponsorMyBid','HighlightMyBid','CreatedAt','JobDetail')

class BookMarkSerializer(serializers.ModelSerializer):  # LoginAuthSerializerList

    class Meta:
        model = BookMark
        fields = '__all__'

class BookMarkSerializerGet(serializers.ModelSerializer):
    JobDetail = PostJobSerializer(source='Id')
    class Meta:
        model = BookMark
        fields = ('CreatedAt','JobDetail')

# class AppliedJobsSerializer(serializers.ModelSerializer):#under servalance
#     id = serializers.IntegerField(label='ID', read_only=True)
#     JobApplier = serializers.CharField()
#     AppliedJobId = serializers.CharField()
#     class Meta:
#         model=AppliedJobs
#         fields = ('id','JobApplier', 'AppliedJobId')
#
#Android
class PostJobSerializerAndroid(serializers.ModelSerializer):
    class Meta:
        model = PostJob
        fields = '__all__'
class PostJobSkillsNeededAndroidSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillsNeeded
        fields = '__all__'