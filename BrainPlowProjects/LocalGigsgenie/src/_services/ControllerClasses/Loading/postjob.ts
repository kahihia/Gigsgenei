export class PostJob {
  JobCatagory: string;
  JobSubCatagory:string;
  JobName:string;
  Description:string;
  SkillsNeeded:string;
  ExprienceLevel:string;
  CompletionTime:string;
  Status: string;
  JobType:string;
  PostType:string;
  Taken:string;
  Budget:string;
  Negotiatable:boolean;
  BidDays:string;
  Deleted:boolean;
  CreatedAt:string;
  constructor() {
    this.JobCatagory = 'loading...';
    this.JobSubCatagory= 'loading...';
    this.JobName= 'loading...';
    this.Description= 'loading...';
    this.SkillsNeeded= 'loading...';
    this.ExprienceLevel= 'loading...';
    this.CompletionTime= 'loading...';
    this.Status= 'loading...';
    this.JobType= 'loading...';
    this.PostType= 'loading...';
    this.Taken = 'loading...';
    this.Budget = 'loading...';
    this.Negotiatable = false;
    this.BidDays = 'loading...';
    this.Deleted = false;
    this.CreatedAt = 'loading...';
  }
}

