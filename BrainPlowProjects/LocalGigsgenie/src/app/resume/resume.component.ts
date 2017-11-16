import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  constructor(private newService: JobCatagoryService, private router: Router, private objClassTrack: ClassTrackHelperModule) {}
  // ListTrack: any = [];

  ngOnInit() {
    // this.objClassTrack.SetTrack('/editresume', 'Edit Resume');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
  }

}
