import { Component } from "@angular/core";
import { Settings } from "./models/settings.model";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent {
  printMode = false;
  settings: Settings;

  printModeChanged(newPrintModeStatus: boolean): void {
    this.printMode = newPrintModeStatus;
  }
}
