import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {Globalvariables} from './../../_services/class-track-helper/globalvariables';
import {isNullOrUndefined} from "util";
import {HomePageService} from "./../../_services/Description/homepageservice";

@Component({
  selector: 'app-main-html',
  templateUrl: './main-html.component.html',
  styleUrls: ['./main-html.component.css']
})
export class MainHtmlComponent implements OnInit {



  constructor(private newService: JobCatagoryService,  private homeservice: HomePageService, private router: Router, private objClassTrack: ClassTrackHelperModule) {}
  intervalId:any;
  index=1;
  aboutus ='' ;


  timer() {
    if(isNullOrUndefined(this.index )){
      console.log('undefined');
      this.index = 1;
    }
    this.index+=1;
    if(this.index>3) {
      this.index=1;
    }
    // this.index = Math.floor( (Math.random()*100)%3);
    console.log('Enter : ' + "url('./assets/themes/images/pic" + (this.index)+ ".jpg')")
    document.getElementById("banner").style.backgroundImage = "url('./assets/themes/images/main" + (this.index)+ ".jpg')";
    console.log("url('./assets/themes/images/pic'" + (this.index)+ ".jpg)");
  }
  ngOnInit() {
    
    this.homeservice.getHomeDescription().subscribe(data=> { 
      console.log(data);
      this.aboutus = data.description;
      console.log(this.aboutus);
      console.log('service');
    
    this.intervalId = setInterval( this.timer, 2000 );
  })
}

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
