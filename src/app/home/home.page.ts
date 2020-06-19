import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  radius: number = 100;

  fullTime: any = '00:01:30';
  timerCounter: any = false;
  doesItContinue: any = false;
  timerProgress: any = false;

  incValue: any = 0;
  progress: any = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: any = 0;
  paused: any = true;
  delayDistance: any = 0;
  totalSeconds: any = 0;
  time = new Date();

  elapsed: any = {
    h: '00',
    m: '00',
    s: '00',
  }

  startTime() {

    this.paused = false;
    this.time = new Date();

    if (!this.doesItContinue) {

      this.doesItContinue = true;

      let timeSplit = this.fullTime.split(':');
      this.hours = timeSplit[0];
      this.minutes = timeSplit[1];
      this.seconds = timeSplit[2];

      this.totalSeconds = Math.floor(this.hours * 60 * 60) + Math.floor(this.minutes * 60) + parseInt(this.seconds);

      this.timerProgress = setInterval(() => {

        this.incValue = 1 / this.totalSeconds;

        if (this.progress >= this.radius) {
          this.finishTime()
        }

        if (!this.paused) {
          this.progress = this.progress + this.incValue;
        }

      }, 10)

      this.timerCounter = setInterval(() => {

        if (!this.paused) {
          let milisec = this.delayDistance + (new Date()).getTime() - this.time.getTime();


          this.elapsed.h = Math.floor((milisec % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.elapsed.m = Math.floor((milisec % (1000 * 60 * 60)) / (1000 * 60));
          this.elapsed.s = Math.floor((milisec % (1000 * 60)) / (1000));

        }

        this.elapsed.h = this.pad(this.elapsed.h, 2);
        this.elapsed.m = this.pad(this.elapsed.m, 2);
        this.elapsed.s = this.pad(this.elapsed.s, 2);

      }, 500)

    }
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  stopTime() {
    this.paused = true;
    this.delayDistance += (new Date()).getTime() - this.time.getTime();
  }

  resetTime() {
    this.finishTime();

    this.delayDistance = 0;
    this.progress = 0;
    this.elapsed = {
      h: '00',
      m: '00',
      s: '00',
    }

  }

  finishTime() {
    this.paused = true;
    clearInterval(this.timerProgress);
    clearInterval(this.timerCounter);
    this.doesItContinue = false;
  }

}
