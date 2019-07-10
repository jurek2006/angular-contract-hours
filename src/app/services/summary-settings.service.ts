import { Injectable } from '@angular/core';
import { SummarySettings } from '../schedule/models/summarySettings.model';
import cloneDeep from 'lodash/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class SummarySettingsService {
  private summarySettings: SummarySettings = {
    isTotalHoursDefined: false,
    totalHoursDefined: 0
  };

  constructor() {}

  public saveSettings(newSummarySettings: SummarySettings): void {
    this.summarySettings = newSummarySettings;
  }

  public loadSettings(): SummarySettings {
    return cloneDeep(this.summarySettings);
  }
}
