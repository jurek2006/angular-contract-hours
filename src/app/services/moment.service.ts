import { Injectable } from '@angular/core';
import { Month } from '../shared/month';
import moment from 'moment';
import { Moment } from 'moment';
import cloneDeep from 'lodash/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private monthLabelFormat = 'MMMM YYYY';
  private months: Month[];

  public getMonths(): Month[] {
    // gets generated months for populating month picker select
    if (!this.months) {
      this.generateMonths();
    }

    return cloneDeep(this.months);
  }

  public getMonthLabel(day: Moment): string {
    // returns month string label for given moment day
    // i.e. for 1.05.2019 returns may 2019 (or maj 2019 ect. depending on defined moment locale and defined label format)
    return day.format(this.monthLabelFormat);
  }

  public setMomentLocale(locale: string = 'pl') {
    /* sets locale for moment used in application */
    moment.locale(locale);
  }

  private generateMonths(amount: number = 12): void {
    // generate months options for select element
    // every month item contains:
    //  firstDay - moment for first day of given month
    //  monthLabel - string label

    let months: Month[] = [];

    const currentMonthStart = moment().startOf('month');

    for (let i = 0; i < amount; i++) {
      const firstDayOfMonth = currentMonthStart.clone().subtract(i, 'months');
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
}
