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
export class NotificationService {
  private inputStream: QueueingSubject<any>
  public outputStream: Observable<any>
  objGlobalvariables= new Globalvariables();
  constructor(private http: HttpService, private httpnoloader: Http,private socketFactory: WebSocketService) {}
  public connect(username,roomno) {
    if (this.outputStream) {
      console.log('already connected...........');
      return this.outputStream;
    }
    console.log('Connecting Now.................');
    return this.outputStream = this.socketFactory.connect(
      'ws://192.168.29.108:8000/'+roomno+'/'+username+'?username='+username,
      this.inputStream = new QueueingSubject<any>()
    ).share()
  }
  public send(message: any):void {
    console.log('sending : ' + message);
    this.inputStream.next(message)
  }
}
