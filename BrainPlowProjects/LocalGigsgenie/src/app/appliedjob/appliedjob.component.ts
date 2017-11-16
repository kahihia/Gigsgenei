import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';

@Component({
  selector: 'app-appliedjob',
  templateUrl: './appliedjob.component.html',
  styleUrls: ['./appliedjob.component.css']
})
export class AppliedjobComponent implements OnInit {

  constructor(private newService: JobCatagoryService, private router: Router, private objClassTrack: ClassTrackHelperModule) {}
  ListTrack: any = [];

  ngOnInit() {
    this.objClassTrack.SetTrack('/appliedjob', 'Applied Job');
    this.ListTrack = JSON.parse(localStorage.getItem('Track'));
  }

}
