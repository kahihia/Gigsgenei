import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {JobCatagoryService} from './../../_services/job-catagory.service';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  openDialog(id): void {
    let dialogRef = this.dialog.open(Dialogbox , <MatDialogConfig>{
      width: '250px',
      data: {id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result===true) {
        this.deleteClick(id);
      }
      // this.animal = result;
    });
  }

  constructor(private dialog: MatDialog,private toastr: ToastsManager,private vcr: ViewContainerRef,private newService: JobCatagoryService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  bookmark: any= [];
  ListTrack: any = [];
  ngOnInit() {
    this.fetchBookMark();
    }
  deleteClick(val) {
    console.log('delete' + val);
    this.newService.deleteBookMark(val).subscribe(data => {
      console.log(data);
      this.toastr.success('Book Mark Deleted Sucessfully','Sucess');
      this.fetchBookMark();

    },error => {
      this.toastr.error('Book Mark Not deleted due to some error','Error')
    });
    }
    fetchBookMark() {
      this.newService.fetchBookMark('0', '10').subscribe(data => {this.bookmark = data;
        console.log(data);
      });
    }
  btnDetailClick(id) {
    localStorage.setItem('jobid', id);
    this.router.navigate(['/details']);
    console.log(id);
  }
}

@Component({
  selector: 'dialogbox',
  templateUrl: 'dialogbox.html',
})
export class Dialogbox {

  constructor(
    public dialogRef: MatDialogRef<Dialogbox>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
