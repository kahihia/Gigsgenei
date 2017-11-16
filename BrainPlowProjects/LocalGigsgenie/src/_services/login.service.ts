import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import {HttpService} from './http-service';
import {Globalvariables} from "./class-track-helper/globalvariables";


@Injectable()
export class LoginService {
  objGlobalvariables= new Globalvariables();
  constructor(private http: Http, private _http2: HttpService, private _nav: Router) {
  }
  loged_in(username: any, pass: any) {

    return this._http2.post(this.objGlobalvariables.ApiUrlLocal + 'login/' , {'username': username, 'password': pass})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {

            localStorage.setItem('loged_in', '1');
            console.log('ok 201');
            localStorage.setItem('Authorization', res.json().token);
            console.log(res);

            const user = { username: username, token: res.json().token};
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('UserToken', user.token);
            // sessionStorage.setItem('userid',res.id);

            this._nav.navigate(['/home']);
            //    this.iid= localStorage.getItem('id');
            //
            //
            //    this.Admins_id =  this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
            //
            // console.log("ok 201",this.Admins_id);
            // this.is_admin( this.Admins_id).subscribe();


          } else if (res.status === 7373) {
            // this.login=true;

            //    this.iid= localStorage.getItem('id');
            // console.log(this.iid);
            localStorage.setItem('loged_in', '1');
            console.log('ok 200');
            console.log('responecechecker', res.json());

            console.log(res.json().token);
            localStorage.setItem('Authorization', res.json().token);
            // this.Admins_id =  this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
            // console.log("ok 200",this.Admins_id);

            // this.is_admin( this.Admins_id).subscribe();
            this._nav.navigate(['/home']);


          }
        }
      }).catch((error: any) => {
        if (error.status === 404) {
          localStorage.setItem('loged_in', '0');
          console.log(' not 1');
          //   this._nav.navigate(['/login']);
          return Observable.throw(new Error(error.status));
        } else if (error.status === 400) {
          localStorage.setItem('loged_in', '0');
          console.log(' not 2');
          // this._nav.navigate(['/login']);
          return Observable.throw(new Error(error.status));
        } else if (error.status === 401) {
          localStorage.setItem('loged_in', '0');
          console.log(' not 3');
          console.log('ok not submited submite');
          //   this._nav.navigate(['/login']);
        } else {
          console.log(' not 4');
          localStorage.setItem('loged_in', '0');
          // this._nav.navigate(['/login']);
          return Observable.throw(new Error(error.status));
        }
      });
  }
  After_Signup_login(username: any, pass: any) {

    return this._http2.post(this.objGlobalvariables.ApiUrlLocal + 'login/' , {'username': username, 'password': pass})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {

            localStorage.setItem('loged_in', '1');
            console.log('ok 201');
            localStorage.setItem('Authorization', res.json().token);
            console.log(res);

            const user = { username: username, token: res.json().token};
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('UserToken', user.token);

            this._nav.navigate(['/educationalinfo']);
            //    this.iid= localStorage.getItem('id');
            //
            //
            //    this.Admins_id =  this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
            //
            // console.log("ok 201",this.Admins_id);
            // this.is_admin( this.Admins_id).subscribe();


          } else if (res.status === 7373) {
            // this.login=true;

            //    this.iid= localStorage.getItem('id');
            // console.log(this.iid);
            localStorage.setItem('loged_in', '1');
            console.log('ok 200');
            console.log('responecechecker', res.json());

            console.log(res.json().token);
            localStorage.setItem('Authorization', res.json().token);
            // this.Admins_id =  this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
            // console.log("ok 200",this.Admins_id);

            // this.is_admin( this.Admins_id).subscribe();
            this._nav.navigate(['/home']);


          }
        }
      }).catch((error: any) => {
        if (error.status === 404) {
          localStorage.setItem('loged_in', '0');
          console.log(' not 1');
          //   this._nav.navigate(['/login']);
          return Observable.throw(new Error(error.status));
        } else if (error.status === 400) {
          localStorage.setItem('loged_in', '0');
          console.log(' not 2');
          // this._nav.navigate(['/login']);
          return Observable.throw(new Error(error.status));
        } else if (error.status === 401) {
          localStorage.setItem('loged_in', '0');
          console.log(' not 3');
          console.log('ok not submited submite');
          //   this._nav.navigate(['/login']);
        } else {
          console.log(' not 4');
          localStorage.setItem('loged_in', '0');
          // this._nav.navigate(['/login']);
          return Observable.throw(new Error(error.status));
        }
      });
  }
}
