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
import moment = require("moment");

@Component({
  selector: "app-schedule-settings",
  templateUrl: "./schedule-settings.component.html",
  styleUrls: ["./schedule-settings.component.css"]
})
export class ScheduleSettingsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  // monthPickerForm: FormGroup; // TEMP - wywalić
  // contractorForm: FormGroup; // TEMP - wywalić
  settingsForm: FormGroup;
  months: Month[];
  areSettingsSubmitted = false;
  contractorName: string;

  @Input() settings: any;
  @Output() settingsChange = new EventEmitter<any>();
  // @Input() isMonthSubmitted: boolean;
  // @Output() isMonthSubmittedChange = new EventEmitter<boolean>();
  // @Input() selectedMonth: Moment;
  // @Output() selectedMonthChange = new EventEmitter<Moment>();
  // @Input() contractorName: string;
  // @Output() contractorNameChange = new EventEmitter<string>();

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    // this.initMonthPickerForm();
    // this.initContractorForm();
    this.initSettingsForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initSettingsForm(): void {
    const gotxxx = this.scheduleService.getMonths(
      12,
      this.settings ? this.settings.selectedMonth : undefined
    ); // generates array of months to populate select's options

    this.months = gotxxx.list;

    const contractorNameInit = this.settings
      ? this.settings.contractorName
      : "";

    const selectedMonthInit = gotxxx.selected
      ? gotxxx.selected.firstDay
      : this.months[0].firstDay;

    console.log(
      "settings",
      this.settings && this.settings.selectedMonth
        ? this.settings.selectedMonth
        : "undefined"
    );
    console.log("first day", this.months[0].firstDay);

    this.settingsForm = new FormGroup({
      contractorName: new FormControl(contractorNameInit, Validators.required),
      selectedMonth: new FormControl({
        value: selectedMonthInit,
        disabled: false
      })
    });
  }

  onFormSubmit() {
    if (this.settingsForm.valid) {
      this.areSettingsSubmitted = true;
      this.settingsChange.emit(this.settingsForm.value);
    }
  }

  onAllowEditing() {
    console.log("allow editing");
    this.areSettingsSubmitted = false;
  }

  // --- WYWALIĆ

  // initMonthPickerForm(): void {
  //   this.months = this.scheduleService.getMonths(); // generates array of months to populate select's options
  //   this.monthPickerForm = new FormGroup({
  //     month: new FormControl({
  //       value: this.months[0].firstDay,
  //       disabled: false
  //     }) // by default selects first element, first month hence
  //   });
  // }

  // initContractorForm(): void {
  //   this.contractorForm = new FormGroup({
  //     contractorName: new FormControl(this.contractorName, Validators.required)
  //   });

  //   this.contractorForm
  //     .get("contractorName")
  //     .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe(value => {
  //       this.contractorNameChange.emit(value);
  //     });
  // }

  // -------------------------

  // onSubmit() {
  //   this.selectedMonthChange.emit(this.monthPickerForm.value.month); // emits choosen month from selected option
  //   this.isMonthSubmittedChange.emit(true);
  // }

  // onUnsubmit() {
  //   this.isMonthSubmittedChange.emit(false);
  // }
}
