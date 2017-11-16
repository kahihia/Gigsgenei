import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {PostJob} from "../../_services/ControllerClasses/Loading/postjob";
import {Bid} from "../../_services/ControllerClasses/Loading/bid";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {BidDialogue} from "../../_services/ControllerClasses/biddialogue";

@Component({
  selector: 'app-sdashboard',
  templateUrl: './sdashboard.component.html',
  styleUrls: ['./sdashboard.component.css']
})
export class SdashboardComponent implements OnInit {
  jobDetail:any={budget:'',time:'',title:''};
  jobid='';
  model:any=[];
  end_date = '2017-09-25 15:25:16';
  appliedJobs:any = []; // Jobs On which User Has Bid Already
  jobwithBids:any = [];
  objPostJob = new PostJob();
  bidsOnJObList:any = [];
  objBidDialogue = new BidDialogue();
  constructor(private dialog: MatDialog, private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: JobCatagoryService, private activatedRoute: ActivatedRoute,private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.activatedRoute.queryParams
      .filter(params =>params.jobid)
      .subscribe(params => {
        this.jobid = params.jobid;
        this.newService.fetchBidsByJobId(params.jobid).subscribe(data => {
          this.jobwithBids = data[0];
          console.log(data[0]);
          this.bidsOnJObList.splice(0,this.bidsOnJObList.length);
          this.jobwithBids = data[0];
          this.objPostJob.Budget = this.jobwithBids.Budget;
          this.objPostJob.CompletionTime = this.jobwithBids.CompletionTime;
          this.objPostJob.JobName = this.jobwithBids.JobName;
          this.objPostJob.JobCatagory = this.jobwithBids.JobCatagory;
          this.objPostJob.Deleted = this.jobwithBids.Deleted;
          this.objPostJob.BidDays = this.jobwithBids.BidDays;
          this.objPostJob.CreatedAt = this.jobwithBids.CreatedAt;
          this.objPostJob.Description = this.jobwithBids.Description;
          this.objPostJob.JobSubCatagory = this.jobwithBids.JobSubCatagory;
          this.objPostJob.ExprienceLevel = this.jobwithBids.ExprienceLevel;
          this.objPostJob.Negotiatable = this.jobwithBids.Negotiatable;
          this.objPostJob.SkillsNeeded = this.jobwithBids.SkillsNeeded;
          this.objPostJob.Status = this.jobwithBids.Status;
          this.objPostJob.PostType= this.jobwithBids.PostType;
          this.objPostJob.Taken= this.jobwithBids.Taken;
          console.log(data[0]);
          for(let bids of this.jobwithBids.bids) {
            let objBid= new Bid();
            objBid.Bidder = bids.Bidder.username;
            objBid.BidOwner = bids.BidOwner.username;
            if(bids.Bidder.image.length>0) {
              objBid.BidderImage ='http://192.168.29.108:8000' + bids.Bidder.image[0].Resume;
            }
            objBid.Days = bids.Days;
            objBid.Title = bids.Title;
            objBid.Status = bids.Status;
            objBid.BidPrize = bids.BidPrize;
            objBid.SponsorMyBid = bids.SponsorMyBid;
            objBid.ExpertGuarantee = bids.ExpertGuarantee;
            objBid.HighlightMyBid = bids.HighlightMyBid;
            this.bidsOnJObList.push(objBid);

          }
          console.log(this.bidsOnJObList);

        });




      });
      this.newService.fetchAlreadyBidedJob(1).subscribe(data=>{
      this.appliedJobs=data;
      console.log('already bided jobs');
      console.log(data);
    },error=>{});

  }
  LoadAppliedJobDetailsByJobId(jobid) {
    this.newService.fetchBidsByJobId(jobid).subscribe(data => {
      this.jobwithBids = data[0];
      console.log(data[0]);
      this.bidsOnJObList.splice(0,this.bidsOnJObList.length);
      this.jobwithBids = data[0];
      this.objPostJob.Budget = this.jobwithBids.Budget;
      this.objPostJob.CompletionTime = this.jobwithBids.CompletionTime;
      this.objPostJob.JobName = this.jobwithBids.JobName;
      this.objPostJob.JobCatagory = this.jobwithBids.JobCatagory;
      this.objPostJob.Deleted = this.jobwithBids.Deleted;
      this.objPostJob.BidDays = this.jobwithBids.BidDays;
      this.objPostJob.CreatedAt = this.jobwithBids.CreatedAt;
      this.objPostJob.Description = this.jobwithBids.Description;
      this.objPostJob.JobSubCatagory = this.jobwithBids.JobSubCatagory;
      this.objPostJob.ExprienceLevel = this.jobwithBids.ExprienceLevel;
      this.objPostJob.Negotiatable = this.jobwithBids.Negotiatable;
      this.objPostJob.SkillsNeeded = this.jobwithBids.SkillsNeeded;
      this.objPostJob.Status = this.jobwithBids.Status;
      this.objPostJob.PostType= this.jobwithBids.PostType;
      this.objPostJob.Taken= this.jobwithBids.Taken;
      console.log(data[0]);
      for(let bids of this.jobwithBids.bids) {
        let objBid= new Bid();
        objBid.Bidder = bids.Bidder.username;
        objBid.BidOwner = bids.BidOwner.username;
        if(bids.Bidder.image.length>0) {
          objBid.BidderImage ='http://192.168.29.108:8000' + bids.Bidder.image[0].Resume;
        }
        objBid.Days = bids.Days;
        objBid.Title = bids.Title;
        objBid.Status = bids.Status;
        objBid.BidPrize = bids.BidPrize;
        objBid.SponsorMyBid = bids.SponsorMyBid;
        objBid.ExpertGuarantee = bids.ExpertGuarantee;
        objBid.HighlightMyBid = bids.HighlightMyBid;
        this.bidsOnJObList.push(objBid);

      }
      console.log(this.bidsOnJObList);
      this.toastr.info('Job Data Loaded!', 'Success!');
    },
        error=>{
          this.toastr.error('Bids Data Not Loaded!', 'Error!');
        });
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(Bidcomponent, <MatDialogConfig>{
      width: '600px',
      data: {name: sessionStorage.getItem('username'),
             obj: this.objBidDialogue}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result) ;
      // this.SubmitBid(result);
    });
  }


  ngOnInit() {
    // window.setInterval(function () {
    //   this.timer
    // }, 1000);
  }
  SubmitBid(title1,budget1,time1,f1) {
    console.log('Submit'+ f1.title.value);
    this.newService.AddBid('1',this.jobid ,budget1,time1,title1).subscribe(data=>{
        console.log(data[0]);
        this.toastr.success('Bid Added Successfully!', 'Congrats:');
        this.newService.fetchBidsByJobId(this.jobid).subscribe(data => {
          this.bidsOnJObList.splice(0,this.bidsOnJObList.length);
          for(let bids of data[0].bids) {
            let objBid= new Bid();
            objBid.Bidder = bids.Bidder.username;
            objBid.BidOwner = bids.BidOwner.username;
            if(bids.Bidder.image.length>0) {
              objBid.BidderImage ='http://192.168.29.108:8000' + bids.Bidder.image[0].Resume;
            }
            objBid.Days = bids.Days;
            objBid.Title = bids.Title;
            objBid.Status = bids.Status;
            objBid.BidPrize = bids.BidPrize;
            objBid.SponsorMyBid = bids.SponsorMyBid;
            objBid.ExpertGuarantee = bids.ExpertGuarantee;
            objBid.HighlightMyBid = bids.HighlightMyBid;
            this.bidsOnJObList.push(objBid);

          }


          console.log(data[0]);
        });
      },
      error=>{
        this.toastr.error('Bid not added due to some Error!', 'Error:');
      });
  }
  // getJobPlusBids(id) {
  //   this.newService.fetchBidsByJobId(this.appliedJobs[id].JobId).subscribe(data => {
  //     this.jobDetail = data[0];
  //     this.setEndTime(this.jobDetail.createdat ,this.jobDetail.BidDays )
  //     console.log(data[0]);
  //     this.toastr.success('Bids Data Loaded!', 'Success!');
  //   });
  // }
// Timer createdat  BidDays
  setEndTime(createat,biddays) {

    let time = new Date(createat);
    time.setDate(time.getDate() + biddays);
    this.end_date  =time.getFullYear() +"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    console.log('time : ' + this.end_date);
    // this.end_date  = '2017-09-25 15:25:16';
  }
  timer() {
    console.log('timer : ' + ((new Date(this.end_date).getTime().valueOf() - new Date().getTime().valueOf()) / (1000)).toFixed(0));
    return ((new Date(this.end_date).getTime().valueOf() - new Date().getTime().valueOf()) / (1000)).toFixed(0);
  }
}

@Component({
  selector: 'bidcomponent',
  templateUrl: 'bidcomponent.html',
})
export class Bidcomponent {

  constructor(
    public dialogRef: MatDialogRef<Bidcomponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
