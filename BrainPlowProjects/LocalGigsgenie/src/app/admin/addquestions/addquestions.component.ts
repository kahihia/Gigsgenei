import { Component, OnInit } from '@angular/core';
import {TestService} from '../../../_services/Test/test.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Inject} from '@angular/core';

@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {

 
  private model: any = {catagory: '', user: ''};
  constructor(private toastr: ToastsManager, private newService: TestService) {

}

catagoriesList:any = [];
ShowHideAlert = false;


onSubmit(catagory,question,A,B,C,D,Answer){

  this.newService.AddTestQuestions(catagory,question,A,B,C,D,Answer).subscribe(data => {console.log(data);
    console.log('service');
      this.ShowHideAlert = true;
      window.scroll(0, 0); 
      this.toastr.success('Questions is Added Successfully','Success');
  
    });
}

  ngOnInit() {
    this.newService.fetchtestcategories().subscribe(data=> { console.log(data);
      this.catagoriesList = data;
      console.log('service');
     
    })
  }
    


}

