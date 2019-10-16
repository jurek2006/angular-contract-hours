import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { SummarySettingsService } from 'src/app/services/summary-settings.service';
import { SummarySettings } from '../../models/summarySettings.model';
import { scheduleSummaryFormValidator } from './schedule-summary-form-validator.directive';

@Component({
  selector: 'app-schedule-summary',
  templateUrl: './schedule-summary.component.html',
  styleUrls: ['./schedule-summary.component.css']
})
export class ScheduleSummaryComponent implements OnInit, OnChanges {
  settings: SummarySettings;
  summaryForm: FormGroup;

  formChangesSubscription;

  @Input() totalHours: number;
  @Input() areAllDaysControlsValid: boolean;
  @Output() openPrint = new EventEmitter<void>();

  @HostBinding('class.mobileFullScreen') isMobileFullScreen = false;
  @ViewChild('f', { static: true }) ngForm: NgForm;

  constructor(private summarySettingsService: SummarySettingsService) {}

  ngOnInit() {
    this.initSettingsForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // when input value totalHours changed - update totalHoursCurrent value
    // (hidden input needed to validate if expected total hours match current scheduled)
    if (
      changes.totalHours &&
      !changes.totalHours.firstChange &&
      changes.totalHours.currentValue !== changes.totalHours.previousValue &&
      this.summaryForm &&
      this.summaryForm.get('totalHoursCurrent')
    ) {
      this.summaryForm
        .get('totalHoursCurrent')
        .setValue(changes.totalHours.currentValue);
    }
  }

  initSettingsForm(): void {
    this.settings = this.summarySettingsService.loadSettings();

    this.summaryForm = new FormGroup(
      {
        isTotalHoursDefined: new FormControl(this.settings.isTotalHoursDefined),
        totalHoursDefined: new FormControl(this.settings.totalHoursDefined),
        totalHoursCurrent: new FormControl({
          value: this.totalHours,
          disabled: true
        })
      },
      { validators: scheduleSummaryFormValidator }
    );
  }

  isTotalHoursEnabled(): boolean {
    return this.summaryForm.get('isTotalHoursDefined').value;
  }

  onGeneratePdf(): void {
    this.summarySettingsService.saveSettings(this.summaryForm.value);
    this.openPrint.emit();
  }

  onOpenMobileFullScreen(isOpenStatus: boolean): void {
    this.isMobileFullScreen = isOpenStatus;
  }

  private isErrorStatus(): boolean {
    return !this.areAllDaysControlsValid;
  }
}
