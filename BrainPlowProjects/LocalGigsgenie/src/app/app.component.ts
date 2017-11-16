import { Component } from '@angular/core';
import {LocalStorageService} from './../_services/local-storage.service';
import {Router} from '@angular/router';
import {JobCatagoryService} from './../_services/job-catagory.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private localStorageService: LocalStorageService, private router: Router,
  private newService: JobCatagoryService) {
    console.log('App component: ' + this.router.url);
    console.log(window.location.hostname);
    console.log(window.location.pathname);
  }
  // changeOfRoutes() {
  //   console.log(window.location.pathname);
  //   this.newService.BackButtonSetUrl(window.location.pathname);
  // }
  funcBack() {
    // console.log('navigate: ' + window.history.back());
    // this.router.navigate([this.newService.BackButtonGetUrl(window.location.pathname)]);
    window.history.back();
  }
  header() {
    if (sessionStorage.getItem('username') === null) {
      return true;
    } else { return false;
    }
  }
}
