export class Education {
  Institution: string;
  DegreeName: string;
  StartYear: string;
  EndYear: string;
  Percentile: string;
  user:string;
  Deleted:boolean;
  CreatedAt:string;

  constructor() {
    this.Institution = '';
    this.DegreeName = '';
    this.StartYear = '';
    this.EndYear = '';
    this.Percentile = '';
    this.user = '1';
    this.Deleted = false;
    this.CreatedAt = '1900-1-1';
  }
}

