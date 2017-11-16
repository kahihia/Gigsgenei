import {Injectable, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from "./http-service";
import {Globalvariables} from "./class-track-helper/globalvariables";

@Injectable()
export class JobCatagoryService {
  backbuttonlist: any = ['/mainhtml'];
  objGlobalvariables= new Globalvariables();
  constructor(private http: HttpService, private httpnoloader: Http) {
    }

  SendData(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://gigsgenie-backyend.appspot.com/stocks/data.json',
      JSON.stringify({
        ticker: 'danish',
        open: '9',
        close: '8',
        volume: '9'
      }), {headers: headers}).map((data: Response) => data.json());

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
  // UserDefaultSignup(username,email,password) {  //Adding Data to Default User Table Of Django
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/user/',
  //     JSON.stringify({
  //       username: username,
  //       email: email,
  //       password: password,
  //     }), {headers: headers}).map((data: Response) => data.json());
  //
  //
  // }
////////////////////////////////////////////////////////
  AddLoginInformation(txtUserName: string, txtPassword: string, txtUserType: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'login/data.json',
      JSON.stringify({
        UserName: txtUserName,
        Password: txtPassword,
        UserType: txtUserType
      }), {headers: headers}).map((data: Response) => data.json());
  }

  // Add First Time Login
  AddFirstTimeLogin(txtUserName: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'firsttimelogin/data.json',
      JSON.stringify({
        UserName: txtUserName,
        Firsttime: true
      }), {headers: headers}).map((data: Response) => data.json());
  }

  // User Name Exist or Not
