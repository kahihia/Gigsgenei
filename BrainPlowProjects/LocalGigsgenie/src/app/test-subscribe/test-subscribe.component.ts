import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl, AbstractControl, FormBuilder, Validators, FormControlName} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from './../../assets/validators';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-test-subscribe',
  templateUrl: './test-subscribe.component.html',
  styleUrls: ['./test-subscribe.component.css']
})
export class TestSubscribeComponent 
   {
 
constructor(private router:Router){}

  model: any = {};
 


  onSubmit = function()

   { console.log(this.model);
  	this.router.navigate(['/instructions']);
   } 

 }
