import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.css']
})
export class DeleteaccountComponent implements OnInit {

  constructor(private newService: JobCatagoryService, private router: Router, private objClassTrack: ClassTrackHelperModule) {}
  ListTrack: any = [];

  ngOnInit() {
    // this.objClassTrack.SetTrack('/deleteaccount', 'Delete Account');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
  }

}
