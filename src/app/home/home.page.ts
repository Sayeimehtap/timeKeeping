import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  radius: number = 100;

  fullTime: any = '00:00:10';
  overallTimer1: any = false;
  overallTimer: any = false;

  timer1: any = false;
  timer: any = false;

  incValue: any = 0;
  progress: any = 0;
  minutes: number = 0;
  seconds: any = 0;
  paused: any = false;
  finished: any = false;
  totalSeconds: any = 0;
  sleepingTime: any = 0;

  elapsed: any = {
    h: '00',
    m: '00',
    s: '00',
  }

  startTime() {

    if(this.finished){
      this.finished = false;

      this.progress = 0;
      this.elapsed = {
        h: '00',
        m: '00',
        s: '00',
      }

      console.log("tekrar başlatıldı");
    }

    if(!this.timer1){
      
      this.paused = false;

      console.log("girdi");

      this.timer1 = false;
  
      let timeSplit = this.fullTime.split(':');
      this.minutes = timeSplit[1];
      this.seconds = timeSplit[2];
  
      this.totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);

    }

    if(!this.overallTimer1){
      console.log("sayac basladı")
      this.progressTimer();
    }

  
    this.timer = setInterval(() => {

      this.incValue = 1 / this.totalSeconds;

      if(this.progress >= this.radius) {
        this.resetTime();
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

        console.log(this.elapsed.h+":"+this.elapsed.m+":"+this.elapsed.s)
      }

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);

    }, 1000)
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  stopTime(){
    this.paused = true;
    let countDownDate = new Date();
    console.log(countDownDate.getTime());
    this.timer1 = false;
    this.calculateRemainingTime(countDownDate);
  }
  
  resetTime(){
    this.paused = true;
    this.finished = true;
    this.timer1 = false;
    this.overallTimer1 = false;
    clearInterval(this.timer);
    clearInterval(this.overallTimer);
  }

  calculateRemainingTime(paramCountDownDate) {
    let now = new Date().getTime();
    console.log(paramCountDownDate.getTime());
    this.sleepingTime = now - paramCountDownDate.getTime();
    console.log(this.sleepingTime);
  }

}
