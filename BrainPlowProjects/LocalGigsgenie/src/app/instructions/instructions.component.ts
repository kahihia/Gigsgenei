import {JobCatagoryService} from './../../_services/job-catagory.service';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private newService: JobCatagoryService, private activatedRoute: ActivatedRoute, private objClassTrack: ClassTrackHelperModule,
              private router: Router) {
  }
  drpChooseTestCatagory= 'Choose Test Catagory';
  ListTrack: any = [];
  TestCatagoryList: any=[];
  ngOnInit() {
    // this.objClassTrack.SetTrack('/instructions', 'Instructions');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
    this.newService.fetchTestCatagories().subscribe(data =>{this.TestCatagoryList=data;},
      error=>{

      });
  }
  scltCatagoryChange(val) {
    this.drpChooseTestCatagory=val;
  }

}
