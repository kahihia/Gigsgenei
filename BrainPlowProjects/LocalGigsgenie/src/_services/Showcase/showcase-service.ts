import {Injectable, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from "../http-service";
import {Globalvariables} from "../class-track-helper/globalvariables";

@Injectable()
export class ShowcaseService {
  objGlobalvariables= new Globalvariables();
  constructor(private http: HttpService, private httpnoloader: Http) {
  }
  AddGig(catagory, title, Description, Time) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'gig/addgig/data.json',
      JSON.stringify({
        user: '1',
        Catagory: catagory,
        Title: title,
        Description: Description,
        Time: Time,
        Complete: false,
        Favourite: false,
      }), {headers: headers}).map((data: Response) => data.json());
  }

  AddGigImages(Image, id) {
    console.log('Id : ' + id);
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'gig/addgigimages/data.json',
      JSON.stringify({
        user: '1',
        GigId: id,
        Image: Image
      }), {headers: headers}).map((data: Response) => data.json());
  }
  AddGigPrize(minprize,maxprize,days,id) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'gig/addgigprize/data.json',
      JSON.stringify({
        user: '1',
        GigId:id,
        MinPrize:minprize,
        MaxPrize:maxprize,
        Days:days,

      }), {headers: headers}).map((data: Response) => data.json());
  }
  AddGigRequirements(obj, id) {
    for(let i=0;i<obj.length;i++) {
      obj[i].GigId=id;
    }
    console.log(obj);
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'gig/addgigrequirements/data.json',
      JSON.stringify({
        obj: obj
      }), {headers: headers}).map((data: Response) => data.json());
  }
  AddGigFaq(obj, id) {
    for(let i=0;i<obj.length;i++) {
      obj[i].GigId=id;
    }
    console.log(obj);
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'gig/addgigfaq/data.json',
      JSON.stringify({
        obj: obj
      }), {headers: headers}).map((data: Response) => data.json());
  }
  AddGigSearchterms(obj, id) {
    for(let i=0;i<obj.length;i++) {
      obj[i].GigId=id;
    }
    console.log(obj);

    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'gig/addgigsearchterms/data.json',
      JSON.stringify({
        obj: obj
      }), {headers: headers}).map((data: Response) => data.json());
  }

  fetchViewGigs() {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'gig/viewgigswithimages/').map((response: Response) => response.json());
  }
  fetchViewGigsByUserName(username) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'gig/viewgigswithimagesbyusername/'+username+'/').map((response: Response) => response.json());
  }
  fetchViewGigsbyGigId(id) {
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'gig/viewgigswitheverything/'+id+'/').map((response: Response) => response.json());
  }
  fetchJobCatagories() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'bid/jobcatagories/',{headers: headers}).map((response: Response) => response.json());
  }

}




//     // return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'expressyourself/',
//     //   {
//     //     UserName: localStorage.getItem('username'),
//     //     FullName: FullName,
//     //     Description: Description,
//     //     Resume: Resume
//     //   }).map((res: Response) => {
//     //   if (res) {
//     //     if (res.status === 200 || res.status === 201) {
//     //
//     //       const responce_data = res.json();
//     //       return [{ status: res.status, json: res }];
//     //     }
//     //   }
//     // }).catch((error: any) => {
//     //
//     //   if (error.status === 404) {
//     //     console.log('errors 404');
//     //   } else {
//     //     console.log('errors ');
//     //   }
//     //   console.log( error);
//     //   console.log(error.text);
//     //   return Observable.throw(new Error(error.status));
//     // });
//   }

