import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor( private router: RouterModule) { }

  model: any = {};

  ngOnInit() {
  }

   click1 = function()
 
    { console.log(this.model);
     this.router.navigate(['/admin/categories']);
    } 

    click2 = function()
    
       { console.log(this.model);
        this.router.navigate(['/admin/addquestions']);
       } 
 

}
