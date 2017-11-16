import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ProfileService} from './../../_services/Profile/profile-service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {Globalvariables} from "../../_services/class-track-helper/globalvariables";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  workId='';
  companyname='Hello';
  designation='Hello1';
  startYear='hello';
  endYear='helllo';
  description='helo';


  eduId='';
  institution='a';
  degreename='b';
  startyear='c';
  endyear='d';
  percentile='e';


  skillId='';
  skillname='';
  skilllevel='';
  
  constructor(private newService: ProfileService, private router: Router, private objClassTrack: ClassTrackHelperModule,
    private toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }
  ListTrack: any = [];
  education: any= [];
  workexprience: any= [];
  expressyourself:any =[];
  skills: any= [];
  contractor: any= [];
  color = 'primary';
  mode = 'determinate';
  value = 50;
  position='below';
  objGlobalvariables = new Globalvariables();

// Variables for for handling updates
  workupdateind = 0;
  eduupdateind = 0;
  skillupdateind=0;


  
  ngOnInit() {
    // this.objClassTrack.SetTrack('/profile', 'Resume');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));

    this.newService.fetchEducationalBackground().subscribe(data =>
      (this.education = data, console.log(data)));
    this.newService.fetchWorkExperience().subscribe(data => (this.workexprience = data, console.log(data)));
    this.newService.fetchSkills().subscribe(data => (this.skills = data, console.log(data)));
    this.newService.fetchContarctor().subscribe(data =>
      (this.contractor = data, console.log(data)));
    this.newService.fetchExpressYourself().subscribe(data=>{
      this.expressyourself = data;
      while(this.expressyourself.Resume.charAt(0) === '.')
      {
        this.expressyourself.Resume = this.expressyourself.Resume.substr(1);
      }
      this.expressyourself.Resume = this.objGlobalvariables.ApiUrlLocal + 'media' + this.expressyourself.Resume;
    });
}
btnworkEditClick(index,val1,val2, val3, val4,val5,id) {
  this.workupdateind = index;
  this.companyname=val1;
  this.designation=val2;
  this.startYear=val3;
  this.endYear=val4;
  this.description=val5;
  this.workId = id;
  console.log('Name : '+index+'   '+this.companyname + this.designation+this.startYear+ this.endYear+this.description+this.workId);
}

UpdateworkexperienceClick(companyname,designation,startYear,endYear,description) {
  console.log('update : ' + companyname + designation + startYear+endYear+description);
  this.newService.UpdateWorkExperience( this.workId,companyname,designation,startYear,endYear,description).subscribe(data => {
    console.log(data);
    this.toastr.success('Your Information is Updated Sucessfully','Success');
      this.workexprience[this.workupdateind] = data;
      console.log('service');
    },error => {
    this.toastr.error('Your Information is not updated, Please try again','Error')
  });
}
btnworkDeleteClick(id) {
  this.workId = id;
  console.log('Id : '+this.workId);
}

deleteworkexperienceClick(id) {
  console.log('delete' + id);
  this.newService.DeleteWorkExperience(id).subscribe(data => {
    console.log(data);
    console.log("jashan");

    this.toastr.success('Your Information is Deleted Sucessfully','Success');
    this.newService.fetchWorkExperience().subscribe(data=> { console.log(data);
      this.workexprience = data;
      console.log('service');

    });
  },error => {
    this.toastr.error('Your Information is not Deleted, Please try again','Error')
  });
}

btneducationEditClick(index,val6,val7, val8, val9,val10,id) {
  this.eduupdateind = index;
  this.institution=val6;
  this.degreename=val7;
  this.startyear=val8;
  this.endyear=val9;
  this.percentile=val10;
  this.eduId = id;
  console.log('Name : '+index+'   '+this.institution + this.degreename+ this.startyear+ this.endyear+ this.percentile+ this.eduId);
}

UpdateeducationClick(institution,degreename,startyear,endyear,percentile) {
  console.log('update : ' + institution + degreename + startyear+endyear+percentile);
  this.newService.UpdateEducation( this.eduId,institution,degreename,startyear,endyear,percentile).subscribe(data => {
    console.log(data);
    this.toastr.success('Your Information is Updated Sucessfully','Success');
      this.education[this.eduupdateind] = data;
      console.log('service');
    },error => {
    this.toastr.error('Your Information is not updated, Please try again','Error')
  });
}


btneducationDeleteClick(id) {
  this.eduId = id;
  console.log('Id : '+this.eduId);
}
deleteeducationClick(id){
  console.log('delete' + id);
  this.newService.DeleteEducation(id).subscribe(data => {
    console.log(data);
    console.log("jashan");

    this.toastr.success('Your Information is Deleted Sucessfully','Success');
    this.newService.fetchEducationalBackground().subscribe(data=> { console.log(data);
      this.education = data;
      console.log('service');

    });
  },error => {
    this.toastr.error('Your Information is not Deleted, Please try again','Error')
  });
}
// index,
btnskillsEditClick(index,val11,val12,id) {
  this.skillupdateind = index;
  this.skillname=val11;
  this.skilllevel=val12;
  this.skillId = id;
  console.log('Name : ' + index,' '+this.skillname + this.skilllevel+ this.skillId);
}

UpdateskillsClick(skillname,skilllevel) {
  console.log('update : ' + skillname + skilllevel);
  this.newService.Updateskills( this.skillId,skillname,skilllevel).subscribe(data => {
    console.log(data);
    this.toastr.success('Your Information is Updated Sucessfully','Success');
      this.skills[this.skillupdateind] = data;
      // [this.skillupdateind] 
      console.log('service');
    },error => {
    this.toastr.error('Your Information is not updated, Please try again','Error')
  });
}

btnskillsDeleteClick(id){
  this.skillId = id;
  console.log('Id : '+this.skillId);
}

deleteskillsClick(id){
  console.log('delete' + id);
  this.newService.Deleteskills(id).subscribe(data => {
    console.log(data);
    console.log("jashan");

    this.toastr.success('Your Information is Deleted Sucessfully','Success');
    this.newService.fetchSkills().subscribe(data=> { console.log(data);
      this.skills = data;
      console.log('service');

    });
  },error => {
    this.toastr.error('Your Information is not Deleted, Please try again','Error')
  });
}
}
