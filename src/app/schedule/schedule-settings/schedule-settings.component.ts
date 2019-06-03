import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ScheduleService } from "src/app/services/schedule.service";
import { Month } from "src/app/shared/month";
import { Moment } from "moment";

@Component({
  selector: "app-schedule-settings",
  templateUrl: "./schedule-settings.component.html",
  styleUrls: ["./schedule-settings.component.css"]
})
export class ScheduleSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  months: Month[];

  @Input() isMonthSubmitted: boolean;
  @Output() isMonthSubmittedChange = new EventEmitter<boolean>();
  @Input() selectedMonth: Moment;
  @Output() selectedMonthEvent = new EventEmitter<string>();

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.months = this.scheduleService.getMonths(); // generates array of months to populate select's options
    this.settingsForm = new FormGroup({
      month: new FormControl({
        value: this.months[0].firstDay,
        disabled: false
      }) // by default selects first element, first month hence
    });
  }

  onSubmit() {
    this.selectedMonthEvent.emit(this.settingsForm.value.month); // emits choosen month from selected option
    this.isMonthSubmittedChange.emit(true);
  }

  onUnsubmit() {
    this.isMonthSubmittedChange.emit(false);
  }
}
