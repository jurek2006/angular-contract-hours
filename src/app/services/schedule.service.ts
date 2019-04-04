import { Injectable } from "@angular/core";
import { Moment } from "moment";
import * as moment from "moment";
import { ScheduleDay } from "../schedule/scheduleDay.model";

@Injectable({
  providedIn: "root"
})
export class ScheduleService {
  private schedule = [];

  constructor() {}

  public setMomentLocale(locale: string = "pl") {
    /* sets locale for moment used in schedule */
    moment.locale(locale);
  }

  public initSchedule(startDateString: string): ScheduleDay[] {
    /* generates empty schedule for given month */

    const start: Moment = moment(startDateString); // converts first day to moment

    this.schedule = [];
    for (let i = 0; i < start.daysInMonth(); i++) {
      const day = start.clone().add(i, "days");

      this.schedule = [
        ...this.schedule,
        new ScheduleDay(
          day.format("D.MM"),
          day.format("dd"),
          day.day() === 6 || day.day() === 0 ? true : false,
          0
        )
      ];
    }

    return this.getSchedule();
  }

  public getSchedule(): ScheduleDay[] {
    return JSON.parse(JSON.stringify(this.schedule));
  }

  public fillSchedule(
    hoursPerMonth: number,
    maxHoursDaily: number,
    minHoursDaily?: number
  ) {
    // check how many days needed if we use only maxHoursDaily
    let daysNeeded = Math.floor(hoursPerMonth / maxHoursDaily);
    if (hoursPerMonth % maxHoursDaily > 0) {
      daysNeeded += 1;
    }
    if (daysNeeded > this.getAvailableDays().length) {
      console.log("Not enough days");
    } else {
      console.log("ok");
    }

    while (hoursPerMonth - this.sumHoursInSchedule() > 0) {
      let hours;
      if (hoursPerMonth - this.sumHoursInSchedule() >= maxHoursDaily) {
        hours = maxHoursDaily;
      } else {
        hours = hoursPerMonth - this.sumHoursInSchedule();
      }
      const availableDays = this.getAvailableDays();
      const randomDayIndex = Math.floor(Math.random() * availableDays.length);
      this.setHoursForDay(hours, randomDayIndex, availableDays);
      console.log("Zostało", hoursPerMonth - this.sumHoursInSchedule());
    }
  }

  private getAvailableDays() {
    // gets array of only available days
    return this.schedule.filter(day => {
      return !day.disabled && day.hours === 0;
    });
  }

  private setHoursForDay(hours: number, dayIndex: number, schedule: any) {
    // const previousDayData = schedule[dayIndex];
    schedule[dayIndex].hours = hours;
  }

  private sumHoursInSchedule(): number {
    return +this.schedule.reduce(
      (previous, currentDay) => previous + currentDay.hours,
      0
    );
  }

  public getMonths(
    amount: number = 6
  ): { firstDay: string; monthLabel: string }[] {
    /* * generates and returns months for select options
        each element contains monthLabel (seen by user)
        and firstDay string which will be easly converted to moment's day
    */
    let months: { firstDay: string; monthLabel: string }[] = [];

    const today = moment().startOf("month");

    for (let i = 0; i < amount; i++) {
      months = [
        ...months,
        {
          firstDay: today
            .clone()
            .subtract(i, "months")
            .format(),
          monthLabel: today
            .clone()
            .subtract(i, "months")
            .format("MMMM YYYY")
        }
      ];
    }

    return months;
  }
}
