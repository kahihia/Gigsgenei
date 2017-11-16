import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {ProfileService} from './../../_services/Profile/profile-service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Skills}from './../../_services/ControllerClasses/skills';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  private model: any = {catagory: '', skillname: '', skilllevel: ''};
  SkillLevel= '';
  Autoskillname:any = [];
  skillexist:any = [];
  AddUpdateButtonText = 'Add';
  ShowHideAlert = false;
  formSubmitted = false;// Because error shown when form submitted successfully
  UserName = '';
  skillobjList:any =[];
  // ListTrack: any = [];
  skillsarray:any;
  constructor(private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: ProfileService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  FormSubmitted() { // Because error shown when form submitted successfully
    this.formSubmitted = true;
  }
  PushSkill(name, level,f) {
    if(this.skillexist.indexOf(name) === -1) {
    let skillobj= new Skills();
    skillobj.SkillName = name;
    skillobj.SkillLevel = level;
    this.skillobjList.unshift(skillobj);
    // For list maintainess
    this.skillexist.unshift(name);
    this.Autoskillname.splice(this.Autoskillname.indexOf(name),1);
    f.reset();
    this.formSubmitted = false;// Because error shown when form submitted successfully
    window.scroll(0, 0);
    this.toastr.success(this.UserName +' Your Skill "'+name+'" has been added to list', 'Successfull!');
    this.AddUpdateButtonText = 'Add';
    }
  }

  DeleteallSkillInfo() {
    this.skillobjList.splice(0,this.skillobjList.length);
    this.skillexist.splice(0,this.skillexist.length);

    this.toastr.success(this.UserName + ' All Information you have entered before is Deleted', 'Successfull!');
  }
  UpdateSkillInfo() {
    this.newService.AddSkills(this.skillobjList).subscribe(data => {console.log(data);
      this.ShowHideAlert = true;
      this.skillobjList.splice(0,this.skillobjList.length);
      this.skillexist.splice(0,this.skillexist.length);
      this.formSubmitted = false;
      window.scroll(0, 0);
      this.toastr.success(this.UserName + ' Your Skills has been Successfully Added to Your Profile', 'Successfull!');
      },
      error=> {
        this.toastr.error(this.UserName + ' Your Skills Cannot be Added to Database Due to Some Errors', 'Error!');
      });
  }
  EditSkillObj(ind,skillname) {
    this.Autoskillname.push(this.skillobjList[ind].SkillName);
    this.AddUpdateButtonText = 'Update';
    this.model.skillname = this.skillobjList[ind].SkillName;
    let id = document.getElementById('skilllevel') as HTMLSelectElement
    id.value = this.skillobjList[ind].SkillLevel;;
    this.skillobjList.splice(ind,1) ;
    this.skillexist.splice(ind,1);
    skillname.focus();
    // Managing skill list

    window.scroll(0, 0);
  }
  DeleteSkillObj(ind) {
    this.Autoskillname.push(this.skillobjList[ind].SkillName);
    this.skillobjList.splice(ind,1) ;
    this.skillexist.splice(ind,1);
    this.toastr.success(this.UserName + ' Your Skill "'+this.skillobjList[ind].SkillName+'" has been deleted from list', 'Successfull!');
    window.scroll(0, 0);
  }
  ngOnInit() {
    this.UserName = sessionStorage.getItem('username');
    this.newService.fetchSkillName().subscribe(data =>{
      for(let i=0;i<data.length;i++) {
        this.Autoskillname.push(data[i].Name);
      }

    });
  }






  skillnameChange(val){
    this.ShowHideAlert = false;
   }
  readTextFile(file)
  {
    let allText;
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
      if(rawFile.readyState === 4)
      {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
          allText = rawFile.responseText;
          console.log(allText);
        }
      }
    }
    rawFile.send(null);
    this.skillsarray=allText.split('\n');
    console.log(this.skillsarray);
    console.log(this.skillsarray.length);
    this.skillsarray.splice(this.skillsarray.length-1,1);
    console.log(this.skillsarray);
  }
}
