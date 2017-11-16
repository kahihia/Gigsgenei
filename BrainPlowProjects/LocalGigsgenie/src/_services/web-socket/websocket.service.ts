import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject'
import { Observable } from 'rxjs/Observable'
import { WebSocketService } from 'angular2-websocket-service'
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from './../http-service';
import {Globalvariables} from './../../_services/class-track-helper/globalvariables';

@Injectable()
export class WebsocketService {
  private inputStream: QueueingSubject<any>
  public outputStream: Observable<any>
  objGlobalvariables= new Globalvariables();
  constructor(private http: HttpService, private httpnoloader: Http,private socketFactory: WebSocketService) {}
  public javascriptSocket(message,username) {
    let socket = new WebSocket("ws://127.0.0.1:8000/chat1?username="+username);
    socket.onmessage = function(e) {
      console.log(e.data);
      // this.messages.push(e.data);
      // localStorage.setItem('message',JSON.stringify(this.messages));
    }
    socket.onopen = function() {
      socket.send(message);
      socket.close();
    }

// Call onopen directly if socket is already open
    if (socket.readyState == WebSocket.OPEN) socket.onopen(event);
  }
  public connect(username,roomno) {
    // if (this.outputStream) {
    //   console.log('already connected...........');
    //   return this.outputStream;
    // }
    console.log('Connecting Now.................');

    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    return this.outputStream = this.socketFactory.connect(
      //'wss://wms.zoho.com/pconnect?prd=VO&i=NENVk86NDU1NDMyNjg1MzgzOTM1Nzc4NDo2NTEyMDE4Njg6MjA3OjY1MTA0MTIzNg%253D%253D&xa=pm%252Fkq%252FfvUwrhfpcKnRCMrJyuYpojqBGIWyayVaX8hJrEHVC%252FVdBnQA71Hbqc67OeY4sRSA9zZbsV%250AhoKtqmK%252FS47f9hHxmhY9un3zN9DLSufgf7s1PCf%252B7cDjEM%252FjS493wA2F1TjtMkQbuwgFHu8Slljp%250ALNcPa04RZ1I26PKDvBi%252B7OzsipQ%252FkshqdFDmJeRZmtaKxmlKCBE6U83U2bEa4RcFavPiUyOTOHZR%250ApQA7vM5Xd97bBEg5%252FuxelRt1UVt9OnMefb8NUlOS6TbvhCJylpVbhkUoSQadVCgoUKgodo1B4JFb%250A8SDhRhOiOwi9qZ4Tfdv6nIrMI4spzacoh%252Bth4uhh6PGHeLgwJJvqwGC5fg9EGq924fg2KCVK%252BO4h%250AhuF%252FhNrZZ38diiJw2WGZFjHo3HWnZy5AliKbOg6ddHNz8eH72vap4RrkXG%252BvzxX%252BWAjCtwnOEKQd%250At0w9FDWJMWuWPLMUR7rIv5i7%252Fi1KNAm94BJ5%252FXO7M3EFJizdl73nhvamOzii37eNbQY%253D&idle=true',
      'ws://192.168.29.108:8000/'+roomno+'/'+username+'?username='+username,
      this.inputStream = new QueueingSubject<any>()
    ).share()
}
  public send(message: any):void {
    console.log('sending : ' + message);
    // If the websocket is not connected then the QueueingSubject will ensure
    // that messages are queued and delivered when the websocket reconnects.
    // A regular Subject can be used to discard messages sent when the websocket
    // is disconnected.
    this.inputStream.next(message)
  }
  fetchUsersForChat(username) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'chat/chatusers/'+username,{headers: headers}).map((response: Response) => response.json());
  }
  fetchMessages(id) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'chat/messages/'+id,{headers: headers}).map((response: Response) => response.json());
  }
  AddGetRoom(hfw,lfw) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'chat/room/',
      JSON.stringify({
          HFW:hfw.toString(),
          LFW:lfw.toString(),
          RoomNo:'1',
          Deleted:false
      }), {headers: headers}).map((data: Response) => data.json());
  }
  }
