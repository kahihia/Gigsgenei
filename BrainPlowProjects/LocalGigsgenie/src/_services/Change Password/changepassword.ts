import { Router, RouterModule } from '@angular/router';

import {Injectable, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from '../http-service';
import {Globalvariables} from './../class-track-helper/globalvariables';

@Injectable()
export class ChangePasswordService {

  objGlobalvariables= new Globalvariables();
  constructor(private _http2: HttpService, private httpnoloader: Http, private router: RouterModule) {
    }


    change_password(username: any, pass: any) {
        return this._http2.post(this.objGlobalvariables.ApiUrlLocal + 'profiledetails', {'username': username, 'password': pass})
          .map((res: Response) => {
            if (res) {
              if (res.status === 201 || res.status === 200) {
    
                localStorage.setItem('loged_in', '1');
                console.log('ok 201');
                localStorage.setItem('Authorization', res.json().token);
                console.log(res);
                // asddasjasdn
                const user = {username: username, token: res.json().token};
                sessionStorage.setItem('currentUser', user.username);
                sessionStorage.setItem('UserToke', user.token);
    
                // this.nav.navigate(['/home']);
    
    
    
              } else if (res.status === 7373) {
                // this.login=true;
    
                //    this.iid= localStorage.getItem('id');
                // console.log(this.iid);
                localStorage.setItem('loged_in', '1');
                console.log('ok 200');
                console.log('responecechecker', res.json());
    
                console.log(res.json().token);
                localStorage.setItem('Authorization', res.json().token);
                // this.nav.navigate(['/home']);
    
              }
            }
          }).catch((error: any) => {
            if (error.status === 404) {
              localStorage.setItem('loged_in', '0');
              console.log(' not 1');
              return Observable.throw(new Error(error.status));
            } else if (error.status === 400) {
              localStorage.setItem('loged_in', '0');
              console.log(' not 2');
              return Observable.throw(new Error(error.status));
            } else if (error.status === 401) {
              localStorage.setItem('loged_in', '0');
              console.log(' not 3');
              console.log('ok not submited submite');
            } else {
              console.log(' not 4');
              localStorage.setItem('loged_in', '0');
              return Observable.throw(new Error(error.status));
            }
          });
      }
    }