//   UserNameExist(txtUserName: string) {
//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'profile/usernamexist/',
//       JSON.stringify({
//         username: txtUserName,
//       }), {headers: headers}).map((data: Response) => data.json());
//   }
//
// // Email Exists
//   EmailExist(txtEmail: string) {
//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'profile/emailexist/',
//       JSON.stringify({
//         email: txtEmail,
//       }), {headers: headers}).map((data: Response) => data.json());
//   }
//
//   // Add Education Background
//   AddEducation(objeducationlist) {
//     const UserName = {'UserName': 'Temp', 'id': 2};
//     const headers = new Headers();
//     headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
//     headers.append('Content-Type', 'application/json');
//     return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/acedamyqualification/',
//       JSON.stringify({
//         education: objeducationlist
//       }), {headers: headers}).map((data: Response) => data.json());
//
//
//   }
//
//   AddWorkExperience(objlist) {
//     console.log('mmmmmmmmmmmmmmmmmmmmm');
//     console.log(objlist);
//     const headers = new Headers();
//     headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
//     headers.append('Content-Type', 'application/json');
//     return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/workexperience/',
//       JSON.stringify({
//         UserName: localStorage.getItem('username'),
//         workexprience: objlist,
//         }), {headers: headers}).map((data: Response) => data.json());
//
//
//   }
//
//   AddSkills(skillobjList) {
//     console.log('......................');
//     console.log(skillobjList);
//     const headers = new Headers();
//     headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
//     headers.append('Content-Type', 'application/json');
//     return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/skills/',
//       JSON.stringify({
//         UserName: localStorage.getItem('username'),
//         skills: skillobjList
//       }), {headers: headers}).map((data: Response) => data.json());
//
//   }
//
//   AddExpressYourself(FullName, Description, Resume) {
//     const headers = new Headers();
//     headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
//     headers.append('Content-Type', 'application/json');
//     return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'profile/expressyourself/',
//       JSON.stringify({
//         user: '1',
//         FullName: FullName,
//         Description: Description,
//         Resume: Resume,
//         Deleted: false,
//       }), {headers: headers}).map((data: Response) => data.json());
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

  AddGig(catagory, title, Description, Time) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'addgig/data.json',
      JSON.stringify({
        UserName: localStorage.getItem('username'),
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
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'addgigimages/data.json',
      JSON.stringify({
        UserName: localStorage.getItem('username'),
        GigId: id,
        Image: Image
      }), {headers: headers}).map((data: Response) => data.json());
  }
  AddGigRequirements(obj, id) {
    for(let i=0;i<obj.length;i++) {
      obj[i].GigId=id;
    }
    console.log(obj);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'addgigrequirements/data.json',
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
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'addgigfaq/data.json',
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
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'addgigsearchterms/data.json',
      JSON.stringify({
        obj: obj
      }), {headers: headers}).map((data: Response) => data.json());
  }
  AddPostJob(TxtUserName: string, drpTextCatagory: string, jobTitle: string, description: string, filePdf: string, skillsneeded: string,
             txtExperienceLevel: string, days: string, status: string, ckhJObType: string, ckhPostType: string, budget:string, negotiation:boolean,SkillsNeededJson) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'bid/postjob/data.json',
      JSON.stringify({
        user: '1',
        JobCatagory: drpTextCatagory,
        JobName: jobTitle,
        JobSubCatagory: drpTextCatagory,
        Description: description,
        SkillsNeeded: skillsneeded,
        ExprienceLevel: txtExperienceLevel,
        CompletionTime: days,
        Status: status,
        JobType: ckhJObType,
        PostType: ckhPostType,
        Taken:0,
        Budget:budget,
        Negotiatable:negotiation,
        BidDays:7,
        Deleted:false,
        CreatedAt:'',
        skillsneeded:SkillsNeededJson,
      }), {headers: headers}).map((data: Response) => data.json());

  }

  AddBookMark(Id) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'bid/addbookmark/data.json',
      JSON.stringify({
        user: '1',
        Id: Id,
        Deleted: false
      }), {headers: headers}).map((data: Response) => data.json());

  }
  fetchBookMark(start: string, end: string) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'bid/bookmarkstartend/'+ start + '/' + end,{headers: headers}).map((response: Response) => response.json());
  }
  fetchCheckBookMarkByUserName() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'bid/checkbookmark/',{headers: headers}).map((response: Response) => response.json());
  }
  deleteBookMark( txtid: string) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.delete(this.objGlobalvariables.ApiUrlLocal + 'bid/deletebookmark/'+ txtid,{headers: headers}).map((response: Response) => response.json());
  }




  AddTestResult(result, catagory) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(this.objGlobalvariables.ApiUrlLocal + 'testresult/data.json');
    return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'testresult/data.json',
      JSON.stringify({
        UserName: localStorage.getItem('username'),
        Catagory: catagory,
        Percentage: result
      }), {headers: headers}).map((data: Response) => data.json());

  }

  AddBid(BidOwner,JobId,BidPrize,Days,Title) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    // console.log(this.objGlobalvariables.ApiUrlLocal + 'testresult/data.json');
    return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'bid/addbid/data.json',
      JSON.stringify({
        BidOwner: BidOwner,
        JobId: JobId,
        Bidder: sessionStorage.getItem('username'),
        BidPrize: BidPrize,
        Days: Days,
        Title: Title,
        Status:0,
        ExpertGuarantee:false,
        SponsorMyBid:false,
        HighlightMyBid:false
      }), {headers: headers}).map((data: Response) => data.json());

  }
  AddAppliedJob(JobApplier,AppliedJobId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // console.log(this.objGlobalvariables.ApiUrlLocal + 'testresult/data.json');
    return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'addappliedjob/data.json',
      JSON.stringify({
        JobApplier: JobApplier,
        AppliedJobId: AppliedJobId,

      }), {headers: headers}).map((data: Response) => data.json());

  }

  fetchCatagories() {
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'catagories/').map((response: Response) => response.json());
  }

  fetchCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name').map((response: Response) => response.json());
  } // DegreeName,SkillCatagory,SkillName,CompanyName,Designation
  fetchDegreeName(txtKey: string) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'degreename/' + txtKey).map((response: Response) => response.json());
  }

  fetchSkillCatagory(txtKey: string) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'skillcatagory/' + txtKey).map((response: Response) => response.json());
  }

  fetchSkillName(txtKey: string) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'skillname/' + txtKey).map((response: Response) => response.json());
  }

  fetchCompanyName(txtKey: string) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'companyname/' + txtKey).map((response: Response) => response.json());
  }

  fetchDesignation(txtKey: string) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'designation/' + txtKey).map((response: Response) => response.json());
  }

  fetchInstituteNames(txtKey: string) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'institute/' + txtKey).map
    ((response: Response) => response.json());
  }

  fetchJobCatagories() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'bid/jobcatagories/',{headers: headers}).map((response: Response) => response.json());
  }

  fetchJobsList(txtKey: string, start: string, username:string) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'bid/joblist/' + txtKey + '/' + start + '/' + username,{headers: headers})
      .map((response: Response) => response.json());
  }


  fetchJobsById(txtKey: string) {
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'bid/getjobbyid/' + txtKey).map((response: Response) => response.json());
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

  fetchContarctor() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'contractor/',{headers: headers}).map((response: Response) => response.json());
  }





  fetchFirstTimeLogin(txtKey: string) {
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'firsttimelogin/' + txtKey).map((response: Response) => response.json());
  }


  fetchCountOfProfileInfo(txtKey: string) {
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'count/' + txtKey).map((response: Response) => response.json());
  }

  fetchViewGigs() {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'viewgigswithimages/').map((response: Response) => response.json());
  }
  fetchViewGigsWithidUserName(id) {
    return this.httpnoloader.get(this.objGlobalvariables.ApiUrlLocal + 'viewgigswitheverything/'+id).map((response: Response) => response.json());
  }

  fetchLoadPostJob(start) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'bid/loadpostjob/data.json',
      JSON.stringify({
        username: sessionStorage.getItem('username'),
        start: start,
      }), {headers: headers}).map((data: Response) => data.json());

  }
  fetchBidsByJobId(id) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'bid/listbidbyjobid/'+ id,{headers: headers}).map((response: Response) => response.json());
  }
  fetchAlreadyBidedJob(start) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    headers.append('Content-Type', 'application/json');
    return this.httpnoloader.post(this.objGlobalvariables.ApiUrlLocal + 'bid/getbiddedjob/data.json',
      JSON.stringify({
        start: start,
      }), {headers: headers}).map((data: Response) => data.json());

  }
  fetchTestQuestions(catagory) {
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'testquestions/'+ catagory).map((response: Response) => response.json());
  }
  fetchTestCatagories() {
    return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'testcatagories/').map((response: Response) => response.json());
  }

  checkLogin(username: string, password: string) {
    // return this.http.get(this.objGlobalvariables.ApiUrlLocal + 'loginauth/' + username + '/' + password).map((response: Response) => response.json());
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.objGlobalvariables.ApiUrlLocal + 'loginauth/',
      JSON.stringify({
        username: username,
        password: password,
        }), {headers: headers}).map((data: Response) => data.json());

  }


  BackButtonSetUrl(url) {
    console.log('1: ' + this.backbuttonlist);
    if (this.backbuttonlist[0] === '/mainhtml') {
      localStorage.setItem('backbutton', JSON.stringify(this.backbuttonlist));
    }
    if (this.backbuttonlist.indexOf(url) === -1) {
      this.backbuttonlist = JSON.parse(localStorage.getItem('backbutton'));
      console.log('2: ' + this.backbuttonlist);
      this.backbuttonlist.push(url);
      console.log('3: ' + this.backbuttonlist);
      localStorage.setItem('backbutton', JSON.stringify(this.backbuttonlist));
    }
  }
  BackButtonGetUrl(url) {
    if (this.backbuttonlist.length > 1) {
      this.backbuttonlist = JSON.parse(localStorage.getItem('backbutton'));
      this.backbuttonlist.pop();
      const rurl = this.backbuttonlist.pop();
      // this.backbuttonlist.splice(url, 1);
      localStorage.setItem('backbutton', JSON.stringify(this.backbuttonlist));
      console.log('Return Url : ' + rurl);
      return rurl;
    }
  }
}
