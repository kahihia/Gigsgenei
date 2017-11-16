import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JobCatagoryService} from './../../_services/job-catagory.service';
@Component({
  selector: 'app-profilesection',
  templateUrl: './profilesection.component.html',
  styleUrls: ['./profilesection.component.css']
})
export class ProfilesectionComponent implements OnInit {

  constructor(private router: Router, private newService: JobCatagoryService) {}
  active1 = localStorage.getItem('active1');
  active2 = localStorage.getItem('active2');
  active3 = localStorage.getItem('active3');
  active4 = localStorage.getItem('active4');
  active5 = localStorage.getItem('active5');
  active6 = localStorage.getItem('active6');
  active7 = localStorage.getItem('active7');
  contractor: any= [];
  ngOnInit() {
    // this.activeClick(this.active1, this.active2, this.active3, this.active4, this.active5, this.active6, this.active7);
    this.newService.fetchContarctor().subscribe(data =>
      (this.contractor = data, console.log(data))); }
  setActives() {
    this.active1 = localStorage.getItem('active1');
    this.active2 = localStorage.getItem('active2');
    this.active3 = localStorage.getItem('active3');
    this.active4 = localStorage.getItem('active4');
    this.active5 = localStorage.getItem('active5');
    this.active6 = localStorage.getItem('active6');
    this.active7 = localStorage.getItem('active7');
  }
  activeClick(val1, val2, val3, val4, val5, val6, val7) {
    localStorage.setItem('active1', val1);
    localStorage.setItem('active2', val2);
    localStorage.setItem('active3', val3);
    localStorage.setItem('active4', val4);
    localStorage.setItem('active5', val5);
    localStorage.setItem('active6', val6);
    localStorage.setItem('active7', val7);
    this.setActives();
    if (this.active1 === 'active') {
      this.router.navigate(['/profile']);
    }
    if (this.active2 === 'active') {
      this.router.navigate(['/profile']);
    }
    if (this.active3 === 'active') {
      this.router.navigate(['/editresume']);
    }
    if (this.active4 === 'active') {
      this.router.navigate(['/profiledetails']);
    }
    if (this.active5 === 'active') {
      this.router.navigate(['/bookmark']);
    }
    if (this.active6 === 'active') {
      this.router.navigate(['/appliedjob']);
    }
    if (this.active7 === 'active') {
      this.router.navigate(['/deleteaccount']);
    }
  }
}
