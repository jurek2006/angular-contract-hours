import { Component } from "@angular/core";
import { Moment } from "moment";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent {
  selectedMonth: Moment; // moment for beginning of selected month
  printMode: boolean;

  onSelectedMonth(selectedMonth: Moment) {
    this.selectedMonth = selectedMonth;
  }

  printModeChanged(newPrintModeStatus: boolean): void {
    this.printMode = newPrintModeStatus;
    console.log("print mode", this.printMode);
  }
}
