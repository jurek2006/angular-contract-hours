import { Injectable } from "@angular/core";
import { Moment } from "moment";
import * as moment from "moment";
import cloneDeep from "lodash/cloneDeep";

import { ScheduleDay } from "../schedule/models/scheduleDay.model";

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
          day.day() !== 6 && day.day() !== 0 ? true : false, // set default sat and sun as non working days
          0
        )
      ];
    }

    return this.getSchedule();
  }

  public getSchedule(): ScheduleDay[] {
    return cloneDeep(this.schedule);
  }
}
