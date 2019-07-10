import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ViewChild
} from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { SummarySettingsService } from 'src/app/services/summary-settings.service';
import { SummarySettings } from '../../models/summarySettings.model';

@Component({
  selector: 'app-schedule-summary',
  templateUrl: './schedule-summary.component.html',
  styleUrls: ['./schedule-summary.component.css']
})
export class ScheduleSummaryComponent implements OnInit {
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
    console.log('settings', this.settings);
    this.initSettingsForm();
  }

  initSettingsForm(): void {
    this.settings = this.summarySettingsService.loadSettings();

    this.summaryForm = new FormGroup({
      isTotalHoursDefined: new FormControl(this.settings.isTotalHoursDefined),
      totalHoursDefined: new FormControl(this.settings.totalHoursDefined)
    });
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
