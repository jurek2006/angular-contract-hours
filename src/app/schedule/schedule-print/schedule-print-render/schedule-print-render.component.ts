import { Component, Input } from '@angular/core';
import { ScheduleDay } from '../../../models/scheduleDay.model';

@Component({
  selector: 'app-schedule-print-render',
  templateUrl: './schedule-print-render.component.html',
  styleUrls: ['./schedule-print-render.component.css']
})
export class SchedulePrintRenderComponent {
  @Input() schedule: ScheduleDay[] = [];
  @Input() monthLabel = '';
  @Input() contractorNameLabel = '';
  @Input() totalHours = 0;
  constructor() {}
}
