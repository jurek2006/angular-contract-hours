import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-schedule-summary",
  templateUrl: "./schedule-summary.component.html",
  styleUrls: ["./schedule-summary.component.css"]
})
export class ScheduleSummaryComponent implements OnInit {
  @Input() totalHours: number;
  @Input() areAllDaysControlsValid: boolean;
  @Output() openPrint = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onOpenPrint(): void {
    this.openPrint.emit();
  }

  private isErrorStatus(): boolean {
    return !this.areAllDaysControlsValid;
  }
}
