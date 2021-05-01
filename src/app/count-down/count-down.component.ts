import { Component, OnInit } from '@angular/core';
import Speaker from '../model/Speaker';
import { SpeechType } from '../model/SpeechType';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  time!: number;
  display!: string;
  interval!: any;
  speakers: Speaker[] = [];
  speakerName!: string;
  speechNo = 1;
  speechType!: string;

  speechTypeOptions = Object.values(SpeechType);

  ngOnInit(): void {
    this.time = 0;
    this.display = '00:00';
    this.speakerName = '';
    console.log(this.speechTypeOptions);
  }


  startTimer(): void {
    console.log('=====>');
    this.interval = setInterval(() => {
      this.time++;
      this.display = this.transform(this.time);
    }, 1000);
  }

  transform(value: number): string {
    let minutes: number | string = Math.floor(value / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let seconds: number | string = (value - +minutes * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return minutes + ':' + seconds;
  }

  pauseTimer(): void {
    clearInterval(this.interval);
  }

  resetTimer(): void {
    const speaker: Speaker = {
      speechNo: this.speechNo,
      type: this.speechType,
      name: this.speakerName,
      time: this.display
    };

    const toastmastersSpeakers = localStorage.getItem('toastmastersSpeakers');
    if (toastmastersSpeakers) {
      this.speakers = JSON.parse(toastmastersSpeakers);
    }

    this.speakers.push(speaker);
    const speakersString = JSON.stringify(this.speakers);
    localStorage.setItem('toastmastersSpeakers', speakersString);

    this.ngOnInit();
    this.speechNo++;

  }

  getSpeakers(): Speaker[] {
    const toastmastersSpeakers = localStorage.getItem('toastmastersSpeakers');
    return toastmastersSpeakers ? JSON.parse(toastmastersSpeakers) : [];
  }

  clearStorage(): void {
    localStorage.removeItem('toastmastersSpeakers');
    this.speakers = [];
    this.ngOnInit();
  }
}
