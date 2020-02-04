import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Month } from 'src/app/shared/month';
import { Settings } from '../../models/settings.model';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-schedule-settings',
  templateUrl: './schedule-settings.component.html',
  styleUrls: ['./schedule-settings.component.css']
})
export class ScheduleSettingsComponent implements OnInit {
  public settingsForm: FormGroup | undefined;
  public monthsForSelect: Month[] = [];

  @Input() settings: Settings | undefined;
  @Output() settingsChange = new EventEmitter<Settings>();

  constructor(private momentService: MomentService) {}

  ngOnInit() {
    this.initSettingsForm();
  }

  private initSettingsForm(): void {
    const settingsContractorName = this.settings && this.settings.contractorName;
    const contractorNameInit = settingsContractorName || localStorage.getItem('contractorNameStored') || '';

    this.monthsForSelect = this.momentService.getMonths();

    // set default or chosen month in select element
    const settingSelectedMonth = this.settings && this.settings.selectedMonth;
    const selectedMonthInit = settingSelectedMonth || this.monthsForSelect[0].firstDay; // if there isn't selectedMonth - select first of generated monthsForSelect

    this.settingsForm = new FormGroup({
      contractorName: new FormControl(contractorNameInit, Validators.required),
      selectedMonth: new FormControl({
        value: selectedMonthInit,
        disabled: false
      })
    });

    // detect if contractor name and month already given (form have been already submited by user)
    if (settingsContractorName && settingSelectedMonth) {
      this.settingsForm.disable();
    }
  }

  public submitSettingsForm(): void {
    if (this.settingsForm.valid) {
      this.settingsChange.emit(this.settingsForm.value);
      this.settingsForm.disable();
      // save contractor name in local storage (used only for the user convenience - to persist in browser)
      localStorage.setItem(
        'contractorNameStored',
        this.settingsForm.get('contractorName').value
      );
    }
  }

  public allowSettingsFormEditing(): void {
    this.settingsForm.enable();
  }
}
