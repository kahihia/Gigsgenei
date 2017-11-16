import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { WebsocketService } from './../../_services/web-socket/websocket.service'
import {isNullOrUndefined} from "util";
import {Globalvariables} from './../../_services/class-track-helper/globalvariables';
import {Chatusers} from "../../_services/ControllerClasses/Loading/chatusers";
import {ManageOrderService} from "../../_services/ManageOrder/manage-order-service";
import {Offergig} from "../../_services/ControllerClasses/Loading/offergig";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-websocketmessaging',
  templateUrl: './websocketmessaging.component.html',
  styleUrls: ['./websocketmessaging.component.css']
})
export class WebsocketmessagingComponent implements OnInit {

  // For displaying from database
  DatabaseMessages:any = [];
  // currentUserId = '0';
  otherUserId = '0';

  public messages1:any=[];
  time:any=[];
  date:any=[];
  intervalId;
  username = sessionStorage.getItem('username');
  // lastType=new Date().getTime();
  GlobalImageAdress= new Globalvariables();
  twitersrc='https://abs.twimg.com/emoji/v1/72x72/';
  index=0;
  emoji: any =[];
  private model: any = {message: ''};
  OtherChatUser :any = [];
  // currentOtherUser='';
  private socketSubscription: Subscription
  // Manage Orders
  gigsList:any = [];
  OrderDiv=false;
  GigId='';
  RecieverId='';
  constructor(private socket: WebsocketService, private objManageOrderService:ManageOrderService,private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy() {
    try {
      this.socketSubscription.unsubscribe();
    }
    catch (exception) {

    }
  }
  LoadGigsForOffer() {
    this.objManageOrderService.fetchViewGigsWithImageTitle().subscribe(gigs=>{
        console.log(gigs);
        for(let i=0;i<gigs.length;i++) {
          let obj = new Offergig();
          obj.gigid = gigs[i].id;
          obj.Title =gigs[i].Title;
          obj.user =gigs[i].user;
          if(gigs[i].tracks.length>0) {
            obj.Image = gigs[i].tracks[0].Image;
          }
          this.gigsList.push(obj);
        }
      },
      error=>{

      });
  }
  AddConnection(OtherUserId) {
    console.log(OtherUserId+'........'+sessionStorage.getItem('userid'));
    // this.currentUserId = sessionStorage.getItem('userid');
    this.otherUserId = OtherUserId;
    this.socket.AddGetRoom(OtherUserId,sessionStorage.getItem('userid')).subscribe(room=> {
      this.socket.fetchMessages(room.id).subscribe(msg=>{
        this.DatabaseMessages = msg;
        for (let msg of this.DatabaseMessages) {
          msg.MessageText = msg.MessageText.slice(1, msg.MessageText.length-1);
          msg.MessageText = this.addingEmoji(msg.MessageText);
        }
        console.log('Database messages.........');
        console.log(this.DatabaseMessages);
        this.LoadGigsForOffer();
      });
      // if (this.currentOtherUser !== OtherUserId) {
      //   try
      //   {
      //     this.socketSubscription.unsubscribe();
      //   }
      //   catch (exception){
      //     console.log('exception : ' +exception);
      //   }
        this.messages1.splice(1,this.messages1.length);
        // this.currentOtherUser = OtherUserId;
        const stream = this.socket.connect(sessionStorage.getItem('username'), room.RoomNo);
        this.username = sessionStorage.getItem('username');
        this.socketSubscription = stream.subscribe(message => {
          // console.log(message);
          if (message.text === '"typing"') {
            this.clearTimeout();
            document.getElementById('typing').innerHTML = message.username + ' is Typing ...';
            this.intervalId = setTimeout(function () {
              document.getElementById('typing').innerHTML = '';
              console.log('timeout function');
            }, 2000);
            let objDiv = document.getElementById("msgwrap");
            objDiv.scrollTop = objDiv.scrollHeight;
          }
          else {
            this.DateTime();
            console.log('before : ' + message.text);
            let msg = this.addingEmoji(message.text);
            msg = msg.slice(1, msg.length - 1);
            message.text = msg;
            console.log('after' + message.text);
            this.messages1.push(message);
            document.getElementById('typing').innerHTML = '';
            this.clearTimeout();
            let objDiv = document.getElementById("msgwrap");
            objDiv.scrollTop = objDiv.scrollHeight;
            this.intervalId = setTimeout(function () {
              let objDiv = document.getElementById("msgwrap");
              objDiv.scrollTop = objDiv.scrollHeight;
            }, 100);
        }
      });
      // this.socket.send(sessionStorage.getItem('username') + '  is now online');
    // }
    });
  }
  ngOnInit() {

    this.activatedRoute.queryParams
      .filter(params => params.username)
      .subscribe(params => {

        this.socket.fetchUsersForChat(params.username).subscribe(users=> {
          console.log(users);
          // Adding Chat Users
          for (let user of users) {
            let obj = new Chatusers();
            obj.username = user.username;
            obj.id = user.id;
            if (user.image.length > 0) {
              while (user.image[0].Resume.charAt(0) === '/') {
                user.image[0].Resume = user.image[0].Resume.substr(1);
              }
              obj.UserImage = this.GlobalImageAdress.ApiUrlLocal + user.image[0].Resume;
            }
            this.OtherChatUser=obj;
            console.log('list.................');
            console.log(this.OtherChatUser);
          }
          this.AddConnection(this.OtherChatUser.id);
        },
          error=>{

          });

      });

    this.twitersrc=this.GlobalImageAdress.Url;
    for (let i=600;i<640;i++) {
      this.emoji.push('1f'+i+'.png');
    }
  }
  DateTime() {
    let currentdate = new Date();
    this.date.push(currentdate.getDay() + "/"+currentdate.getMonth()
      + "/" + currentdate.getFullYear());
    this.time.push(currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":" + currentdate.getSeconds());

  }
  scrollDown() {
    let objDiv = document.getElementById("msgwrap");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  SendMessage(event:any, id) {
    if(event.keyCode===13) {
      id.value = id.value.replace(/^[\n]+\s*/, '');// Removing trailing |N
      if(id.value !== '') {
        id.value = id.value.replace(/\n/g,"<br/>");
        this.clearTimeout();
        console.log('Not null id.value :' + id.value);
        this.socket.send(id.value);
        id.value = '';
        id.focus();
      }
      else {
        console.log('null : '+ id.value);
      }
    }
  }
  clearTimeout() {
    while (this.intervalId>0) {
      // console.log('Claer id : ' + this.intervalId);
      window.clearTimeout(this.intervalId); // will do nothing if no timeout with id is present
      this.intervalId-=1;
    }
  }
  TypingFunc(val) {
    // console.log(val);
    this.clearTimeout();
    this.socket.send('typing');
  }
  emojiclick(ind, id) {
    let tmp = id.value + ' :' + this.emoji[ind]+' ';
    id.focus();
    // console.log(tmp);
    id.value=tmp;
  } //  :1f603.png
  addingEmoji(msg) {
    for (let i=0;i<msg.length;i++) {
      if(msg[i] === ':' && msg[i+1] === '1'&& msg[i+2] === 'f' && msg[i+6] === '.' && msg[i+7] === 'p' && msg[i+8] === 'n' && msg[i+9] === 'g') {
        // console.log('<img style="height: 20px;width: 20px;" class="emoji" src="'+this.GlobalImageAdress.emojiSrc+
        //   msg[i+1]+msg[i+2]+msg[i+3]+msg[i+4]+msg[i+5]+msg[i+6]+msg[i+7]+msg[i+8]+msg[i+9]+'"/>');

        msg = msg.slice(0,i) + '<img style="height: 20px;width: 20px;" class="emoji" src="'+this.GlobalImageAdress.emojiSrc+
          msg[i+1]+msg[i+2]+msg[i+3]+msg[i+4]+msg[i+5]+msg[i+6]+msg[i+7]+msg[i+8]+msg[i+9]+'"/>'+ msg.slice(i+10,msg.length);
        i+=97;
        console.log('Message : '+msg);
      }
    }
    return msg;
  }
  splwice1(result, idx, rem, str) {
    return result.slice(0, idx) + str + result.slice(idx + Math.abs(rem));
  }
  GigSelected(ind) {
    console.log(this.gigsList[ind]);

    this.OrderDiv = true;
  }
  SubmitOrder(Description,Prize,Days) {
    console.log('Order : ' + Description+Prize+Days);
    this.objManageOrderService.AddGigOrder(this.GigId,this.RecieverId,Description,Prize,Days);
  }
  Back() {
    this.OrderDiv = false;
  }
  //  Manage Order
}



















// AddConnection(OtherUserId,ind) {
//   console.log(OtherUserId+'........'+sessionStorage.getItem('userid'));
//   this.currentUserId = sessionStorage.getItem('userid');
//   this.otherUserId = OtherUserId;
//   this.socket.AddGetRoom(OtherUserId,sessionStorage.getItem('userid')).subscribe(room=> {
//     this.socket.fetchMessages(room.id).subscribe(msg=>{
//       this.DatabaseMessages = msg;
//       for (let msg of this.DatabaseMessages) {
//         msg.MessageText = this.addingEmoji(msg.MessageText);
//       }
//     });
//     if (this.currentOtherUser !== OtherUserId) {
//       try
//       {
//         this.socketSubscription.unsubscribe();
//       }
//       catch (exception){
//         console.log('exception : ' +exception);
//       }
//       this.messages1.splice(1,this.messages1.length);
//       this.OtherUserProfileIndex = ind;// For showing profile picture of user
//       this.currentOtherUser = OtherUserId;
//       const stream = this.socket.connect(sessionStorage.getItem('username'), room.RoomNo);
//       this.username = sessionStorage.getItem('username');
//       this.socketSubscription = stream.subscribe(message => {
//         // console.log(message);
//         if (message.text === '"typing"') {
//           this.clearTimeout();
//           document.getElementById('typing').innerHTML = message.username + ' is Typing ...';
//           this.intervalId = setTimeout(function () {
//             document.getElementById('typing').innerHTML = '';
//             console.log('timeout function');
//           }, 2000);
//           let objDiv = document.getElementById("msgwrap");
//           objDiv.scrollTop = objDiv.scrollHeight;
//         }
//         else {
//           this.DateTime();
//           console.log('before : ' + message.text);
//           let msg = this.addingEmoji(message.text);
//           msg = msg.slice(1, msg.length - 1);
//           message.text = msg;
//           console.log('after' + message.text);
//           this.messages1.push(message);
//           document.getElementById('typing').innerHTML = '';
//           this.clearTimeout();
//           let objDiv = document.getElementById("msgwrap");
//           objDiv.scrollTop = objDiv.scrollHeight;
//           this.intervalId = setTimeout(function () {
//             let objDiv = document.getElementById("msgwrap");
//             objDiv.scrollTop = objDiv.scrollHeight;
//           }, 100);
//         }
//       });
//       // this.socket.send(sessionStorage.getItem('username') + '  is now online');
//     }
//   });
// }
