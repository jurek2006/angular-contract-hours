import { Component, OnInit } from "@angular/core";
import { ScheduleDay } from "./scheduleDay.model";
import { ScheduleService } from "../services/schedule.service";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent implements OnInit {
  selectedMonth = "";
  submittedSchedule: ScheduleDay[];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {}

  onSelectedMonth(selectedMonth: string) {
    this.selectedMonth = selectedMonth;
  }

  submitSchedule(submittedSchedule: ScheduleDay[]): void {
    this.submittedSchedule = submittedSchedule;
    // this.printMode = true;
    // console.log(this.printMode);
  }

  closePrintView() {
    // this.printMode = false;
  }
}
