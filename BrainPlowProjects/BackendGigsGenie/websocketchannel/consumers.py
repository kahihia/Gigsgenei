# In consumers.py
import json

from channels import Group,Channel
from channels.sessions import channel_session
# from django.contrib.sessions.backends.db import SessionStore
from urlparse import parse_qs
from django.utils import timezone

from django.contrib.auth.models import User

from .models import Message,Room

def my_background_task(message):
    userid = message.content['username']#it is Also useer Id
    room = message.content['room']
    jobname = message.content['jobname']
    jobid = message.content['jobid']
    createdat = message.content['createdat']
    print 'Sending'
    Group("chat-%s" % room).send({
        "text": json.dumps({
            "jobname": jobname,
            "jobid": jobid,
            "username": userid,
            "createdat": createdat,
        }),
    })
def msg_consumer(message):
    # Save to model
    try:
        username = message.content['username']
        room = message.content['room']
        message = message.content['message']
        Group("chat-%s" % room).send({
            "text": json.dumps({
                "text": message,
                "username": username,  # message.channel_session["username"],
            }),
        })
        if (message!='"typing"'):
            Message.objects.create(
                Room=Room.objects.get(RoomNo=room),
                Sender=User.objects.get(username=username),
                MessageText=message,
                Seen = False,
                Deleted = False,
                CreatedAt = timezone.now(),
            )
        print ';;;;;;;;;;;;;;;;;;;;;;;'
        print timezone.now()
    except:
        print 'except'
    # Broadcast to listening sockets
# Connected to websocket.connect

# Connected to websocket.connect
# @channel_session
def ws_connect(message, room_name,user_name):
    print 'connect done?'
    print   message
    print room_name
    message.reply_channel.send({"accept": True})
    params = parse_qs(message.content["query_string"])
    print params
    if b"username" in params:
        Group("chat-%s" % room_name).add(message.reply_channel)
    else:
        message.reply_channel.send({"close": True})


# Connected to websocket.receive
# @channel_session
def ws_message(message, room_name,user_name):
    Channel("chat-messages").send({
        "room": room_name,
        "message": message['text'],
        "username": user_name,
    })


# Connected to websocket.disconnect
# @channel_session
def ws_disconnect(message, room_name):
    Group("chat-%s" % room_name).discard(message.reply_channel)
