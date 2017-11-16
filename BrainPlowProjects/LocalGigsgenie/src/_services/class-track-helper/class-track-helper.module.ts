import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassTrack} from './../../_services/class-track-helper/class-track';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ClassTrackHelperModule {
  ListTrack: any = [];
  exist = false;

  SetTrack(url, name) {    // Links Forming
    console.log('List Track Start');
    console.log(this.ListTrack);
    for (let i = 0; i < this.ListTrack.length; i++) {
      this.ListTrack.pop();
    }
    this.ListTrack = [];
    console.log(this.ListTrack);
    const objTrack = new ClassTrack();
    objTrack.Name = name;
    objTrack.Url = url;
    // console.log(objTrack);
    // this.ListTrack.push(objTrack);

    // localStorage.setItem('Track', JSON.stringify(this.ListTrack));

    if (localStorage.getItem('Track') !== null) {
      this.ListTrack = JSON.parse(localStorage.getItem('Track'));
      for (let i = 0; i < this.ListTrack.length; i++) {
        if (this.ListTrack[i].Url === objTrack.Url) {
          this.exist = false;
          this.ListTrack.splice(i, 1);
        }
      }
    }
    if (this.exist === false ) {
      this.ListTrack.push(objTrack);
    }
    localStorage.setItem('Track', JSON.stringify(this.ListTrack));
    // console.log('track end');
    console.log('List Track end');
    console.log(this.ListTrack);
  }
}
