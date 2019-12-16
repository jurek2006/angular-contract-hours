import { Component } from '@angular/core';
import { Settings } from './models/settings.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  isPrintView = false;
  settings: Settings;

  isPrintViewChanged(newIsPrintViewStatus: boolean): void {
    this.isPrintView = newIsPrintViewStatus;
  }
}
