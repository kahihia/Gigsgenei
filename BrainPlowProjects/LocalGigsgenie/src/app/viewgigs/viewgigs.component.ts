import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {Globalvariables} from './../../_services/class-track-helper/globalvariables';
@Component({
  selector: 'app-viewgigs',
  templateUrl: './viewgigs.component.html',
  styleUrls: ['./viewgigs.component.css']
})
export class ViewgigsComponent implements OnInit {

  constructor(private newService: JobCatagoryService, private router: Router, private objClassTrack: ClassTrackHelperModule) {}
  ListTrack: any = [];
  ListViewGigs: any = [];
  toggle=true;
  GlobalImageAdress= new Globalvariables();
  // ImageSrc='';
  ngOnInit() {
    // this.objClassTrack.SetTrack('/viewgigs', 'View Gigs');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
    this.newService.fetchViewGigs().subscribe(data => {this.ListViewGigs = data;
    console.log('..........................');
    console.log(this.ListViewGigs);
    for (let i = 0; i < this.ListViewGigs.length; i++) {
      for (let help of this.ListViewGigs[i]) {
        help.ImageSrc='';
        for (let i = 0; i < help.tracks.length; i++)
          {
            console.log("Enter For Tracks");
            while(help.tracks[i].charAt(0) === '.')
          {
            help.tracks[i]  = help.tracks[i].substr(1);
          }
            help.ImageSrc=this.GlobalImageAdress.Url+help.tracks[0];

          }
        }
    }
        },
    error => {
      console.log(error);
    });
    // Alert for cancelling Guards
  }
  ImgClick(image, obj) {
    console.log('src: ' + image);
    console.log(obj);
      obj.ImageSrc=this.GlobalImageAdress.Url + image ;
    }
  favouritegig(id) {
    if(this.toggle===true) {
      console.log('true');
      // id.style.backgroundColor='blue';
    this.toggle=false;
    }
    else {
      console.log('false');
      this.toggle=true;
      // id.style.backgroundColor='blue';
    }
  }
}
