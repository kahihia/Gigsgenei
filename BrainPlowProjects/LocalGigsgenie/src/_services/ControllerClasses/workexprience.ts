export class WorkExprience {
  user:string;
  CompanyName: string;
  Designation: string;
  Description: string;
  EndYear: string;
  StartYear: string;
  Deleted:boolean;
  CreatedAt: string;

  constructor() {
    this.user = '1';
    this.CompanyName = 'null';
    this.Designation = 'null';
    this.StartYear = 'null';
    this.EndYear = '1900-1-1';
    this.Description = '1900-1-1';
    this.Deleted = false;
    this.CreatedAt = '1900-1-1';
  }
}

