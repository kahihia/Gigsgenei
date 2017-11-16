import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-headerhfw',
  templateUrl: './headerhfw.component.html',
  styleUrls: ['./headerhfw.component.css']
})
export class HeaderhfwComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
}
