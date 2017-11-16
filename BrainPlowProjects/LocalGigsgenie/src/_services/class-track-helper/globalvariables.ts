export class Globalvariables {
  Url: string;
  ApiUrlOnline:string;
  ApiUrlLocal:string;
  emojiSrc:string;
  WSaddress:string;
  mediaUrl:string;
  //  Local
  constructor() {
    this.Url = 'http://192.168.29.108:8000/media';
    this.ApiUrlOnline = 'https://gigsgenie-backend.herokuapp.com/';
    this.ApiUrlLocal = 'http://192.168.29.108:8000/';
    this.emojiSrc = 'https://abs.twimg.com/emoji/v1/72x72/';
    this.WSaddress = 'ws//192.168.29.108:8000/';
    this.mediaUrl = 'http://192.168.29.108:8000';
  }
  //  Online
  // constructor() {
  //   this.Url = 'http://ns519750.ip-158-69-23.net:8060/media';
  //   this.ApiUrlOnline = 'https://gigsgenie-backend.herokuapp.com/';
  //   this.ApiUrlLocal = 'http://ns519750.ip-158-69-23.net:8060/';
  //   this.emojiSrc = 'https://abs.twimg.com/emoji/v1/72x72/';
  //   this.WSaddress = 'ws//ns519750.ip-158-69-23.net:8060/';
  //   this.mediaUrl = 'http://ns519750.ip-158-69-23.net:8060';
  // }

}

