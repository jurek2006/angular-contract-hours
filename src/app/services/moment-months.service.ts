import { Injectable } from "@angular/core";
import { Month } from "../shared/month";
import moment from "moment";
import { Moment } from "moment";

@Injectable({
  providedIn: "root"
})
export class MomentMonthsService {
  private monthLabelFormat = "MMMM YYYY";
  private months: Month[];

  private generateMonths(amount: number = 12): void {
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

    this.months = months;
  }

  public getMonths(): Month[] {
    if (!this.months) {
      this.generateMonths();
    }

    return this.months;
  }

  public getMonthLabel(day: Moment): string {
    // returns month string label for given moment day
    // i.e. for 1.05.2019 returns may 2019 (or maj 2019 ect. depending on defined moment locale and defined label format)
    return day.format(this.monthLabelFormat);
  }
}
