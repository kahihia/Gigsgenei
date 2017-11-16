import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LocalStorageService} from './../../_services/local-storage.service';
import {ProfileService} from './../../_services/Profile/profile-service';
import {Router} from '@angular/router';
import {AlertserviceService} from './../../_services/alertservice.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {LoginService} from './../../_services/login.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private toastr: ToastsManager,private vcr: ViewContainerRef,private localStorageService: LocalStorageService, private newService: ProfileService,
              private http: Router, private alertService: AlertserviceService, private objLoginService: LoginService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.clearLocalSessionStorage();
    }
  btnLoginClick(name, password) {
    this.objLoginService.loged_in(name,password).subscribe(  data => {
        console.log(data);
      },
      error => {
        this.toastr.error(' Sorry Login Failed. Either Username or Password is incorrect', 'Error!');
    });
    }
    clearLocalSessionStorage() {
    sessionStorage.clear();
    localStorage.clear();
    }
}










// this.newService.checkLogin(name, password).subscribe(data => {
//   this.userdata = data;
//   // console.log(this.userdata.UserType);
//   if (this.userdata !== false) {
//     localStorage.removeItem('Track');
//     console.log('Sign IN');
//     console.log(JSON.parse(localStorage.getItem('Track')));
//     for (const i of this.userdata) {
//       this.localStorageService.add('username', i.UserName);
//       this.localStorageService.add('usertype', i.UserType);
//       this.boolusertype = i.UserType;
//       // console.log('i: ' + i.UserType);
//       }
//     this.boolchkLogin = false;
//     if (this.boolusertype === 'fl') {
//       this.newService.fetchFirstTimeLogin(name).subscribe(data1 => {
//         // console.log(data1[0].Firsttime);
//         if (data1[0].Firsttime === true) {
//           this.http.navigate(['/home']);
//         } else {this.http.navigate(['/joblist']);
//         }
//       });
//       }
//     if (this.boolusertype === 'hfw') {
//       this.http.navigate(['/post']);
//     }
//   }else {
//     this.alertService.error('Login Information You Entered Is Incorrect');
//     console.log('invalid Login');
//     // this.boolchkLogin = true;
//     document.getElementById('alertId').style.display = 'block';
//   }
//
// },
// error => {
//   this.alertService.error('Server not Responding');
//   document.getElementById('alertId').style.display = 'block';
// });


// TokenAuthentication(username,password) {
//   this.objLoginService.loged_in(username,password).subscribe(
//     data => {
//       // this.profileInfo(JSON.parse(localStorage.getItem('currentUser')).username);
//       console.log(data);
//       localStorage.setItem('login', 'false');
//
//     },
//     error => {
//       console.log(error);
//       // this.alertService.error(error);
//       this.signin = false;
//     });
//
// }


