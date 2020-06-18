import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  percent: number = 0;
  radius: number = 100;

  fullTime: any = '00:00:10';
  overallTimer: any = false;

  timer: any = false;
  incValue: any = 0;
  progress: any = 0;
  minutes: number = 1;
  seconds: any = 30;
  paused: any = false;

  elapsed: any = {
    h: '00',
    m: '00',
    s: '00',
  }

  constructor(private imsomnia: Insomnia){

  }

  startTime() {

    if(this.timer){
      clearInterval(this.timer);
    }

    if(!this.overallTimer){
      this.progressTimer();
    }

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.fullTime.split(':');
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    let totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);

    this.timer = setInterval(() => {

      this.incValue = 1 / totalSeconds;

      if(this.progress >= this.radius) {
        this.stopTime();
        clearInterval(this.timer);
      }

      if(!this.paused){
        this.progress = this.progress + this.incValue;
      }

    }, 10)
  }

  progressTimer() {
    let countDownDate = new Date();

    this.overallTimer = setInterval(() => {

      if(!this.paused){
        let now = new Date().getTime();
        let distance = now - countDownDate.getTime();

        this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.elapsed.s = Math.floor((distance % (1000 * 60)) / (1000));
      }

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);

    })
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  stopTime(){
    this.paused = true;
    this.timer = false;
    this.calculateRemainingTime();
  }

  calculateRemainingTime() {
    
  }

}
