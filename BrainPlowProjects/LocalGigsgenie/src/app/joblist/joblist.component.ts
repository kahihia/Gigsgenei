import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  // For bindind drop down list for catagories search
  drpTextCatagory = 'Job Catagory';
  temp: any = []; // end
  constructor(private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: JobCatagoryService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ListTrack: any = [];
  jobsList: any= [];
  bookmark: any= [];
  hidebookmarklist: any= [];
  ListViewGigs: any;
  showbids: any= [];

  // boolhidebookmarkbutton = true;
  ngOnInit() {
    window.scroll(0, 0);
    // this.newService.fetchViewGigs().subscribe(data => {this.ListViewGigs = data;
    //     console.log(data);
    //     for (let i = 0; i < this.ListViewGigs.length; i++) {
    //       this.ListViewGigs[i].Image4 = this.ListViewGigs[i].Image1;
    //     }
    //     console.log(data);
    //   },
    //   error => {
    //     console.log(error);
    //   });

    // this.objClassTrack.SetTrack('/joblist', 'Job List');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
    this.PolpulateBookMarkList();
    localStorage.setItem('jobindex', '0');
    this.newService.fetchJobsList('public', localStorage.getItem('jobindex'),'1').subscribe(data => {console.log(data);
    this.jobsList = data; });
    // Binding Job Catagories data
    this.newService.fetchJobCatagories().subscribe(data => {
      this.temp = data;
      console.log(this.temp);
      for (const i of this.temp) {
        i.values = i.values.split(',');
      }
    });
  }
  prevClick() {
    this.PolpulateBookMarkList();
    localStorage.setItem('jobindex', (parseInt(localStorage.getItem('jobindex'), 10) - 10).toString());
    console.log('prev: ' + localStorage.getItem('jobindex'));
    this.newService.fetchJobsList('public', localStorage.getItem('jobindex'),localStorage.getItem('username')).subscribe(data => {console.log(data);
      this.jobsList = data; });
    window.scroll(0, 300);
  }
  nextClick() {
    this.PolpulateBookMarkList();
    localStorage.setItem('jobindex', (parseInt(localStorage.getItem('jobindex'), 10) + 10).toString());
    console.log('next : ' + localStorage.getItem('jobindex'));
    this.newService.fetchJobsList('public', localStorage.getItem('jobindex'),localStorage.getItem('username')).subscribe(data => {console.log(data);
      this.jobsList = data; });
    window.scroll(0, 300);
  }
  btnDetailClick(id) {
    localStorage.setItem('jobid', id);
    this.router.navigate(['/details']);
    console.log(id);
  }
  btnBookmarkClick(id) {
    localStorage.setItem('jobid', id);
    console.log(id);
      this.newService.AddBookMark(id).subscribe(data1 => {
        console.log(data1);
        this.PolpulateBookMarkList();
        this.toastr.success('BookMark Added Successfully','Success');
    },error=>{
        this.toastr.error('BookMark Not added due to some errors','Error');
      });
  }
  CheckBookMark(id) {
    if (this.hidebookmarklist.indexOf(id) === -1) {
      return true;
    } else {
      return false;
    }
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
  ApplyforJob(id) {
    console.log(this.jobsList[0].id);
    // this.newService.AddAppliedJob(localStorage.getItem('username'),id).subscribe(data=>{
      this.router.navigate(['/sdashboard'], {queryParams: {jobid: id}});
    // },error=>{

    // });
  }
}
