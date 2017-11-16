// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-editgig',
//   templateUrl: './editgig.component.html',
//   styleUrls: ['./editgig.component.css']
// })
// export class EditgigComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
//

import { Component, OnInit } from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {Gigsearchterms} from '../../_services/ControllerClasses/gigsearchterms';
import {GigsRequirement} from '../../_services/ControllerClasses/gigrequirement';
import {GigsFaq}  from '../../_services/ControllerClasses/gisfaq';
@Component({
  selector: 'app-editgig',
  templateUrl: './editgig.component.html',
  styleUrls: ['./editgig.component.css']
})
export class EditgigComponent implements OnInit {

  private model: any = {description: '', fullname: ''};
  base64textString: any = [];
  uploadFile: any;
  sizeLimit: any;
  files: any;
  imgOverLay = '';
  fileList: any = [];
  ListTrack: any = [];
  ImgSrc: any = [];
  AddImagesObj = {
    Images: [],
    Description: ''
  };
  StepNo = '1';
// Step 2
  Step2Submitted = false;
  tempCatagories: any;
  drpTextCatagory = 'Please Select A Catagory';
  Searchitems: any = [];
  gigSearchterms:any = [];
  newItem = '';
  title= '';
  description = '';
  Time;
  // searchterms = '';
// Step 3
  QuestionItem: any = [];
  AnswerItem: any = [];
  gigFaq:any = [];
  question = '';
  answer = '';
  Description = '';
  // Step 4
  // mandatory = false;
  requirementsList: any = [];
  mandatoryList: any = [];
  gigRequirements:any = [];
  constructor(private newService: JobCatagoryService, private objClassTrack: ClassTrackHelperModule) {}
  onSubmit() {
    // if (this.fileList.length >= 1) {
    // console.log('Submit' + des);
    // console.log(this.base64textString);
    // this.AddImagesObj.Images = this.base64textString;
    // this.AddImagesObj.Description = des;
    // console.log(this.AddImagesObj);
    // localStorage.setItem('AddImagesObj',)
    // this.newService.AddGig(des, this.base64textString).subscribe(data => console.log(data));
    // }
  }
  ngOnInit() {

    // document.getElementById("searchtermevententer")
    //   .addEventListener("keyup", function(event) {
    //     event.preventDefault();
    //     if (event.keyCode == 13) {
    //       this.pushSearchItem();
    //     }
    //   });


    // this.objClassTrack.SetTrack('/makegigs', 'Make Gigs');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
    this.newService.fetchJobCatagories().subscribe(data => {
      this.tempCatagories = data;
      console.log(this.tempCatagories);
      for (const i of this.tempCatagories) {
        i.values = i.values.split(',');
      }
    });
  }
  goTo(id) {
    id.scrollIntoView();
  }
  // Step 1
  Step1Click(id) {
    id.scrollIntoView();
    this.StepNo = '2';
    // location.href='step2';
    // }
  }
  Step1BackClick() {
    // if (this.fileList.length >= 1) {
    // this.AddImagesObj.Images = this.base64textString;
    this.StepNo = '1';
    // }
  }
  handleUpload(data): void {
    console.log('handleUpload');
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  beforeUpload(uploadingFile): void {
    console.log('beforeUplaod');
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }



  _handleReaderLoaded(readerEvt) {
    console.log('base64');
    const binaryString = readerEvt.target.result;
    this.base64textString.push(btoa(binaryString));
  }

  onChange(event: EventTarget) {

    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.files = target.files;
    if (this.fileList.indexOf(this.files[0]) === -1) {
      console.log('filelist');
      this.fileList.push(this.files[0]);
      console.log('raeder');
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.fileList[(this.fileList.length - 1)]);
    }
    const reader1 = new FileReader();
    reader1.onload = (e: any) => {
      if (this.ImgSrc.indexOf(e.target.result) === -1) {
        this.ImgSrc.push(e.target.result);
      }
    };

    reader1.readAsDataURL(this.fileList[(this.fileList.length - 1)]);
  }
  removeItem(ind) {
    this.fileList.splice(ind, 1);
    this.ImgSrc.splice(ind, 1);
    this.base64textString.splice(ind, 1);
  }
  FuncCheckNumberOfImages() {
    if (this.fileList.length >= 3) {
      return false;
    } else {
      return true;
    }
  }
  FuncCheckIfImageUploaded() {
    if (this.fileList.length >= 1) {
      return true;
    } else {
      return false;
    }
  }
  OverLay(ind, Mynav) {
    this.imgOverLay = this.ImgSrc[ind];
    // console.log(this.imgOverLay);
    Mynav.style.height = '100%';
    // Mynav.style.he
  }
  closeNav(Mynav) {
    Mynav.style.height = '0%';

  }
  myImgClick(modal, modalImg, captionText) {
    modal.style.display = 'block';
    modalImg.src = '../../assets/icons/camera_512.png';
    captionText.innerHTML = '...';
  }
  // Step 2
  Step2Click(f, title) {
    if (f.valid && this.drpTextCatagory != 'Please Select A Catagory' && this.searchItemLength()<=0) {
      console.log(this.model);

      this.Step2Submitted = true;
      // this.title=title;
      console.log('title : ' + this.title)
      this.StepNo = '3';
    }
  }
  Step2BackClick(f) {
    this.StepNo = '2';
  }CatagoryClick(val) {
    console.log('list : ' + val);
    this.drpTextCatagory = val;
  }
  TitleChange(val) {
    this.title=val;
  }
  searchtermChange(val) {
    this.newItem = val;
  }
  pushSearchItem = function(){
    console.log(this.newItem );
    if (this.newItem !== '' && this.Searchitems.indexOf(this.newItem) === -1) {
      const obj= new Gigsearchterms();
      // obj.UserName=localStorage.getItem('username')
      obj.SearchTerm=this.newItem;
      this.Searchitems.push(this.newItem);
      this.gigSearchterms.push(obj);
      document.getElementById('searchtermevententer').focus();
      // this.newItem = '';
    }
  };
  removeSearchItem = function(index) {
    this.Searchitems.splice(index, 1);
    this.gigSearchterms.splice(index, 1);
  };
  editSearchItem(index, id) {
    console.log(this.Searchitems[index]);
    id.value = this.Searchitems[index];
    this.newItem = this.Searchitems[index];
    id.focus();
    this.removeSearchItem(index);
  }
  searchItemLength() {
    return (5 - this.Searchitems.length);
  }
  searchItemExist() {
    if (this.Searchitems.length >= 1) {
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
  // Step 3Step3BackClick
  Step3Click(f, description) {
    if (f.valid && description.length>100) {
      this.Step2Submitted = true;
      this.description=description;
      console.log('Descriptuon1 : ' + this.description);
      this.StepNo = '4';
    }
  }
  Step3BackClick(f) {
    this.StepNo = '3';
  }
  removeQuestionAnswerItem(index) {
    this.QuestionItem.splice(index, 1);
    this.AnswerItem.splice(index, 1);
    this.gigFaq.splice(index, 1);
  }
  editQuestionAnswerItem(index, que, ans) {
    que.value = this.QuestionItem[index];
    ans.value = this.AnswerItem[index];
    this.question = this.QuestionItem[index];
    this.answer = this.AnswerItem[index];
    que.focus();
    this.removeQuestionAnswerItem(index);
  }
  pushQuestionAnswerItem(que, ans) {
    this.question = que;
    this.answer = ans;
    console.log(que + '....' + ans);
    if (this.question !== '' && this.QuestionItem.indexOf(this.question) === -1 &&
      this.answer !== '' && this.AnswerItem.indexOf(this.answer) === -1) {
      const obj= new GigsFaq();
      // obj.UserName=localStorage.getItem('username');
      obj.Question=this.question;
      obj.Answer=this.answer;
      this.gigFaq.push(obj);
      this.QuestionItem.push(this.question);
      this.AnswerItem.push(this.answer);
      // this.newItem = '';
    }
  }
  DescriptionChange(des) {
    this.Description = des;
  }
  // Step 4
  Step4BackClick() {
    this.StepNo = '4';
  }
  Step4Click() {
    this.StepNo = '5';
  }
  pushReuirements (req, mand) {
    console.log(req + '....' + mand );
    if (this.requirementsList.indexOf(req) === -1 && req !== '') {
      const obj=new GigsRequirement();
      // obj.UserName=localStorage.getItem('username');
      obj.Requirement=req;
      obj.IsMandatory=mand;
      this.gigRequirements.push(obj);
      this.mandatoryList.push(mand);
      this.requirementsList.push(req);
    }
  }
  clearRequirements (ind) {
    ind.value = '';
  }
  removeRequirement (ind) {
    this.requirementsList.splice(ind, 1);
    this.gigRequirements.splice(ind, 1);
  }
  editRequirement (ind, id) {
    id.value = this.requirementsList[ind];
    this.removeRequirement(ind);
    id.focus();
  }

  // Step 5
  Step5Click() {
    console.log('Title : '+this.title);
    console.log('Descripton : ' + this.description);
    this.Time = new Date();
    this.Time = this.Time.getFullYear() + '-' + (this.Time.getMonth() + 1) + '-' +
      this.Time.getDate() + ' ' +  this.Time.getHours() + ':' + this.Time.getMinutes() + ':' + this.Time.getSeconds();
    this.newService.AddGig(this.drpTextCatagory, this.title, this.description, this.Time).subscribe(data => {
        console.log(data);
        for (let i = 0; i < this.base64textString.length; i++) {
          this.newService.AddGigImages(this.base64textString[i], data).subscribe(image => {
              console.log(image);
              if(i==0) {
                this.newService.AddGigSearchterms(this.gigSearchterms, data).subscribe(searchterms=>{
                    this.newService.AddGigFaq(this.gigFaq, data).subscribe(faqdata=>{
                      this.newService.AddGigRequirements(this.gigRequirements, data).subscribe(reqdata=>{

                      },error=>{});
                    },error=>{});
                  },
                  error=>{

                  });
              }
            },
            error => {
              console.log(error);
            });
        }
      },
      error => {
        console.log(error);
      });
    // this.StepNo = '1';
  }
  imageclick() {
    for (let i = 0; i < this.base64textString.length; i++) {
      this.newService.AddGigImages(this.base64textString[i], '1').subscribe(image => {
          console.log(image);
        },
        error => {
          console.log(error);
        });
    }
  }
}

