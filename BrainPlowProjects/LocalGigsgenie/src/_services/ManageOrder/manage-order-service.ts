import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from "../http-service";
import {Globalvariables} from "../class-track-helper/globalvariables";

@Injectable()
export class ManageOrderService {
  objGlobalvariables= new Globalvariables();
  constructor(private http: HttpService, private httpnoloader: Http) {
  }
  AddGigOrder(GigId,RecieverId,Description,Prize,Days) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'order/addgigorder/data.json',
      JSON.stringify({
        Sender: '1',
        Reciever: RecieverId,
        GigId: GigId,
        Description: Description,
        Prize: Prize,
        Days: Days,
        Accepted: false,
        Completed:false,
        Deleted:false,
      }), {headers: headers}).map((data: Response) => data.json());
  }
  fetchViewGigsWithImageTitle() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'order/getgigwithimageandtitle/', {headers: headers}).map((response: Response) => response.json());
  }

}

