import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  drpTextCatagory = 'Job Catagory';
  temp: any = [];
  bookmark: any= [];
  hidebookmarklist: any= [];
  constructor(private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: JobCatagoryService, private router: Router) {}
  ListTrack: any = [];
  jobsList: any= [];
  ngOnInit() {
    this.PolpulateBookMarkList();
    this.newService.fetchJobsById(localStorage.getItem('jobid')).subscribe(data => {
      this.jobsList = data;
      console.log('Job Data.....................')
      console.log(data);
    });
    this.newService.fetchJobCatagories().subscribe(data => {
      this.temp = data;
      console.log(this.temp);
      for (const i of this.temp) {
        i.values = i.values.split(',');
      }
    }); // , console.log(this.jobcatagories)));
  }
  PolpulateBookMarkList() {
    this.newService.fetchCheckBookMarkByUserName().subscribe(data => {
      while (this.hidebookmarklist.length > 0) {
        this.hidebookmarklist.pop();
      }
      for (const item of data) {
        // console.log(item);
        this.hidebookmarklist.push(item.Id);
      }
      console.log(this.hidebookmarklist);
    });
  }
  list(val) {
    console.log('list : ' + val);
    this.drpTextCatagory = val;
  }
  CheckBookMark(id) {
    if (this.hidebookmarklist.indexOf(id) === -1) {
      return true;
    } else {
      return false;
    }
  }
  btnBookmarkClick(id) {
    localStorage.setItem('jobid', id);
    console.log(id);
      this.newService.AddBookMark(id).subscribe(data1 => {
        console.log(data1);
        this.PolpulateBookMarkList();
        this.toastr.success('Book Mark Added Sucessfully','Sucess');
      },
        error=>{
        this.toastr.error('Book Mark Not added due to some error','Error')
        });
      }
  ApplyforJob() {
    console.log(this.jobsList[0].id);
    // this.newService.AddAppliedJob(localStorage.getItem('username'),id).subscribe(data=>{
    this.router.navigate(['/sdashboard'], {queryParams: {jobid: this.jobsList[0].id}});
    // },error=>{

    // });
  }
}
