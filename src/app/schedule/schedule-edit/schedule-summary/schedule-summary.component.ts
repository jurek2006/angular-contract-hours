import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-schedule-summary',
  templateUrl: './schedule-summary.component.html',
  styleUrls: ['./schedule-summary.component.css']
})
export class ScheduleSummaryComponent implements OnInit {
  @Input() totalHours: number;
  @Input() areAllDaysControlsValid: boolean;
  @Output() openPrint = new EventEmitter<void>();

  @HostBinding('class.mobileFullScreen') isMobileFullScreen = false;

  constructor() {}

  ngOnInit() {}

  onGeneratePdf(form: NgForm): void {
    this.openPrint.emit();
  }

  onOpenMobileFullScreen(isOpenStatus: boolean): void {
    this.isMobileFullScreen = isOpenStatus;
  }

  private isErrorStatus(): boolean {
    return !this.areAllDaysControlsValid;
  }
}
