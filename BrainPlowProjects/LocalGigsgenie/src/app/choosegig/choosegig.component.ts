import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Globalvariables} from './../../_services/class-track-helper/globalvariables';
import {ShowcaseService} from "../../_services/Showcase/showcase-service";
import {Gigsearchterms} from './../../_services/ControllerClasses/gigsearchterms';
import {GigsRequirement} from './../../_services/ControllerClasses/gigrequirement';
import {GigsFaq}  from './../../_services/ControllerClasses/gisfaq';
import {Homepagegig} from "../../_services/ControllerClasses/Loading/homepagegig";

@Component({
  selector: 'app-choosegig',
  templateUrl: './choosegig.component.html',
  styleUrls: ['./choosegig.component.css']
})
export class ChoosegigComponent implements OnInit {


  constructor(private showcaseService: ShowcaseService,private router: Router,private activatedRoute: ActivatedRoute) {

  }
  ListViewGigs:any = [];
  model: any = {};
  GigData:any=[];
  ImageSrc='./../../assets/images/defaultimg.png';
  ImageIndex=0;
  GlobalImageAdress= new Globalvariables();
  gigId='';
  GigUserName='';
  loaded = false;
  onSubmit = function()

  { console.log(this.model);
    this.router.navigate(['/chat']);
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .filter(params => params.id,params =>params.username)
      .subscribe(params => {
        this.gigId=params.id;
        this.GigUserName = params.username;
        this.showcaseService.fetchViewGigsbyGigId(params.id).subscribe(data=>{
          window.scroll(0,0);
          this.GigData=data[0];
          this.FetchRelatedGigs(this.GigUserName);
          console.log(this.GigData);
          this.ImageSrc = this.GlobalImageAdress.mediaUrl + this.GigData.tracks[0].Image;
          console.log(this.ImageSrc);
          this.loaded=true;
        },error=>{

        });
      });



  }
  FetchRelatedGigs(username) {
    try {
      this.showcaseService.fetchViewGigsByUserName(username).subscribe(data => {
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
          for(let i=0;i<data[0].length;i++) {
            if(this.ListViewGigs[i]) {
              console.log('................ESY........');
              this.ListViewGigs.splice(i, 1);
            }
            else {console.log('..........NO.......');
            }
            let obj = new Homepagegig();
            // this.ListViewGigs.push(obj);
            this.ListViewGigs.splice(i, 0, obj);

            this.ListViewGigs[i].ImageSrc = data[0][i].ImageSrc;
            this.ListViewGigs[i].Title =data[0][i].Title;
            if(data[0][i].user1.image.length>0) {
              this.ListViewGigs[i].Resume = data[0][i].user1.image[0].Resume;
            }
            this.ListViewGigs[i].username =data[0][i].user1.username;
            this.ListViewGigs[i].GigId = data[0][i].id;
            if(data[0][i].prize.length>0) {
              this.ListViewGigs[i].Prize = data[0][i].prize[0].MinPrize + '-' + data[0][i].prize[0].MaxPrize + '$';
            }
          }
        },
        error => {
          console.log(error);
        });
    }
    catch (err) {
      console.log('catch : '+err);
    }
  }
  NavigetoMessages() {
    this.router.navigate(['/message'], {queryParams: {username:this.GigUserName}});
  }
  ChooseGigNavigate(id,username) {
    this.router.navigate(['/choosegig'], {queryParams: {id: id,username:username}});
    // routerLink="/choosegig" [queryParams]="{}"
  }

  rigthArrow() {
    if(this.GigData.tracks.length-1>this.ImageIndex) {
      this.ImageIndex+=1;
    }
    this.ImageSrc= this.GlobalImageAdress.mediaUrl + this.GigData.tracks[this.ImageIndex].Image;
  }
  leftArrow() {
    if(this.ImageIndex>0) {
      this.ImageIndex-=1;
    }
    this.ImageSrc= this.GlobalImageAdress.mediaUrl + this.GigData.tracks[this.ImageIndex].Image;

  }
  // review(event:any) {
  //   // console.log(event.keyCode);
  //   // console.log('review : ' + event.target.value);
  //   if(event.keyCode===13) {
  //     this.newService.AddReview(this.gigId,this.gigUser, event.target.value).subscribe(data=>{},error=>{});
  //   }
  // }

}
