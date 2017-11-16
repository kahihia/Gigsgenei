import { Component, OnInit } from '@angular/core';
import {ShowcaseService} from './../../_services/Showcase/showcase-service';
import {ProfileService} from './../../_services/Profile/profile-service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {Globalvariables} from './../../_services/class-track-helper/globalvariables';
import {isNullOrUndefined} from "util";
import {Homepagegig} from "../../_services/ControllerClasses/Loading/homepagegig";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(private profileService: ProfileService,private showcaseService: ShowcaseService, private router: Router, private objClassTrack: ClassTrackHelperModule) {
  for(let i=0;i<4;i++) {
    let obj1 = new Homepagegig();
    let obj2 = new Homepagegig();
    let obj3 = new Homepagegig();
    let obj4 = new Homepagegig();
    this.ListViewGigs1.push(obj1);
    this.ListViewGigs2.push(obj2);
    this.ListViewGigs3.push(obj3);
    this.ListViewGigs4.push(obj4);
  }
  this.loaded = true;
  }
  ListTrack: any = [];
  ListViewGigs1: any = [];
  ListViewGigs2: any = [];
  ListViewGigs3: any = [];
  ListViewGigs4: any = [];
  toggle=true;
  GlobalImageAdress= new Globalvariables();
  mainbanner='./assets/themes/images/pic2.jpg';// ./assets/themes/images/ladies/4.jpg
  loaded=false;
  index=0;
  intervalId:any;
  UserData: any;
  timer() {
    if(isNullOrUndefined(this.index )){
      console.log('undefined');
      this.index = 0;
    }
    this.index+=1;
    if(this.index>3) {
      this.index=0;
    }
    // let id= document.getElementById("mainbanner") as HTMLImageElement;
    // id.src = './assets/themes/images/pic' + (this.index)+ '.jpg';
    document.getElementById("bannerHeader").style.backgroundImage = "url('./assets/themes/images/pic" + (this.index)+ ".jpg')";

  }
  ngOnInit() {
    try {

      this.profileService.fetchContarctorByUserName().subscribe(data=>{
        this.UserData=data;
        console.log(this.UserData);
      },error=>{

      });

      this.showcaseService.fetchViewGigs().subscribe(data => {
          for (let i = 0; i < data.length; i++) {
            for (let help of data[i]) {
              help.ImageSrc = '';
              for (let i = 0; i < help.tracks.length; i++) {
                while (help.tracks[i].charAt(0) === '.') {
                  help.tracks[i] = help.tracks[i].substr(1);
                }
                help.ImageSrc = this.GlobalImageAdress.Url + help.tracks[0];
              }
              if (help.user1.image.length > 0) {
                // while (help.user1.image[0].Resume.charAt(0) === '/') {
                //   help.user1.image[0].Resume = help.user1.image[0].Resume.substr(1);
                  help.user1.image[0].Resume = this.GlobalImageAdress.mediaUrl + help.user1.image[0].Resume;
                // }
              }
            }
          }
          for(let i=0;i<4;i++) {
            this.ListViewGigs1[i].ImageSrc = data[0][i].ImageSrc;
            this.ListViewGigs1[i].Title =data[0][i].Title;
            if(data[0][i].user1.image.length>0) {
              this.ListViewGigs1[i].Resume = data[0][i].user1.image[0].Resume;
            }
            this.ListViewGigs1[i].username =data[0][i].user1.username;
            this.ListViewGigs1[i].GigId = data[0][i].id;
            if(data[0][i].prize.length>0) {
              this.ListViewGigs1[i].Prize = data[0][i].prize[0].MinPrize + '-' + data[0][i].prize[0].MaxPrize + '$';
            }

            this.ListViewGigs2[i].ImageSrc = data[0][i+4].ImageSrc;
            this.ListViewGigs2[i].Title =data[0][i+4].Title;
            if(data[0][i+4].user1.image.length>0) {
              this.ListViewGigs2[i].Resume = data[0][i+4].user1.image[0].Resume;
            }
            this.ListViewGigs2[i].username =data[0][i+4].user1.username;
            this.ListViewGigs2[i].GigId = data[0][i+4].id;
            if(data[0][i+4].prize.length>0) {
              this.ListViewGigs2[i].Prize = data[0][i+4].prize[0].MinPrize + '-' + data[0][i+4].prize[0].MaxPrize + '$';
            }

          }
        // this.loaded=true;
          console.log(data[0]);
          console.log(this.ListViewGigs1);
          console.log(this.ListViewGigs2);
        },
        error => {
          console.log(error);
        });
    }
    catch (err) {
      console.log('catch : '+err);
    }
     this.intervalId = setInterval( this.timer, 3000 );
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  ChooseGigNavigate(id,username) {
    console.log('id: '+ id + 'username : '+ username)
    this.router.navigate(['/choosegig'], {queryParams: {id: id,username:username}});
    // routerLink="/choosegig" [queryParams]="{}"
  }
  openNav(Mynav,searchOverlay) {
    console.log('open nav');
    Mynav.style.height = '100%';
    searchOverlay.focus();
  }

  closeNav(Mynav,search) {
    Mynav.style.height = '0%';
    search.focus();
  }
  ImgClick(image, obj) {
    console.log('src: ' + image);
    console.log(obj);
    obj.ImageSrc=this.GlobalImageAdress.Url + image ;
  }
  // imagechange() {
  //   console.log('enter : ' + this.mainbanner);
  //   this.mainbanner= this.mainbannerlist[this.index];
  //   if(this.index>=3) {
  //     this.index=0;
  //   }
  //   else {this.index+=1;}
  //   return true;
  // }
}
