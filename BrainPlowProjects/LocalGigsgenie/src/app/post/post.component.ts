import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {skillsneeded} from './../../_services/ControllerClasses/skillsneeded'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  items: any = [];
  SkillsNeededJson: any = [];
  newItem = '';
  drpTextCatagory = 'Please Select A Catagory';
  Autoskillname = '';
  ShowHideDanger = false;
  jobTitle = '';
  description = '';
  lstExperienceLevel = ['Entry Level', 'Mid Level', 'Mid-Senior Level', 'Top Level'];
  txtExperienceLevel = 'Choose Exprience Level';
  txtNegotiation = 'No';
  lstNegotiation = ['Yes', 'No']
  ckhJObType = '';
  ckhPostType = '';
  skillsneeded = '';
  Days = '';
  Budget='';
  ShowHideAlert = false;
  checkboxValue = false;
  formsumitted = false;
  filePdf = 'default';
  ListTrack: any = [];
  // Job Load Template
  start = 0;
  ListLoadedJobs: any = [];
  drpLoadPreviusJob = 'Load From Previous Gigs';
  obj: {
    id: string;
    catagory: string;
    values: string;
  };
  temp: any = [];
  // var d = new MyRichObject();
  constructor(private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: JobCatagoryService, private objClassTrack: ClassTrackHelperModule) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    // this.objClassTrack.SetTrack('/post', 'Post Job');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
    this.newService.fetchJobCatagories().subscribe(data => {
      this.temp = data;
      console.log(this.temp);
      this.LoadTemplate();
    }); // , console.log(this.jobcatagories)));
    }
    reset() {
      this.newItem = '';
      this.drpTextCatagory = 'Please Select A Catagory';
      // this.Autoskillname = '';
      this.jobTitle = '';
      this.formsumitted = false;
      this.ShowHideDanger = false;
      this.description = '';
      this.txtExperienceLevel = 'Choose Exprience Level';
      this.ckhJObType = '';
      this.ckhPostType = '';
      this.skillsneeded = '';
      // this.ShowHideAlert = false;
      this.checkboxValue = false;
      this.Days = '';
      while (this.items.length > 0) {
        this.items.pop();
        this.SkillsNeededJson.pop();
      }

    }
  funcLoadTemplate(index) {
    this.drpLoadPreviusJob = this.ListLoadedJobs[index].JobName;
    this.drpTextCatagory = this.ListLoadedJobs[index].JobCatagory;
    document.getElementsByTagName('input')[3].value = this.ListLoadedJobs[index].JobName;
    this.jobTitle = this.ListLoadedJobs[index].JobName;
    document.getElementsByTagName('textarea')[0].value = this.ListLoadedJobs[index].Description;
    this.description = this.ListLoadedJobs[index].Description;
    document.getElementsByTagName('input')[4].value = this.ListLoadedJobs[index].CompletionTime;
    this.Days = this.ListLoadedJobs[index].CompletionTime;
    this.txtExperienceLevel = this.ListLoadedJobs[index].ExprienceLevel;
    this.Budget = this.ListLoadedJobs[index].Budget;
    this.items = this.ListLoadedJobs[index].SkillsNeeded.split(',');
    this.items.pop();
    this.consolevalues();
  }
  clickListLoadTemplate() {
    this.start += 10;
    this.LoadTemplate();
  }
  LoadTemplate() {
    this.newService.fetchLoadPostJob(this.start).subscribe(data => {
        console.log(data);
        this.ListLoadedJobs = data;
      },
      error => {
        console.log(error);
      });
  }
  consolevalues() {
    console.log(this.drpTextCatagory);
    console.log(  this.ckhJObType);
    console.log(this.items);
    console.log( this.jobTitle);
    console.log( this.description);
    console.log(this.txtExperienceLevel);
    console.log(this.ckhPostType);
    }
  _btnSubmitClick( days, budget) {
    this.formsumitted = true;
    if (this.AllErrorCheck(days,budget)) {
      for (const item of this.items) {
        this.skillsneeded += item + ',';
        let objskillsneeded = new skillsneeded();
        objskillsneeded.SkillName = item;
        this.SkillsNeededJson.push(objskillsneeded);
      }
      let negotiation=false;
      if(this.txtNegotiation==='Yes') {
        negotiation = true;
      }
      this.newService.AddPostJob(localStorage.getItem('username'), this.drpTextCatagory, this.jobTitle, this.description, this.filePdf,
        this.skillsneeded, this.txtExperienceLevel, days, '0', this.ckhJObType,
        this.ckhPostType,budget,negotiation,this.SkillsNeededJson).subscribe(data => {
          // console.log(data.status);
          console.log('reset');
          this.ShowHideAlert = true;
          this.ShowHideDanger = false;
          window.scroll(0, 0);
          this.toastr.success('Your Job Has Been Successfully Posted!', 'Successfull!');
          // f.reset();
          this.reset();
        },
        error => {
          // this.ShowHideDanger = true;
          console.log(error.status);
          window.scroll(0, 0);
          while (this.items.length > 0) {
            this.items.pop();
            this.SkillsNeededJson.pop();
          }
          this.toastr.error('Your Job not Posted due to some errors! Please Try again.', 'Error!');
        }
      );
    } else {
      window.scroll(0, 0);
      console.log('else');
      this.ShowHideDanger = true;
      this.ShowHideAlert = false;
    }
    // console.log('cat : ' + this.drpTextCatagory);
    // console.log('chkJOb Type : ' + this.ckhJObType);
    // console.log('Exper : ' + this.txtExperienceLevel);
    // console.log('title : ' + this.jobTitle);
    // console.log('des : ' + this.description);
    // console.log('days : ' + days);
    // console.log('Post Type : ' + this.ckhPostType);
    // console.log('skills : ' + this.skillsneeded);
  }
  chkJObTypeClick(val) {
    console.log('fun :' + val.value);
    this.ckhJObType = val.value;
  }
  chkPostTypeClick(val) {
    this.ckhPostType = val;
    console.log(this.ckhPostType);
  }
  skillnameChange(val) {
    console.log('key :' + val);
    this.newService.fetchSkillName(val).subscribe( data => this.Autoskillname = data);
  }
  list(val) {
    console.log('list : ' + val);
    this.drpTextCatagory = val;
  }
  listClick(val) {
    console.log('Val : ' + val);
    this.txtExperienceLevel = val;
  }
  listnegotitionClick(val) {
    this.txtNegotiation = val;
  }
  TermsClick() {
    this.checkboxValue = !this.checkboxValue;
    console.log(this.checkboxValue);
  }
  pushItem = function(){
    if (this.newItem !== '' && this.items.indexOf(this.newItem) === -1) {
      this.items.push(this.newItem);
      this.newItem = '';
    }
  };
  removeItem = function(index) {
    this.items.splice(index, 1);
  };
  DaysClick(days,id) {
    this.Days=days;
    id.value=days;
  }
  BudgetClick(budget,id) {
    this.Budget=budget;
    id.value=budget;
  }
  AllErrorCheck(days,budget) {
    if ( this.ErrorchkJobTitle() || this.ErrorchkDescription() || this.ErrorchkdrpTextCatagory() ||
      this.ErrorchkdrpJobPeriod(days) ||this.Errorchkbudget(budget) || this.ErrorchktxtExperienceLevel() || this.ErrorchkPostType() || this.ErrorchkPublicPrivate() ||
      this.ErrorchkSkillNames() ) {
      return false;
    } else {
      return true;
    }
  }
  ErrorchkJobTitle() {
    if (this.jobTitle === '') {
      return true;
    } else {
      return false;
    }
  }
  ErrorchkDescription() {
    if (this.description === '') {
      return true;
    } else {
      return false;
    }
  }
  ErrorchkdrpTextCatagory() {
    if (this.drpTextCatagory === 'Please Select A Catagory') {
      return true;
    } else {
      return false;
    }
  }
  ErrorchkdrpJobPeriod(val) {
    // console.log(days);
    if (val === '') {
      return true;
    }
    if (parseInt(val, 10 ) < 0) {
      return true;
    } else {
      return false;
    }
  }
  Errorchkbudget(val) {
    if (val=== '') {
      return true;
    }
    if (parseInt(val, 10 ) < 0) {
      return true;
    } else {
      return false;
    }
  }
    ErrorchktxtExperienceLevel() {
    if (this.txtExperienceLevel === 'Choose Exprience Level') {
      return true;
    } else {
      return false;
    }
  }
  ErrorchkPostType() {
    if (this.ckhPostType === '') {
      return true;
    } else {
      return false;
    }
  }
  ErrorchkPublicPrivate() {
    if (this.ckhJObType === '') {
      return true;
    } else {
      return false;
    }
  }
  ErrorchkSkillNames() {
    if (this.items.length < 1) {
      return true;
    } else {
      return false;
    }
  }
  ShowHideDangerClick () {
    this.ShowHideDanger = false;
  }
  ShowHideAlertClick() {
    this.ShowHideAlert = false;
  }
}
