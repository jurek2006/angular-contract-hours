import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ScheduleService } from "src/app/services/schedule.service";
import { Month } from "src/app/shared/month";

@Component({
  selector: "app-schedule-settings",
  templateUrl: "./schedule-settings.component.html",
  styleUrls: ["./schedule-settings.component.css"]
})
export class ScheduleSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  months: Month[]; // array of months to choose one //STOP - przenieść do interfejsu lub modelu
  scheduleMonth: string; // stores chosen month & year for printing on schedule

  @Output() selectedMonth = new EventEmitter<string>();

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.months = this.scheduleService.getMonths(); // generated array of months to populate select's options
    this.settingsForm = new FormGroup({
      month: new FormControl(this.months[0].firstDay) // by default selects first element, first month hence
    });
  }

  onSubmit() {
    this.selectedMonth.emit(this.settingsForm.value.month); // emits choosen month from selected option
  }
}
