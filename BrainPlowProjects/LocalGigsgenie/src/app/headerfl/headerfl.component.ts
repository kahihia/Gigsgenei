import { Component, OnInit } from '@angular/core';
import {ProfileService} from './../../_services/Profile/profile-service';
import {Router} from '@angular/router';
import {Globalvariables} from "../../_services/class-track-helper/globalvariables";
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {NotificationService} from "../../_services/web-socket/notification-service";
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-headerfl',
  templateUrl: './headerfl.component.html',
  styleUrls: ['./headerfl.component.css']
})
export class HeaderflComponent implements OnInit {
  private socketSubscription: Subscription

  constructor(private socket:NotificationService, private newService: ProfileService, private router: Router, private objClassTrack: ClassTrackHelperModule) {
    const stream = this.socket.connect(sessionStorage.getItem('username'),sessionStorage.getItem('userid'));
    this.socketSubscription = stream.subscribe(message=> {
      message.username = sessionStorage.getItem('username');
      this.Notifications.push(message);
      this.NotificationsLength +=1;
      // alert(message.text);
    });
  }

  ProfilePercentage = 0;
  objGlobalvariables = new Globalvariables();
  expressyourself:any = [];
  contractor:any = [];
  Notifications:any = [];
  NotificationsLength = 0;
  Notification:any;
  ngOnInit() {


    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('ws://192.168.29.108:8000/1/danish?username=danish')
        .then(function(swReg) {
          console.log('Service Worker is registered', swReg);

         let swRegistration = swReg;
        })
        .catch(function(error) {
          console.error('Service Worker Error', error);
        });
    } else {
      console.warn('Push messaging is not supported');
      // let pushButton.textContent = 'Push Not Supported';
    }



    this.newService.fetchExpressYourself().subscribe(data=>{
      this.expressyourself = data;
      while(this.expressyourself.Resume.charAt(0) === '.')
      {
        this.expressyourself.Resume = this.expressyourself.Resume.substr(1);
      }
      this.expressyourself.Resume = this.objGlobalvariables.ApiUrlLocal + 'media' + this.expressyourself.Resume;
    });
    this.newService.fetchContarctor().subscribe(data =>
    {
      this.contractor = data, console.log(data);
      sessionStorage.setItem('userid',data.id);
    });
    // this.newService.fetchCountOfProfileInfo(localStorage.getItem('username')).subscribe(data => {console.log(data);
    // for (let i = 0; i < data.length ; i++) {
    //   if (parseInt(data[i], 10) > 0) {
    //     this.ProfilePercentage += 10;
    //     console.log(parseInt(data[i], 10) + '...' + data[i]);
    //     console.log(this.ProfilePercentage);
    //   }
    // }
    // // this.ProfilePercentage += 50;
    // });
  }
  funcProfilePercentage() {
    // this.newService.fetchCountOfProfileInfo(localStorage.getItem('username')).subscribe(data => {console.log(data);
    //   for (let i = 0; i < data.length ; i++) {
    //     if (parseInt(data[i], 10) > 0) {
    //       this.ProfilePercentage += 8;
    //       console.log(parseInt(data[i], 10) + '...' + data[i]);
    //       console.log(this.ProfilePercentage);
    //     }
    //   }
    //   return this.ProfilePercentage;
    //   // this.ProfilePercentage += 50;
    // });
  }
  ResetNotificationLength() {
    this.NotificationsLength = 0;
  }
  // request permission on page load
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/signin']);
  }
}
