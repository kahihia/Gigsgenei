import {Pipe, PipeTransform} from '@angular/core';

@Pipe({

  name: 'secondsToTime'
})

export class TimePipe implements PipeTransform {
  times = {
    Min: 60,
    S: 1
  };

  transform(seconds) {

    let time_string = '';
    // let plural: string = '';
    for (const key in this.times) {

      if (Math.floor(seconds / this.times[key]) > 0) {

        time_string += key.toString() + ':' + (Math.floor(seconds / this.times[key]).toString()) + '\n';
        seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);
      }
    }
    return time_string;
  }
}


