import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HomePageService} from '../../../_services/Description/homepageservice';
import {ClassTrackHelperModule} from '../../../_services/class-track-helper/class-track-helper.module';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Inject} from '@angular/core';

@Component({
  selector: 'app-main-page-description',
  templateUrl: './main-page-description.component.html',
  styleUrls: ['./main-page-description.component.css']
})
export class MainPageDescriptionComponent implements OnInit {

  private model: any = {description:''};

  constructor(private toastr: ToastsManager, vcr: ViewContainerRef, private newService: HomePageService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ShowHideAlert = false;

   onSubmit(description) {
    console.log('submitted');
    console.log(description);
    this.toastr.success('You have successfully add the test category!', 'Success!');
    
   
    this.newService.UpdateHomeDescription(description).subscribe(data => {console.log(data);
    console.log('textarea');
      this.ShowHideAlert = true;
      window.scroll(0, 0); 
      this.toastr.success('Description is Updated Successfully','Success');
     
       
      
    });
  }
  ngOnInit() {
  }

}
