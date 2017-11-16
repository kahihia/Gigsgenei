export class GigsRequirement {
  user: string;
  GigId: string;
  Requirement: string;
  IsMandatory:boolean;

  constructor() {
    this.user = '1';
    this.GigId = '';
    this.Requirement = '';
    this.IsMandatory=false;
  }
}

