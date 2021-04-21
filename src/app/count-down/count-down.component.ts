import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;

  private dDay = new Date('Jan 01 2022 00:00:00');
  private millisecondsInASecond = 1000;
  private minutesInAnHour = 60;
  private secondsInAMinute = 60;

  private timeDiff!: number;
  public secondsToDDay!: number;
  public minutesToDDay!: number;

  constructor() { }

  ngOnInit(): void {
    this.subscription = interval(1000)
      .subscribe(x => this.getTimeDifference());
  }

  private getTimeDifference(): void {
    this.timeDiff = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDiff);
  }

  private allocateTimeUnits(timeDiff: number): void {
    this.secondsToDDay = Math.floor((timeDiff) / (this.millisecondsInASecond) % this.secondsInAMinute);
    this.minutesToDDay = Math.floor((timeDiff) / (this.millisecondsInASecond * this.minutesInAnHour) % this.secondsInAMinute);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
