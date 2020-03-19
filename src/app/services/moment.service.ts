import { Injectable } from '@angular/core';
import { Month } from '../shared/month';
import moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/pl';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private monthLabelFormat = 'MMMM YYYY';
  private months: Month[] | undefined;

  constructor() {
    /*
      if there's just one moment/locale imported (e.g. moment/locale/pl)
      it's not necessary to invoke this.setMomentLocale(language-code)
      - imported locale will be used

      if there's more than one locale imported - without using setMomentLocale()
      - last imported will be used

      before building the app (only) - imported locale file must be manually copied
      (from node_modules/moment/locale to src/locale)

      for development (only) - locale can be set with setMomentLocale() without any import
    */
    // this.setMomentLocale('es');
  }

  public getMonths(): Month[] {
    // gets generated months for populating month picker select
    if (!this.months) {
      this.generateMonths();
    }

    // tried to return deep copy of this.months - but it produced issue
    // when form was reinitiated and received already selected month (to be set in select field)
    // months in select were new objects (as it was deepCopy)
    // therefore select didn't work, because month never matched options in the select
    return this.months;
  }

  public getMonthLabel(day: Moment): string {
    // returns month string label for given moment day
    // i.e. for 1.05.2019 returns may 2019 (or maj 2019 ect. depending on defined moment locale and defined label format)
    return day.format(this.monthLabelFormat);
  }

  public setMomentLocale(locale: string = 'pl'): void {
    /* sets locale for moment used in application */
    moment.locale(locale);
  }

  private generateMonths(amount: number = 12): void {
    // generate months options for select element
    // every month item contains:
    //  firstDay - moment for first day of given month
    //  monthLabel - string label

    const months: Month[] = [];

    const currentMonthStart = moment().startOf('month');

    for (let i = 0; i < amount; i++) {
      const firstDay = currentMonthStart.clone().subtract(i, 'months');
      const monthLabel = this.getMonthLabel(firstDay);
      months.push({ firstDay, monthLabel });
    }

    this.months = months;
  }
}
