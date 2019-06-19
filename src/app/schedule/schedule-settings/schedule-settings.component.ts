import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Month } from "src/app/shared/month";
import { MomentMonthsService } from "src/app/services/moment-months.service";
import { Settings } from "../models/settings.model";

@Component({
  selector: "app-schedule-settings",
  templateUrl: "./schedule-settings.component.html",
  styleUrls: ["./schedule-settings.component.css"]
})
export class ScheduleSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  months: Month[];

  @Input() settings: Settings;
  @Output() settingsChange = new EventEmitter<Settings>();

  constructor(private momentMonthsService: MomentMonthsService) {}

  ngOnInit() {
    this.initSettingsForm();
  }

  initSettingsForm(): void {
    const contractorNameInit = this.settings
      ? this.settings.contractorName
      : "";

    this.months = this.momentMonthsService.getMonths();

    // set default or chosen month in select element
    const selectedMonthInit =
      this.settings && this.settings.selectedMonth
        ? this.settings.selectedMonth
        : this.months[0].firstDay; // if there isn't selectedMonth - select first of generated months

    this.settingsForm = new FormGroup({
      contractorName: new FormControl(contractorNameInit, Validators.required),
      selectedMonth: new FormControl({
        value: selectedMonthInit,
        disabled: false
      })
    });

    if (
      // disable form if contractor name and month submited already by user
      this.settings &&
      this.settings.contractorName &&
      this.settings.selectedMonth
    ) {
      this.settingsForm.disable();
    }
  }

  onFormSubmit() {
    if (this.settingsForm.valid) {
      this.settingsChange.emit(this.settingsForm.value);
      this.settingsForm.disable();
    }
  }

  onAllowEditing() {
    this.settingsForm.enable();
  }
}
