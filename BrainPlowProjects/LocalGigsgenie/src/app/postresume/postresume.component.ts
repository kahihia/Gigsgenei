import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';

@Component({
  selector: 'app-postresume',
  templateUrl: './postresume.component.html',
  styleUrls: ['./postresume.component.css']
})
export class PostresumeComponent implements OnInit {

  constructor(private newService: JobCatagoryService, private router: Router, private objClassTrack: ClassTrackHelperModule) {}
  ListTrack: any = [];

  ngOnInit() {
    // this.objClassTrack.SetTrack('/editresume', 'Edit Resume');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
  }
  btnAddEducation() {
    console.log('click');
    // this.newService.AddEducation().subscribe(data=>console.log(data));
    // this.newService.AddWorkExperience().subscribe(data=>console.log(data));
    // this.newService.AddSkills().subscribe(data=>console.log(data));
  }
}
