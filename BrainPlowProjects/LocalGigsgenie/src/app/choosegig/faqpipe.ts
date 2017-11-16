import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faqpipe'
})
export class Faqpipe implements PipeTransform {
  temp:any=[];
  transform(faq){
    this.temp=faq.split(',');
    return this.temp;
  }
}
