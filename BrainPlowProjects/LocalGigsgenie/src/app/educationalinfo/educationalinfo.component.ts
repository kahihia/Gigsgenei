import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProfileService} from './../../_services/Profile/profile-service';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Education} from './../../_services/ControllerClasses/education';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-educationalinfo',
  templateUrl: './educationalinfo.component.html',
  styleUrls: ['./educationalinfo.component.css']
})
export class EducationalinfoComponent implements OnInit {


  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
  ];


  minDateStart = new Date(1900, 0, 1);
  maxDateStart = new Date(2018, 0, 1);

  minDateEnd = new Date(1900, 0, 1);
  maxDateEnd = new Date(2018, 0, 1);


  private model: any = {institute: '', degree: '', percentile: '',startdate:'',enddate:'',myData:''};

  constructor(private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: ProfileService, private objClassTrack: ClassTrackHelperModule,
  private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.ResetDatesDefault();
    }
  insName = ['danish', 'ali'];
  degreename = '';
  ShowHideAlert = false;
  UserName = '';
  file = '';
  fs;
  step = -1;
  formSubmitted = false;// Because error shown when form submitted successfully
  AddUpdateButtonText = 'Add Education';
  educationObjList: any = [];
  setStep(ind) {
    this.step = ind;
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
  PushEducation(institute1, degree1, startdate1, enddate1, percentile1,form) {
    let educationobj= new Education();
    educationobj.Institution = institute1;
    educationobj.DegreeName = degree1;

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
    educationobj.StartYear = startdate.getFullYear()+'-'+startmonthformated+'-'+startdayformated;
    educationobj.EndYear = enddate.getFullYear()+'-'+endmonthformated+'-'+enddayformated;

    educationobj.Percentile = percentile1;
    // educationobj.UserName = this.UserName;
    this.educationObjList.unshift(educationobj);
    form.reset();
    this.formSubmitted = false;// Because error shown when form submitted successfully
    this.step = -1;
    this.ResetDatesDefault();
    window.scroll(0,0);
    this.toastr.success(this.UserName +' Your Educational Information about "'+institute1+'" has been added to list', 'Successfull!');
    this.AddUpdateButtonText = 'Add Education';
    // this.newService.AddEducation(institute1, degree1, startdate1, enddate1, percentile1).subscribe(data => {
    //   console.log(data);
    //   this.ShowHideAlert = true;
    //   window.scroll(0, 0);
    // });
  }

  instituteChange(val) {
    this.ShowHideAlert = false;
    console.log('key :' + val);
    // this.newService.fetchInstituteNames(val).subscribe(data => {
    //   this.insName = data;
    // }, error => {
    //   console.log(error);
    // });
    // console.log('data Auto Complete'+this.insName);
  }

  degreeChange(val) {
    this.ShowHideAlert = false;
    console.log('key :' + val);
    this.newService.fetchDegreeName().subscribe(data => {this.degreename = data;
    console.log(data);
    },
    error => {
      console.log(error);
    });
    // console.log('data Auto Complete'+this.insName);
  }

  ngOnInit() {
    console.log(this.router.url);
    // this.readTextFile('https://docs.zoho.com/file/04h6f9702fb17feac40c7890ed9786cd09c8a');
    // this.objClassTrack.SetTrack('/educationalinfo', 'Educational Info');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
    this.UserName = localStorage.getItem('username');
  }

  readTextFile(file) {
    const rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          const allText = rawFile.responseText;
          console.log(allText);
        }
      }
    };
    rawFile.send(null);
  }
  DeleteallEducationalInfo() {
    this.educationObjList.splice(0,this.educationObjList.length);
    this.toastr.success(this.UserName + ' All Information you have entered before is Deleted', 'Successfull!');
    }
  UpdateEducationalInfo() {
    this.newService.AddEducation(this.educationObjList).subscribe(data => {
      console.log(data);
      // this.educationObjList.splice(0,this.educationObjList.length);
      this.ShowHideAlert = true;
      window.scroll(0, 0);
      this.toastr.success(this.UserName + ' Your Educational Information has been Successfully Added to Your Profile', 'Successfull!');
      },
      error=> {
        this.toastr.error(this.UserName + ' Your Educational Information Cannot be Added to Database Due to Some Errors', 'Error!');
      });
  }
  EditEducationObj(ind) {
    this.AddUpdateButtonText = 'Update Education';
    this.model.institute = this.educationObjList[ind].Institution;
    this.model.degree = this.educationObjList[ind].DegreeName;
    // this.model.startdate = this.educationObjList[ind].startdate;
    // this.model.enddate = this.educationObjList[ind].enddate;
    this.model.percentile = this.educationObjList[ind].Percentile;
    this.educationObjList.splice(ind,1) ;
    this.step = 0;
    window.scroll(0,0);
  }
  DeleteEducationObj(ind) {
    this.educationObjList.splice(ind,1) ;
    this.toastr.success(this.UserName + ' Your Educational Information about "'+this.educationObjList[ind].Institution+'" has been deleted from list', 'Successfull!');
  }
  cancelClickAddEducation(form) {
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
}
