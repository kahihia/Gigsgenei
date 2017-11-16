
import {Injectable, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from '../http-service';
import {Globalvariables} from './../class-track-helper/globalvariables';

@Injectable()
export class TestService {

  objGlobalvariables= new Globalvariables();
  constructor(private http: HttpService, private httpnoloader: Http) {
    }


AddTestCategory(catagory){
  const headers = new Headers();
      // headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
      headers.append('Content-Type', 'application/json');
  return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'admin1/addtest/',
    JSON.stringify({
      user: '1',
      Catagory:catagory,
   
    }), {headers: headers}).map((data: Response) => data.json());

}

fetchtestcategories() {

  return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'admin1/addtest/').map((response: Response) => response.json());
}

Updatetestcategories(id,catagory)
{
  const headers = new Headers();
  headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
  headers.append('Content-Type', 'application/json');
  return this.http.put(this.objGlobalvariables.ApiUrlLocal + 'admin1/updatetest/' + id,
  JSON.stringify({
    user: '1',
    Catagory:catagory, 
  }), 
  {headers: headers}).map((data: Response) => data.json());
}

deletetestcategories(id) {
  const headers = new Headers();
  headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
  headers.append('Content-Type', 'application/json');
  return this.http.delete(this.objGlobalvariables.ApiUrlLocal + 'admin1/updatetest/'+ id,{headers: headers}).map((response: Response) => response.json());
}


// Updatetestcategories(id) {
//   const headers = new Headers();
//   headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
//   headers.append('Content-Type', 'application/json');
//   return this.http.put(this.objGlobalvariables.ApiUrlLocal + 'admin1/updatetest/'+ id,).map((response: Response) => response.json());
// }


AddTestQuestions(catagory,question,A,B,C,D,Answer){
  const headers = new Headers();
      // headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
      headers.append('Content-Type', 'application/json');
  return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'admin1/addtestquestions/', 
    JSON.stringify({
      user: '1',
      Catagory:catagory,
      Question: question,
      A: A,
      B: B,
      C: C,
      D: D,
      Answer:Answer
   
    }), {headers: headers}).map((data: Response) => data.json());

}


}
