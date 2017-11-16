import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProfileService} from './../../_services/Profile/profile-service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {WorkExprience} from './../../_services/ControllerClasses/workexprience';

@Component({
  selector: 'app-workexperience',
  templateUrl: './workexperience.component.html',
  styleUrls: ['./workexperience.component.css']
})
export class WorkexperienceComponent implements OnInit {
  public model: any = {company_name: '', designation: '', description: '', startdate: '', enddate: ''};
  constructor(private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: ProfileService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.ResetDatesDefault();
  }
  Autodesignation= '';
  Autocompanyname= '';
  ShowHideAlert = false;
  UserName = '';
  minDateStart = new Date(1900, 0, 1);
  maxDateStart = new Date(2018, 0, 1);

  minDateEnd = new Date(1900, 0, 1);
  maxDateEnd = new Date(2018, 0, 1);
  workexprienceObjList: any = [];
  formSubmitted = false;// Because error shown when form submitted successfully
  AddUpdateButtonText = 'Add Work Exprience';
  step = -1;
  setStep(ind) {
    this.step = ind;
  }

  // onSubmit(val1, val2, val3, val4, val5) {
  //   this.newService.AddWorkExperience(val1, val2, val3, val4, val5).subscribe(data => {console.log(data);
  //     this.ShowHideAlert = true;
  //     window.scroll(0, 0); });
  // }
  ngOnInit() {
    this.UserName = localStorage.getItem('username');
  }
  ResetDatesDefault() {
    let date= new Date();
    date.setFullYear(date.getFullYear()+5);
    this.maxDateStart = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    date.setFullYear(date.getFullYear()-105);
    this.minDateStart = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    date.setFullYear(date.getFullYear()+105);
    this.maxDateEnd = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    date.setFullYear(date.getFullYear()-105);
    this.minDateEnd= new Date(date.getFullYear(),date.getMonth(),date.getDate());
  }
  FormSubmitted() { // Because error shown when form submitted successfully
    this.formSubmitted = true;
  }

  PushWorkExprience(companyname, designation, startdate1, enddate1, description,form) {
    let workexprienceobj= new WorkExprience();
    workexprienceobj.CompanyName= companyname;
    workexprienceobj.Designation = designation;

    let startdate = new Date(startdate1);
    let enddate = new Date(enddate1);

    let startdayformated=startdate.getDate().toString();
    let startmonthformated=(startdate.getMonth()+1).toString();
    if(startdate.getDate()<10) {
      startdayformated = '0'+startdate.getDate();
    }
    if(startdate.getMonth()<9) {
      startmonthformated= '0'+(startdate.getMonth()+1);
    }

    let enddayformated=startdate.getDate().toString();
    let endmonthformated=(startdate.getMonth()+1).toString();
    if(enddate.getDate()<10) {
      enddayformated = '0'+startdate.getDate();
    }
    if(enddate.getMonth()<9) {
      endmonthformated= '0'+(startdate.getMonth()+1);
    }
    workexprienceobj.StartYear = startdate.getFullYear()+'-'+startmonthformated+'-'+startdayformated;
    workexprienceobj.EndYear = enddate.getFullYear()+'-'+endmonthformated+'-'+enddayformated;
    workexprienceobj.Description = description;
    // workexprienceobj.UserName = this.UserName;
    this.workexprienceObjList.push(workexprienceobj);
    console.log('Push Work Exprience');
    console.log(this.workexprienceObjList);
    form.reset();
    this.model.description = '';
    this.formSubmitted = false;// Because error shown when form submitted successfully
    this.ResetDatesDefault();
    this.step = -1;
    this.toastr.info(this.UserName +' Your Educational Information about "'+companyname+'" has been added to list', 'Successfull!');
    this.AddUpdateButtonText = 'Add Work Exprience';
    window.scroll(0,0);
  }
  DeleteallWorkExprienceInfo() {
    this.workexprienceObjList.splice(0,this.workexprienceObjList.length);
    this.toastr.info(this.UserName + ' All Information you have entered before is Deleted', 'Successfull!');
  }
  UpdateWorkExprienceInfo() {
    console.log(this.workexprienceObjList);
    this.newService.AddWorkExperience(this.workexprienceObjList).subscribe(data => {
      console.log(data);
      this.ShowHideAlert = true;
      window.scroll(0, 0);
      // this.workexprienceObjList.splice(0,this.workexprienceObjList.length);
        this.toastr.success(this.UserName + ' Your Work Exprience has been Successfully Added to Your Profile', 'Successfull!');
      },
      error=> {
        this.toastr.error(this.UserName + ' Your Work Exprience  Cannot be Added to Database Due to Some Errors', 'Error!');
      });
  }
  EditWorkExprienceObj(ind) {
    this.AddUpdateButtonText = 'Update Work Exprience';
    this.model.company_name = this.workexprienceObjList[ind].CompanyName;
    this.model.designation = this.workexprienceObjList[ind].Designation;
    this.model.description = this.workexprienceObjList[ind].Description;
    this.workexprienceObjList.splice(ind,1);
    this.step = 0;
    window.scroll(0,0);
  }
  DeleteWorkExprienceObj(ind) {
    this.workexprienceObjList.splice(ind,1) ;
    this.toastr.info(this.UserName + ' Your Educational Information about "'+this.workexprienceObjList[ind].CompanyName+'" has been deleted from list', 'Successfull!');
  }
  cancelClickAddWorkExperience(form) {
    form.reset();
    this.formSubmitted = false;// Because error shown when form submitted successfully
    this.step = -1;
    this.ResetDatesDefault();
    window.scroll(0,0);
  }

  onChangeStartdate(event) {
    console.log(event.target.value);
    let date=event.target.value;
    this.minDateEnd=new Date(date.getFullYear(),date.getMonth(),date.getDate());
  }
  onChangeEnddate(event) {
    console.log(event.target.value);
    let date=event.target.value;
    this.maxDateStart = new Date(date.getFullYear(),date.getMonth(),date.getDate());
  }

  companynameChange(val) {
    this.ShowHideAlert = false;
    this.newService.fetchCompanyName().subscribe(data => this.Autocompanyname = data);
    }

  designationChange(val){
    this.ShowHideAlert = false;
    this.newService.fetchDesignation().subscribe(data => this.Autodesignation = data);
    }

}
