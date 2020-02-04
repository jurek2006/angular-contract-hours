import { Component, Input } from '@angular/core';
import { ScheduleDay } from '../../../models/scheduleDay.model';

@Component({
  selector: 'app-schedule-print-render',
  templateUrl: './schedule-print-render.component.html',
  styleUrls: ['./schedule-print-render.component.css']
})
export class SchedulePrintRenderComponent {
  @Input() schedule: ScheduleDay[] = [];
  @Input() monthLabel: string = '';
  @Input() contractorNameLabel: string = '';
  @Input() totalHours: number = 0;
  constructor() {}
}
