import { Component } from "@angular/core";
import { Moment } from "moment";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent {
  selectedMonth: Moment; // moment for beginning of selected month
  isMonthSubmitted = false; // when month is submitted is not possible to change it
  contractorName: string;
  printMode = false;

  onSelectedMonth(selectedMonth: Moment) {
    this.selectedMonth = selectedMonth;
  }

  printModeChanged(newPrintModeStatus: boolean): void {
    this.printMode = newPrintModeStatus;
  }
}
