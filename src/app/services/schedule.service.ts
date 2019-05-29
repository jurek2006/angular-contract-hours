import { Injectable } from "@angular/core";
import { Moment } from "moment";
import * as moment from "moment";
import { ScheduleDay } from "../schedule/scheduleDay.model";
import { Month } from "../shared/month";

@Injectable({
  providedIn: "root"
})
export class ScheduleService {
  private schedule = [];
  private monthLabelFormat = "MMMM YYYY"; // moment format to generate month label string

  constructor() {}

  public setMomentLocale(locale: string = "pl") {
    /* sets locale for moment used in schedule */
    moment.locale(locale);
  }

  public initSchedule(startDateMoment: Moment): ScheduleDay[] {
    /* generates empty schedule for given month */

    this.schedule = [];
    for (let i = 0; i < startDateMoment.daysInMonth(); i++) {
      const day = startDateMoment.clone().add(i, "days");

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

  public getMonths(amount: number = 12): Month[] {
    /* * generates and returns months for select options
        each element contains monthLabel (seen by user)
        and firstDay which is Moment of first day of given month
    */
    let months: Month[] = [];

    const currentMonthStart = moment().startOf("month");

    for (let i = 0; i < amount; i++) {
      const firstDayOfMonth = currentMonthStart.clone().subtract(i, "months");
      months = [
        ...months,
        {
          firstDay: firstDayOfMonth,
          monthLabel: this.getMonthLabel(firstDayOfMonth)
        }
      ];
    }

    return months;
  }

  public getMonthLabel(day: Moment): string {
    // returns month string label for given moment day
    // i.e. for 1.05.2019 returns may 2019 (or maj 2019 ect. depending on defined moment locale and defined label format)
    return day.format(this.monthLabelFormat);
  }
}
