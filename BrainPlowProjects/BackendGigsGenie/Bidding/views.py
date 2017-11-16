from channels import Channel
from django.shortcuts import render
from  django.core.files.base import ContentFile
from django.core import serializers
import base64
from django.contrib.auth.models import User;
from itertools import chain
from django.views.decorators.csrf import csrf_exempt
from itertools import chain
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import TemplateHTMLRenderer
from  rest_framework.views import APIView
from django.db import transaction,IntegrityError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django.db.models import Q
import collections
from django.utils import timezone

from .models import PostJob,BookMark,Bid,JobCatagories
from .serializers import PostJobSerializer,JobCatagoriesSerializer,BookMarkSerializer,\
    CheckBookMarkSerializer,AddGetBidSerializer,BidsSerializer,GetBidsByJobIdSerializer,GetBiddedJobsSerializerList,BookMarkSerializer,\
    BookMarkSerializerGet,PostJobSkillsNeededAndroidSerializer,PostJobSerializerAndroid

# User BookMarked Jobs List
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def CheckBookMark(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        bookmark = BookMark.objects.filter(user=request.user.id)
        serializer = CheckBookMarkSerializer(bookmark, many=True)
        return Response(serializer.data)
    # elif request.method == 'DELETE':
    #     bookmark = BookMark.objects.get(user=request.user.id)
    #     bookmark.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

# User Delete BookMarked Job
@api_view(['DELETE', ])
@permission_classes((IsAuthenticated,))
def deleteBookMark(request, id):
    """
    List all snippets, or create a new snippet.
    """
    try:
        bookmark = BookMark.objects.get(user=request.user.id, Id=id)
    except bookmark.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET'])
# @permission_classes((permissions.AllowAny,))
# def PostJobStartEndList(request, type, start,username):
#     """
#     List all snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         end = int(start) + 10
#         postjob= PostJob.objects.filter(~Q(UserName=username),Q(jobtype=type)).order_by('id')[start:end]  # objects.filter(UserName=username)
#         # postjob = tmp.exclude(Username=username)
#         serializer = PostJobSerializer(postjob, many=True)
#         return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def BookMarkList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        bookmark = BookMark.objects.all()
        serializer = BookMarkSerializer(bookmark, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        request.data['user'] = request.user.id
        serializer = BookMarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Book Mark JOb getting
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def BookMarkStartEndList(request,start, end):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        bookmark = BookMark.objects.filter(user=request.user.id).order_by('id')[start:end]
        serializer = BookMarkSerializerGet(bookmark, many=True)
        return Response(serializer.data)

# User Personal Information
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def JobCatagoriesList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        jobcatagories = JobCatagories.objects.all()
        serializer = JobCatagoriesSerializer(jobcatagories, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = JobCatagoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Post a Job
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def PostJobList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        postjob = PostJob.objects.all()
        serializer = PostJobSerializer(postjob, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        print ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;'
        request.data.dict()['CreatedAt']=timezone.now()
        request.data.dict()['user'] =request.user.id
        print request.data.dict()
        request.data.dict()['skillsneeded'] = [i.encode('ascii') for i in request.data.dict()['skillsneeded']]
        for x in request.data.dict()['skillsneeded']:
            print 'xxxxxxxxxxxxxxxxxxxxxxxx'
            print x
        serializer = PostJobSerializer(data=request.data.dict())
        # print ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;'
        # print request.data['user']
        # request.data['CreatedAt']=timezone.now()
        # request.data['user'] =request.user.id
        # print request.data
        # serializer = PostJobSerializer(data=request.data)
        if serializer.is_valid():
            # obj = PostJob(UserName=Contractor.objects.get(UserName=serializer.validated_data['username']),
            #     jobcatagory=serializer.validated_data['jobcatagory'],
            #     jobname=serializer.validated_data['jobname'],
            #     description=serializer.validated_data['description'],
            #     files= serializer.validated_data['files'],
            #     skillsneeded = serializer.validated_data['skillsneeded'],
            #     expriencelevel = serializer.validated_data['expriencelevel'],
            #     completiontime = serializer.validated_data['completiontime'],
            #     status = serializer.validated_data['status'],
            #     jobtype = serializer.validated_data['jobtype'],
            #     posttype=serializer.validated_data['posttype'])
            serializer.save()
            try:
                print '........try.............'
                room_name = request.user.id
                jobname = serializer.validated_data['JobName']
                jobid = 'None'
                import datetime
                createdat = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                Channel("my-background-task").send({
                    "room": room_name,
                    "jobname": jobname,
                    "jobid": jobid,
                    "username": room_name,
                    "createdat": createdat,
                })
            except:
                print '...................except.................'
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def LoadPostJobList(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'POST':#id=request.data['id'],
        end = int(request.data['start']) + 10
        postjob = PostJob.objects.filter(user=request.user.id).order_by('id')[0:end]
        serializer = PostJobSerializer(postjob, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def GetJobById(request, pk):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        postjob = PostJob.objects.filter(pk=pk)
        serializer = PostJobSerializer(postjob, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def PostJobStartEndList(request, type, start,username):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        end = int(start) + 10
        postjob= PostJob.objects.filter(~Q(user=request.user.id),Q(JobType=type)).order_by('id')[start:end]  # objects.filter(UserName=username)
        # postjob = tmp.exclude(Username=username)
        serializer = PostJobSerializer(postjob, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def GetBiddedJob(request):# Jobs User has Bidded So far
    if request.method == 'POST':
        print request.data['start']
        end = int(request.data['start']) + 10
        appliedjob = Bid.objects.filter( Bidder=request.user.id).order_by('id')[0:end]
        serializer = GetBiddedJobsSerializerList(appliedjob, many=True)
        return Response(serializer.data)
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated,))
def AddGetBid(request):
    if request.method == 'GET':
        bids = Bid.objects.all()
        serializer = AddGetBidSerializer(bids, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AddGetBidSerializer(data=request.data)
        if serializer.is_valid():
            BidOwner = User.objects.get(pk=serializer.validated_data['BidOwner'])
            print BidOwner
            JobId = PostJob.objects.get(id=serializer.validated_data['JobId'])
            print JobId
            Bidder = User.objects.get(pk=request.user.id)
            BidPrize = serializer.validated_data['BidPrize']
            Days = serializer.validated_data['Days']
            Title = serializer.validated_data['Title']
            Status = serializer.validated_data['Status']
            ExpertGuarantee = serializer.validated_data['ExpertGuarantee']
            SponsorMyBid = serializer.validated_data['SponsorMyBid']
            HighlightMyBid = serializer.validated_data['HighlightMyBid']
            bidobj = Bid(BidOwner=BidOwner, JobId=JobId, Bidder=Bidder, BidPrize=BidPrize,
                          Days=Days, Title=Title, Status=Status,ExpertGuarantee=ExpertGuarantee,
                         SponsorMyBid=SponsorMyBid,HighlightMyBid=HighlightMyBid)

            bidobj.save()
            return Response(bidobj.id, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@permission_classes((IsAuthenticated,))#Getting Bidding Info For Seller Dashboard
def GetBidsByJobId(request, jobid):
    if request.method == 'GET':
        bid = PostJob.objects.filter(id=jobid)
        serializer = GetBidsByJobIdSerializer(bid, many=True)
        return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes((IsAuthenticated,))#Getting Applied Jobs of user
# def AppliedJobs(request):
#     if request.method == 'GET':
#         bid = PostJob.objects.filter(user=request.user.id)
#         serializer = AppliedJobsSerializer(bid, many=True)
#         return Response(serializer.data)
#
#
#Android API's
def flatten(d, parent_key='', sep='.'):
    items = []
    for k, v in d.items():
        new_key = parent_key + sep + k if parent_key else k
        if isinstance(v, collections.MutableMapping):
            items.extend(flatten(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)


def unflatten(dictionary):
    resultDict = dict()
    for key, value in dictionary.iteritems():
        parts = key.split(".")
        d = resultDict
        for part in parts[:-1]:
            if part not in d:
                d[part] = dict()
            d = d[part]
        d[parts[-1]] = value
    return resultDict
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def LoadPostJobListFlatten(request,start):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        l=[]
        end = int(start) + 10
        postjob = PostJob.objects.filter(user=request.user.id).order_by('id')[0:end]
        serializer = PostJobSerializer(postjob, many=True)
        for s in serializer.data:
            o = flatten(s)
            l.append(o)
            print l
        return Response(l)

# Android Api's
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def PostJobListAndroid(request):
    if request.method == 'GET':
        postjob = PostJob.objects.all()
        serializer = PostJobSerializer(postjob, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        request.data.dict()['CreatedAt']=timezone.now()
        request.data.dict()['user'] =request.user.id
        # print request.data.dict()
        serializer = PostJobSerializerAndroid(data=request.data.dict())
        if serializer.is_valid():
            serializer.save()
            try:
                print '........try.............'
                room_name = request.user.id
                jobname = serializer.validated_data['JobName']
                jobid = 'None'
                import datetime
                createdat = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                Channel("my-background-task").send({
                    "room": room_name,
                    "jobname": jobname,
                    "jobid": jobid,
                    "username": room_name,
                    "createdat": createdat,
                })
            except:
                print '...................except.................'
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Android Api's
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def PostJobSkillsNeededAndroid(request):
    if request.method == 'POST':
        serializer = PostJobSkillsNeededAndroidSerializer(data=request.data.dict())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


