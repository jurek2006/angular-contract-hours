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
  settings: any;

  settingsChange(settings: any) {
    console.log("settings change", settings.month);
    this.selectedMonth = settings.selectedMonth;
    this.contractorName = settings.contractorName;
  }

  onSelectedMonth(selectedMonth: Moment) {
    console.log("selected month", selectedMonth);
    // this.selectedMonth = selectedMonth;
  }

  printModeChanged(newPrintModeStatus: boolean): void {
    this.printMode = newPrintModeStatus;
  }
}
