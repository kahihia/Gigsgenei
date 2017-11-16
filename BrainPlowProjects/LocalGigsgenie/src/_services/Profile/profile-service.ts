import {Injectable, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from './../http-service';
import {Globalvariables} from './../../_services/class-track-helper/globalvariables';
@Injectable()
export class ProfileService {
  backbuttonlist: any = ['/mainhtml'];
  objGlobalvariables= new Globalvariables();
  constructor(private http: HttpService, private httpnoloader: Http) {
  }

// Signup Hire For Work
  ContractorSignup(txtPUserName: string, txtPName: string, txtPassword: string,
                   txtPEmail: string, txtPMobileNo: string,
                   txtPCountry: string, txtPtype: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'contractor/data.json',
      JSON.stringify({
        UserName: txtPUserName,
        Name: txtPName,
        Password: txtPassword,
        Email: txtPEmail,
        PhoneNo: txtPMobileNo,
        Country: txtPCountry,
        UserType: txtPtype
      }), {headers: headers}).map((data: Response) => data.json());


  }
  UserDefaultSignup(username,email,password) {  //Adding Data to Default User Table Of Django
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/user/',
      JSON.stringify({
        username: username,
        email: email,
        password: password,
      }), {headers: headers}).map((data: Response) => data.json());


  }
  // User Name Exist or Not
  UserNameExist(txtUserName: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'profile/usernamexist/',
      JSON.stringify({
        username: txtUserName,
      }), {headers: headers}).map((data: Response) => data.json());
  }

// Email Exists
  EmailExist(txtEmail: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'profile/emailexist/',
      JSON.stringify({
        email: txtEmail,
      }), {headers: headers}).map((data: Response) => data.json());
  }

  // Add Education Background
  AddEducation(objeducationlist) {
    const UserName = {'UserName': 'Temp', 'id': 2};
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/acedamyqualification/',
      JSON.stringify({
        education: objeducationlist
      }), {headers: headers}).map((data: Response) => data.json());
  }

  UpdateEducation(id,institution,degreename,startyear,endyear,percentile)
  {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.objGlobalvariables.ApiUrlLocal + 'profile/editacedamyqualification/'+ id,
    JSON.stringify({
      user: id,
      Institution:institution,
      DegreeName:degreename,
      StartYear:startyear,
      EndYear:endyear,
      Percentile:percentile,
    }), 
    {headers: headers}).map((data: Response) => data.json());
  }


  DeleteEducation(id) {
    console.log('mmmmmmmmmmmmmmmmmmmmm');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.objGlobalvariables.ApiUrlLocal + 'profile/editacedamyqualification/'+ id,
    {headers: headers}).map((response: Response) => response.json());
  }

  AddWorkExperience(objlist) {
    console.log('mmmmmmmmmmmmmmmmmmmmm');
    console.log(objlist);
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/workexperience/',
      JSON.stringify({
        UserName: localStorage.getItem('username'),
        workexprience: objlist,
      }), {headers: headers}).map((data: Response) => data.json());


  }

  UpdateWorkExperience(id,companyname,designation,startYear,endYear,description)
  {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.objGlobalvariables.ApiUrlLocal + 'profile/editworkexperience/'+ id,
    JSON.stringify({
      user: id,
      CompanyName:companyname,
      Designation:designation,
      StartYear:startYear,
      EndYear:endYear,
      Description:description,
    }), 
    {headers: headers}).map((data: Response) => data.json());
  }

  DeleteWorkExperience(id) {
    console.log('mmmmmmmmmmmmmmmmmmmmm');
    // console.log(objlist);
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.objGlobalvariables.ApiUrlLocal + 'profile/editworkexperience/'+ id,
    {headers: headers}).map((response: Response) => response.json());
  }

  AddSkills(skillobjList) {
    console.log('......................');
    console.log(skillobjList);
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/skills/',
      JSON.stringify({
        UserName: localStorage.getItem('username'),
        skills: skillobjList
      }), {headers: headers}).map((data: Response) => data.json());

 }

 Updateskills(id,skillname,skilllevel)
 {
   const headers = new Headers();
   headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
   headers.append('Content-Type', 'application/json');
   return this.http.put(this.objGlobalvariables.ApiUrlLocal + 'profile/editskills/'+ id,
   JSON.stringify({
     user: id,
     SkillName:skillname,
     SkillLevel:skilllevel,
   }), 
   {headers: headers}).map((data: Response) => data.json());
 }

  Deleteskills(id) {
    console.log('deleteskills');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.objGlobalvariables.ApiUrlLocal + 'profile/editskills/'+ id,
    {headers: headers}).map((response: Response) => response.json());
  }
  AddExpressYourself(FullName, Description, Resume) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/expressyourself/',
      JSON.stringify({
        user: '1',
        FullName: FullName,
        Description: Description,
        Resume: Resume,
        Deleted: false,
      }), {headers: headers}).map((data: Response) => data.json());
    // return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'expressyourself/',
    //   {
    //     UserName: localStorage.getItem('username'),
    //     FullName: FullName,
    //     Description: Description,
    //     Resume: Resume
    //   }).map((res: Response) => {
    //   if (res) {
    //     if (res.status === 200 || res.status === 201) {
    //
    //       const responce_data = res.json();
    //       return [{ status: res.status, json: res }];
    //     }
    //   }
    // }).catch((error: any) => {
    //
    //   if (error.status === 404) {
    //     console.log('errors 404');
    //   } else {
    //     console.log('errors ');
    //   }
    //   console.log( error);
    //   console.log(error.text);
    //   return Observable.throw(new Error(error.status));
    // });
  }

  fetchEducationalBackground() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'profile/acedamyqualification/',{headers: headers}).map((response: Response) => response.json());
  }

  fetchWorkExperience() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'profile/workexperience/',{headers: headers}).map((response: Response) => response.json());
  }

  fetchSkills() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'profile/skills/',{headers: headers}).map((response: Response) => response.json());
  }

  fetchExpressYourself() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'profile/expressyourself/',{headers: headers}).map((response: Response) => response.json());
  }
  fetchContarctor() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'profile/contractor/',{headers: headers}).map((response: Response) => response.json());
  }

  fetchCatagories() {
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'catagories/').map((response: Response) => response.json());
  }

  fetchCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name').map((response: Response) => response.json());
  }


  // DegreeName,SkillCatagory,SkillName,CompanyName,Designation
  fetchDegreeName(

  ) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'suggestion/degreename/' ).map((response: Response) => response.json());
  }

  fetchSkillName() {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'suggestion/skillname/').map((response: Response) => response.json());
  }

  fetchCompanyName() {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'suggestion/companyname/' ).map((response: Response) => response.json());
  }

  fetchDesignation() {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'suggestion/designation/').map((response: Response) => response.json());
  }

  fetchInstituteNames(txtKey: string) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'institute/' + txtKey).map
    ((response: Response) => response.json());
  }

  fetchJobCatagories() {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'jobcatagories/').map((response: Response) => response.json());
  }

  fetchContarctorByUserName() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');

    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'profile/contractor/',{headers:headers}).map((response: Response) => response.json());
  }

}
