import { Component } from '@angular/core';
import { PreloaderService } from '../../../_services/preloader-service';

@Component({
  selector: 'preloader-small',
  styleUrls: [
    './preloader-small.scss'
  ],
  templateUrl: './preloader-small.html'
})
export class PreloaderSmall {
  constructor(private preloaderService: PreloaderService) {
  }
}
