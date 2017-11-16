export class Bid {
  Bidder:string;
  BidOwner:string;
  BidderImage:string;
  BidPrize :string;
  Days:string;
  Title:string;
  Status:string;
  ExpertGuarantee:boolean;
  SponsorMyBid:boolean;
  HighlightMyBid:boolean;
  CreatedAt:string;
  constructor() {
    this.Bidder = 'None';
    this.BidOwner = 'None';
    this.BidderImage = './../../assets/images/defaultimg.png';
    this.BidPrize = 'loading...';
    this.Days = 'loading...';
    this.Title = 'loading...';
    this.Status = 'loading...';
    this.ExpertGuarantee = false;
    this.SponsorMyBid = false;
    this.HighlightMyBid = false;
    this.CreatedAt = 'loading...';
  }
}

