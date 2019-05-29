import { Component, OnInit } from "@angular/core";
import { ScheduleDay } from "./scheduleDay.model";
import { ScheduleService } from "../services/schedule.service";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent implements OnInit {
  selectedMonth: string;

  ngOnInit() {}

  onSelectedMonth(selectedMonth: string) {
    this.selectedMonth = selectedMonth;
  }
}
