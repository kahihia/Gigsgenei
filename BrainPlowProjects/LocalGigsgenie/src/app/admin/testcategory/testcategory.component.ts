import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {TestService} from '../../../_services/Test/test.service';
import {ClassTrackHelperModule} from '../../../_services/class-track-helper/class-track-helper.module';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';


@Component({
  selector: 'app-testcategory',
  templateUrl: './testcategory.component.html',
  styleUrls: ['./testcategory.component.css']
})
export class TestcategoryComponent implements OnInit{
  catagoryId='';
  catagory='Hello';

  // openDialog(): void {
  //   let dialogRef = this.dialog.open(Dialogbox , <MdDialogConfig>{
  //     width: '250px',
  //     data: {catagory:'cat'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if(result===true) {
  //       this.deleteClick('cat');
  //     }
  // //     // this.animal = result;
  //   });
  // }


 model2 : any={};
  private model: any = {catagory: '', user: '' };
  constructor( private toastr: ToastsManager, vcr: ViewContainerRef, private newService: TestService, public dialog: MatDialog ) {
    this.toastr.setRootViewContainerRef(vcr);
}



  showSuccess() {
    this.toastr.success('You have successfully add the test category!', 'Success!');
  }

  base64textString = '';
  catagoriesList:any = [];
  ShowHideAlert = false;
  temp = 786;


  onSubmit(catagory) {
      console.log('submitted');
      console.log(catagory);
      this.toastr.success('You have successfully add the test category!', 'Success!');


      this.newService.AddTestCategory(catagory).subscribe(data => {console.log(data);
      console.log('service');
        this.ShowHideAlert = true;
        window.scroll(0, 0);
        this.toastr.success('Catagroy is Added Successfully','Success');



      });

   this.newService.fetchtestcategories().subscribe(data=> {console.log(data);
    this.catagoriesList = data;
    console.log('service');
    // this.toastr.success('Catagroy is Added Successfully','Success');



  })
}

  deleteClick(id) {
    console.log('delete' + id);
    this.newService.deletetestcategories(id).subscribe(data => {
      console.log(data);
      // console.log("jashan",this.model2.id);

      this.toastr.success('Catagroy is Deleted Sucessfully','Success');
      this.newService.fetchtestcategories().subscribe(data=> { console.log(data);
        this.catagoriesList = data;
        console.log('service');

      });
    },error => {
      this.toastr.error('Category is  not Deleted, Please try again','Error')
    });
}

UpdateClick(value) {
  console.log('update : ' + value);
  this.newService.Updatetestcategories( this.catagoryId,value).subscribe(data => {
    console.log(data);
    // console.log("jashan",this.model2.id);

    this.toastr.success('Catagroy is Updated Sucessfully','Success');
    this.newService.fetchtestcategories().subscribe(data=> { console.log(data);
      this.catagoriesList = data;
      console.log('service');

    });
  },error => {
    this.toastr.error('Category is  not updated, Please try again','Error')
  });
}




    ngOnInit() {
      this.newService.fetchtestcategories().subscribe(data=> { console.log(data);
        this.catagoriesList = data;
        console.log('service');

      })
    }
    btnEditClick(val,id) {
      this.catagory=val;
      this.catagoryId = id;
      console.log('Name : '+this.catagory + this.catagoryId);
    }
    btnDeleteClick(id) {
      this.catagoryId = id;
      console.log('Id : '+this.catagoryId);
    }
}

// @Component({
//   selector: 'dialogbox',
//   templateUrl: 'dialogbox.html',
// })
// export class Dialogbox {

//   constructor(
//     public dialogRef: MdDialogRef<Dialogbox>,
//     @Inject(MD_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();


//   }
// }





