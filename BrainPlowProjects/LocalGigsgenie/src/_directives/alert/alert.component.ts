import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from './../../_services/alertservice.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;
  constructor(private alertService: AlertserviceService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => { console.log(message); this.message = message;
    });
  }
  hide(id) {
    console.log('yes');
    document.getElementById('alertId').style.display = 'none';
  }
}
