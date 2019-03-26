import { Injectable } from "@angular/core";
import { Moment } from "moment";

@Injectable({
  providedIn: "root"
})
export class ScheduleService {
  private schedule = [];

  constructor() {}

  public initSchedule(startDate: Moment) {
    for (let i = 0; i < startDate.daysInMonth(); i++) {
      const day = startDate.clone().add(i, "days");

      this.schedule = [
        ...this.schedule,
        {
          date: day.format("D-MM"),
          disabled: day.day() === 6 || day.day() === 0 ? true : false,
          hours: 0
        }
      ];
    }
  }

  public getSchedule() {
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
}
