import { Component } from '@angular/core';
import { PreloaderService } from './../../../_services/preloader-service';

@Component({
  selector: 'preloader-full',
  styleUrls: [
    './preloader-full.scss'
  ],
  templateUrl: './preloader-full.html'
})
export class PreloaderFull {
  constructor(private preloaderService: PreloaderService) {
  }
}
