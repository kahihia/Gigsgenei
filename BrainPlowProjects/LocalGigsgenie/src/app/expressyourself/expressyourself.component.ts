import { Component, OnInit } from '@angular/core';
import {ProfileService} from './../../_services/Profile/profile-service';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
@Component({
  selector: 'app-expressyourself',
  templateUrl: './expressyourself.component.html',
  styleUrls: ['./expressyourself.component.css']
})
export class ExpressyourselfComponent implements OnInit {

  private model: any = {description: '', fullname: ''};
  base64textString = '';
  uploadFile: any;
  sizeLimit: any;
  files: any;
  file: any;
  ListTrack: any = [];
  ImgSrc = '';
  ShowHideAlert = false;
  UserName = '';
  constructor(private newService: ProfileService, private objClassTrack: ClassTrackHelperModule) {}
  onSubmit(val1, val2) {
    console.log('submitted');
    console.log(val1);
    console.log(val2);
    if (!this.FuncCheckNumberOfImages()) {
    this.newService.AddExpressYourself(val1, val2, this.base64textString).subscribe(data => {console.log(data);
      this.ShowHideAlert = true;
      window.scroll(0, 0); });
    }
  }
  ngOnInit() {
    // this.objClassTrack.SetTrack('/expressyourself', 'Express Yourself');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
    this.UserName = localStorage.getItem('username');
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
    this.base64textString = btoa(binaryString);
    // console.log(this.base64textString);
  }

  onChange(event: EventTarget) {

    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.files = target.files;
    this.file = this.files[0];
    console.log(this.files);

    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.file);
    const reader1 = new FileReader();
    reader1.onload = (e: any) => {
      this.ImgSrc = (e.target.result);
    };
    console.log('dsd');
    console.log(this.ImgSrc);
    reader1.readAsDataURL(this.file);
  }
  removeItem(ind) {
    this.base64textString = '';
    this.ImgSrc = '';
  }
  OverLay(Mynav) {
    console.log(this.ImgSrc);
    Mynav.style.height = '100%';
    // Mynav.style.he
  }
  closeNav(Mynav) {
    Mynav.style.height = '0%';

  }
  FuncCheckNumberOfImages() {
    // console.log(this.base64textString);
    if (this.base64textString === '') {
      return true;
    } else {
      return false;
    }
  }
}
