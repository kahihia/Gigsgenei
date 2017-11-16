import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';

@Component({
  selector: 'app-profiledetail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.css']
})
export class ProfiledetailComponent implements OnInit {

  constructor(private newService: JobCatagoryService, private router: Router, private objClassTrack: ClassTrackHelperModule) {}
  // ListTrack: any = [];
  ngOnInit() {
    // this.objClassTrack.SetTrack('/profiledetails', 'Profile Details');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
  }

}
