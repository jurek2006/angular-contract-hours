import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ScheduleService } from "src/app/services/schedule.service";
import { Month } from "src/app/shared/month";
import { Moment } from "moment";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MomentMonthsService } from "src/app/services/moment-months.service";

@Component({
  selector: "app-schedule-settings",
  templateUrl: "./schedule-settings.component.html",
  styleUrls: ["./schedule-settings.component.css"]
})
export class ScheduleSettingsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  settingsForm: FormGroup;
  months: Month[];
  areSettingsSubmitted = false;
  contractorName: string;

  @Input() settings: any;
  @Output() settingsChange = new EventEmitter<any>();

  constructor(private momentMonthsService: MomentMonthsService) {}

  ngOnInit() {
    this.initSettingsForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initSettingsForm(): void {
    const contractorNameInit = this.settings
      ? this.settings.contractorName
      : "";

    this.months = this.momentMonthsService.getMonths();

    const selectedMonthInit =
      this.settings && this.settings.selectedMonth
        ? this.settings.selectedMonth
        : this.months[0].firstDay;

    this.settingsForm = new FormGroup({
      contractorName: new FormControl(contractorNameInit, Validators.required),
      selectedMonth: new FormControl({
        value: selectedMonthInit,
        disabled: false
      })
    });

    if (
      // disable form if contractor name and month submited already by user
      this.settings &&
      this.settings.contractorName &&
      this.settings.selectedMonth
    ) {
      this.settingsForm.disable();
    }
  }

  onFormSubmit() {
    if (this.settingsForm.valid) {
      this.settingsChange.emit(this.settingsForm.value);
      this.settingsForm.disable();
    }
  }

  onAllowEditing() {
    this.settingsForm.enable();
  }
}
