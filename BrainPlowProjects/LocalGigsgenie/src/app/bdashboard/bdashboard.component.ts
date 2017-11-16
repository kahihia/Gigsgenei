import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {PostJob} from "../../_services/ControllerClasses/Loading/postjob";
import {Bid} from "../../_services/ControllerClasses/Loading/bid";

@Component({
  selector: 'app-bdashboard',
  templateUrl: './bdashboard.component.html',
  styleUrls: ['./bdashboard.component.css']
})
export class BdashboardComponent implements OnInit {
  jobDetail:any=[];
  jobwithBids:any = [];
  objPostJob = new PostJob();
  bidsOnJObList:any = [];

  constructor(private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: JobCatagoryService, private activatedRoute: ActivatedRoute,private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.newService.fetchLoadPostJob(1).subscribe(data => (this.jobDetail = data, console.log(data)));

  }
    ngOnInit() {

  }
  remove(){
    console.log('remove');
    let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i] as HTMLElement;
          openDropdown.style.display='none';
      }
    }
  ShowJobWithBids(id) {
    console.log(id);
    this.newService.fetchBidsByJobId(id).subscribe(data => {
      // Clear Bids List If contain ANything Before
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
      this.toastr.success('Bids Data Loaded!', 'Success!');
      // this.toastr.success('This toast will dismiss in 10 seconds.', null, {toastLife: 10000});

    });
  }

}
