export class Contractor {
  PhoneNo: string;
  Country:string;
  FirstTimeLogin:boolean;
  Deleted:boolean;
  AcountActive:boolean;
  Role:string;
  CreatedAt:string;

  constructor() {
    this.PhoneNo = '';
    this.Country = '';
    this.FirstTimeLogin = false;
    this.Deleted = false;
    this.AcountActive = true;
    this.Role='U';
    this.CreatedAt = '1900-1-1';
  }
}

