import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { ScheduleDay } from "../scheduleDay.model";

@Component({
  selector: "app-schedule-print",
  templateUrl: "./schedule-print.component.html",
  styleUrls: ["./schedule-print.component.css"]
})
export class SchedulePrintComponent implements OnInit {
  @Input() schedule: ScheduleDay[];
  @Output() closePrint = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    console.log(this.schedule);
  }

  onClose() {
    this.closePrint.emit();
  }
}
