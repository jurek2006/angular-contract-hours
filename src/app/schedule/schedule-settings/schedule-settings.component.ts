import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ScheduleService } from "src/app/services/schedule.service";
import { Moment } from "moment";
import * as moment from "moment";
import { ScheduleDay } from "../scheduleDay.model";

@Component({
  selector: "app-schedule-settings",
  templateUrl: "./schedule-settings.component.html",
  styleUrls: ["./schedule-settings.component.css"]
})
export class ScheduleSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  months: { firstDay: string; monthLabel: string }[]; // array of months to choose one //STOP - przenieść do interfejsu lub modelu
  // schedule: ScheduleDay[];
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
    const startDay = this.settingsForm.value.month; // get choosen month from selected option
    console.log(startDay);
    this.scheduleMonth = moment(startDay).format("MMMM YYYY"); // store selected month as string (for displaying)
    this.selectedMonth.emit(startDay);
  }

  submitSchedule(newSchedule: ScheduleDay[]) {
    // this.schedule = newSchedule;
    // this.printMode = true;
  }
}
