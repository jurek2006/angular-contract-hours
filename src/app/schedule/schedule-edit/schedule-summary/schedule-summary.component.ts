import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from "@angular/core";

@Component({
  selector: "app-schedule-summary",
  templateUrl: "./schedule-summary.component.html",
  styleUrls: ["./schedule-summary.component.css"]
})
export class ScheduleSummaryComponent implements OnInit {
  @Input() totalHours: number;
  @Input() areAllDaysControlsValid: boolean;
  @Output() openPrint = new EventEmitter<void>();

  @HostBinding("class.mobileFullScreen") isMobileFullScreen = false;

  constructor() {}

  ngOnInit() {}

  onOpenPrint(): void {
    this.openPrint.emit();
  }

  onOpenMobileFullScreen(): void {
    this.isMobileFullScreen = true;
  }

  private isErrorStatus(): boolean {
    return !this.areAllDaysControlsValid;
  }
}
