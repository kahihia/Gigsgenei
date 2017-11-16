import {Injectable, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from '../http-service';
import {Globalvariables} from './../class-track-helper/globalvariables';

@Injectable()
export class HomePageService {

  Description: any;


  objGlobalvariables= new Globalvariables();
  constructor(private http: HttpService, private httpnoloader: Http) {
    }

  getHomeDescription() {
      
        return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'admin1/addhomepagedescription/')
        .map((response: Response) => response.json());
      }

  UpdateHomeDescription(description){

    const headers = new Headers();
    // headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.objGlobalvariables.ApiUrlLocal + 'admin1/addhomepagedescription/',
    JSON.stringify({
      user: '1',
      description:description,  
    }), {headers: headers}).map((data: Response) => data.json());



    

  }
    
}


