import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SummarySettingsService } from 'src/app/services/summary-settings.service';
import { SummarySettings } from '../../../models/summarySettings.model';
import { scheduleSummaryFormValidator } from './schedule-summary-form-validator.directive';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-schedule-summary',
  templateUrl: './schedule-summary.component.html',
  styleUrls: ['./schedule-summary.component.css']
})
export class ScheduleSummaryComponent implements OnInit, OnChanges {
  private summarySettings: SummarySettings | undefined;
  public summaryForm: FormGroup | undefined;

  // raczej praktyką jest by inputs/outputs były na samej górze komponentu
  // więc sugeruję przenieść je na samą górę i w innych plikach zrobić podobnie
  @Input() totalHours: number | undefined; // lub przypisz wartość domyślną
  @Input() areAllDaysControlsValid: boolean; // jak wyżej
  @Output() openPrint = new EventEmitter<void>();

  @HostBinding('class.mobileSummaryOpened') isSummaryOpenedOnMobile = false;

  constructor(private summarySettingsService: SummarySettingsService) {}

  ngOnInit() {
    this.initSummaryForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // when input value totalHours changed (user has changed assigned working hours in current month)
    // - update totalHoursCurrent value
    // (totalHoursCurrent is hidden input in summaryForm needed to validate if expected total hours match currently scheduled)

    // rozbiłbym to na kilka warunków bo ciężko zrozumieć co się tutaj dzieje ;)
    const isTotalHoursChanged =
      changes.totalHours &&
      !changes.totalHours.firstChange &&
      changes.totalHours.currentValue !== changes.totalHours.previousValue;

    const totalHoursCurrent = isTotalHoursChanged && this.summaryForm && this.summaryForm.get('totalHoursCurrent');
    if (totalHoursCurrent) {
        totalHoursCurrent.setValue(changes.totalHours.currentValue);
    }
  }

  private initSummaryForm(): void {
    this.summarySettings = this.summarySettingsService.loadSettings();


    // przepisałbym to w taki sposób dla zwikszenia czytelności:
    const isTotalHoursDefined = new FormControl(this.summarySettings.isTotalHoursDefined);
    const totalHoursDefined = new FormControl(this.summarySettings.totalHoursDefined,  [
      Validators.min(0),
      Validators.max(31 * 24) // maximum possible hours in a month
    ]);
    const totalHoursCurrent = new FormControl({
      value: this.totalHours,
      disabled: true
    });
    this.summaryForm = new FormGroup(
      {
        isTotalHoursDefined,
        totalHoursDefined,
        totalHoursCurrent
      },
      { validators: scheduleSummaryFormValidator }
    );
  }

  public isTotalHoursDefinedEnabled(): boolean {
    return this.summaryForm.get('isTotalHoursDefined').value;
  }

  public saveSettingsAndOpenPrintView(): void {
    this.summarySettingsService.saveSettings(this.summaryForm.value);
    this.openPrint.emit();
  }

  public openSummaryOnMobile(): void {
    this.isSummaryOpenedOnMobile = true;
  }

  public closeSummaryOnMobile(): void {
    this.isSummaryOpenedOnMobile = false;
  }

  public isErrorStatus(): boolean {
    return !this.areAllDaysControlsValid;
  }

  public resetAmountIfTotalHoursDisabled(event: MatCheckboxChange): void {
    if (!event.checked) {
      this.summaryForm.get('totalHoursDefined').setValue(0);
    }
  }
}
