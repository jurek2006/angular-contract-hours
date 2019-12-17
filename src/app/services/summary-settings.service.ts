import { Injectable } from '@angular/core';
import { SummarySettings } from '../models/summarySettings.model';
import cloneDeep from 'lodash/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class SummarySettingsService {
  private summarySettings: SummarySettings = {
    isTotalHoursDefined: false,
    totalHoursDefined: 0
  };

  public saveSettings(newSummarySettings: SummarySettings): void {
    this.summarySettings = newSummarySettings;
  }

  public loadSettings(): SummarySettings {
    return cloneDeep(this.summarySettings);
  }
}
