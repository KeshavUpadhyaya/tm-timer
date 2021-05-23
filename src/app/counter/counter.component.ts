import { Component, OnInit } from '@angular/core';
import IceBreaker from '../model/IceBreaker';
import PreparedSpeech from '../model/PreparedSpeech';
import Speaker from '../model/Speaker';
import Speech from '../model/Speech';
import { SpeechType } from '../model/SpeechType';
import TableTopics from '../model/TableTopics';

const TOASTMASTERS_SPEAKERS = 'toastmastersSpeakers';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  time!: number;
  display!: string;
  interval!: any;
  speakers: Speaker[] = [];
  speakerName!: string;
  speechType!: string;
  clockStopped!: boolean;
  speech!: Speech;
  speechTypeOptions = Object.values(SpeechType);


  ngOnInit(): void {
    this.time = 0;
    this.display = '00:00';
    this.speakerName = '';
    this.clockStopped = true;
    // console.log(this.speechTypeOptions);
  }


  startTimer(): void {
    // console.log('=====>');
    this.clockStopped = false;
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
    this.clockStopped = true;
    clearInterval(this.interval);
  }

  resetTimer(): void {
    const speaker: Speaker = {
      type: this.speechType,
      name: this.speakerName,
      time: this.display
    };

    const toastmastersSpeakers = localStorage.getItem(TOASTMASTERS_SPEAKERS);
    if (toastmastersSpeakers) {
      this.speakers = JSON.parse(toastmastersSpeakers);
    }

    this.speakers.push(speaker);
    const speakersString = JSON.stringify(this.speakers);
    localStorage.setItem(TOASTMASTERS_SPEAKERS, speakersString);

    this.ngOnInit();
  }

  getSpeakers(): Speaker[] {
    const toastmastersSpeakers = localStorage.getItem(TOASTMASTERS_SPEAKERS);
    return toastmastersSpeakers ? JSON.parse(toastmastersSpeakers) : [];
  }

  clearStorage(): void {
    localStorage.removeItem(TOASTMASTERS_SPEAKERS);
    this.speakers = [];
    this.ngOnInit();
  }

  onSpeechTypeChange(): void {
    console.log(this.speechType);
    switch (this.speechType) {
      case SpeechType.IceBreaker:
        this.speech = new IceBreaker();
        break;

      case SpeechType.PreparedSpeech:
        this.speech = new PreparedSpeech();
        break;

      case SpeechType.TableTopics:
        this.speech = new TableTopics();
        break;

      default:
        break;
    }
    console.log(this.speech);
  }

  getBackgroundColor(): string {

    if (!this.speech) {
      return '';
    }

    if (this.time >= this.speech.greenTime && this.time < this.speech.yellowTime) {
      return 'green';
    } else if (this.time >= this.speech.yellowTime && this.time < this.speech.redTime) {
      return 'yellow';
    } else if (this.time >= this.speech.redTime) {
      return 'red';
    }
    return '';
  }
}
