import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import cloneDeep from 'lodash/cloneDeep';

import { ScheduleDay } from '../schedule/models/scheduleDay.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private schedule: ScheduleDay[];
  private workingDaysIndexes: number[] = [1, 2, 3, 4, 5]; // default working days (as indexes, where 0 === sunday, ... 6 === saturday)

  constructor() {}

  public initSchedule(startDateMoment: Moment): ScheduleDay[] {
    /* generates empty schedule for given month */

    this.schedule = [];
    for (let i = 0; i < startDateMoment.daysInMonth(); i++) {
      const day = startDateMoment.clone().add(i, 'days');

      this.schedule = [
        ...this.schedule,
        new ScheduleDay(
          day.format('D.MM'),
          day.format('dd'),
          this.isDayWorking(day),
          0
        )
      ];
    }

    return this.getSchedule();
  }

  public getSchedule(): ScheduleDay[] {
    return cloneDeep(this.schedule);
  }

  public setWorkingDays(workingDaysIndexes: number[]) {
    this.workingDaysIndexes = workingDaysIndexes;
  }

  private isDayWorking(day: Moment): boolean {
    // returns if day is working
    return this.workingDaysIndexes.includes(day.day());
  }
}
