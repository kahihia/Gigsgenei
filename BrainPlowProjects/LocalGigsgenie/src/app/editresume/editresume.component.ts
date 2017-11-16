import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {Language} from './../../_services/class-track-helper/language';
@Component({
  selector: 'app-editresume',
  templateUrl: './editresume.component.html',
  styleUrls: ['./editresume.component.css']
})
export class EditresumeComponent implements OnInit {

  constructor(private newService: JobCatagoryService, private router: Router, private objClassTrack: ClassTrackHelperModule) {}
  ListTrack: any = [];
  private model: any = {description: '', fullname: ''};
  rating = '0';
  lstLanguage: any = [];
  lngTemp: any = []; // To check Language already added
  ngOnInit() {
    this.lstLanguage.splice(0 , 1);
    // this.objClassTrack.SetTrack('/editresume', 'Edit Resume');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
  }
  onSubmitExpressYourself(val1, val2) {
    console.log(val1 + ' :...: ' + val2);
  }
  onSubmitWorkExprience(val1, val2, val3, val4, val5) {
    console.log(val1 + ' :...: ' + val2 + ' :...: ' + val3 + ' :...: ' + val4 + ' :...: ' +  val5);
  }
  onSubmitEducationalInfo(val1, val2, val3, val4, val5) {
    console.log(val1 + ' :...: ' + val2 + ' :...: ' + val3 + ' :...: ' + val4 + ' :...: ' +  val5);
  }
  RatingClick(rating) {
    this.rating = rating;
    console.log(this.rating);
  }
  PushLanguage(language) {
    console.log(language);
    console.log(this.rating);
    if (language !== '' && this.rating !== '0') {
      const objLanguage = new Language();
      objLanguage.Language = language;
      objLanguage.Rating = this.rating;
      // To check Language already added
      console.log(objLanguage);
      // this.lngTemp = 'Language:' + language + ' , Rating: ' + this.rating + '/10';
       if (this.lngTemp.indexOf(objLanguage.Language) === -1) {
        console.log(this.lstLanguage.indexOf(objLanguage));
        this.lstLanguage.push(objLanguage);
         this.lngTemp.push(language);
         console.log(this.lstLanguage);
       }
    }
    console.log('PushLanguage');
  }
  RemoveLanguage(index) {
    this.lstLanguage.splice(index, 1);
  }
}
