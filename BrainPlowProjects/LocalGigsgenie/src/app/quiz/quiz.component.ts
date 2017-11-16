import {Component, OnInit} from '@angular/core';
// import {ElementRef, OnDestroy} from '@angular/core';
// import {Observable, Subscription} from 'rxjs/Rx';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {ClassTrackHelperModule} from './../../_services/class-track-helper/class-track-helper.module';
import {ClassColor} from './../../_services/class-track-helper/color';
import { Router,ActivatedRoute,Params } from '@angular/router';
// import {error} from "util";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  end_date = '2017-09-25 15:25:16';
  ListTrack: any = [];
  Questions:any = [];
  page=0;
  index=0;
  TestCompletion=0;
  Score=0;
  loaded=false;
  TotalAttempts:any = [];
  color=['blue','blue','blue','blue'];
  catagory='';
  constructor(private newService: JobCatagoryService, private activatedRoute: ActivatedRoute, private objClassTrack: ClassTrackHelperModule,
              private router: Router) {
    this.setEndTime();
    console.log('Constructor');
    this.activatedRoute.queryParams
      .filter(params =>params.Catagory)
      .subscribe(params => {
        this.newService.fetchTestQuestions(params.Catagory).subscribe(data=> {
          this.Questions=data;
          for(let i=0;i<this.Questions.length;i++) {
            this.Questions[i].attempt=0;
            let obj=new ClassColor();
            this.Questions[i].color=obj;
            this.catagory=params.Catagory;
          }
          this.loaded=true;
        });
      });
  }


  ngOnInit() {
    console.log('init');
    // this.objClassTrack.SetTrack('/quiz', 'Take Test');
    // this.ListTrack = JSON.parse(localStorage.getItem('Track'));
    window.setInterval(function () {
      this.timer
    }, 1000);
  }
  setEndTime() {
    var time = new Date();
    time.setMinutes(time.getMinutes() + 60);
    this.end_date =time.getFullYear() +"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    // console.log('end data  ---  ',this.end_date)
    console.log('time : ' + this.end_date);
    // this.end_date  = '2017-09-25 15:25:16';
  }
  timer() {
    console.log('timer : ' + ((new Date(this.end_date).getTime().valueOf() - new Date().getTime().valueOf()) / (1000)).toFixed(0));
    return ((new Date(this.end_date).getTime().valueOf() - new Date().getTime().valueOf()) / (1000)).toFixed(0);
  }
  left() {
    if(this.page>=5) {
      this.page -= 5;
    }
  }
  right() {
    if(this.page<=this.Questions.length-5) {
      this.page+=5;
    }
  }
  next() {
    if(this.index<this.Questions.length-1) {
      this.index+=1;
    }
    if(((this.index)%5)===0) {
      this.right();
    }
  }
  prev() {
    if(this.index>0) {
      this.index -= 1;
    }
    if(((this.index+1)%5)===0) {
      this.left();
    }
  }
  ChangeQuestion(val) {
    console.log('Al : ' + val);
    this.index=val-1;
    console.log(this.Questions);
  }
  TestCompletion1() {
    this.TestCompletion = (this.TotalAttempts.length/this.Questions.length)*100;
    console.log('Attempts: '+this.TotalAttempts);
    console.log('Total : '+this.Questions.length);
    console.log('Answer :'+this.TestCompletion);
    this.TestCompletion=Math.ceil(this.TestCompletion);
  }
  CalculateResult() {
    let temp=0;
    for(let i=0;i<this.Questions.length;i++) {
      console.log('Your : ' +this.Questions[i].attempt+' Answer :'+this.Questions[i].Answer);
      if(this.Questions[i].attempt=== this.Questions[i].Answer){
        temp+=1;
      }
    }
    console.log('Temp : '+temp+' Lenght : ' + this.Questions.length+' Result : ' + temp/this.Questions.length);
    temp=temp/this.Questions.length;
    temp = temp*100;
    console.log('Result : '+Math.ceil(temp));
    this.newService.AddTestResult(temp, this.catagory).subscribe(data=> console.log(data), error=>{
      console.log(error);
    });
    // return temp;
  }
  Attempt(ans) {

    console.log('index color :' + ans);
    if(this.TotalAttempts.indexOf(this.index)===-1) {
      this.TotalAttempts.push(this.index);
      this.TestCompletion1();
    }
    this.Questions[this.index].attempt=ans;
    this.Questions[this.index].color.color[ans-1]='green';
    for(let i=0;i<4;i++) {

      if(ans-1!==i) {
        this.Questions[this.index].color.color[i]='blue';
      }
    }
  }
  chkPostTypeClick(val, ind) {
    console.log('value : ' + val);
    console.log('Index: ' + ind);
  }
}



