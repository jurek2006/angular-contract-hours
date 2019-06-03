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

@Component({
  selector: "app-schedule-settings",
  templateUrl: "./schedule-settings.component.html",
  styleUrls: ["./schedule-settings.component.css"]
})
export class ScheduleSettingsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  monthPickerForm: FormGroup;
  contractorForm: FormGroup;
  months: Month[];

  @Input() isMonthSubmitted: boolean;
  @Output() isMonthSubmittedChange = new EventEmitter<boolean>();
  @Input() selectedMonth: Moment;
  @Output() selectedMonthChange = new EventEmitter<string>();
  @Input() contractorName: string;
  @Output() contractorNameChange = new EventEmitter<string>();

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.initMonthPickerForm();
    this.initContractorForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initMonthPickerForm(): void {
    this.months = this.scheduleService.getMonths(); // generates array of months to populate select's options
    this.monthPickerForm = new FormGroup({
      month: new FormControl({
        value: this.months[0].firstDay,
        disabled: false
      }) // by default selects first element, first month hence
    });
  }

  initContractorForm(): void {
    this.contractorForm = new FormGroup({
      contractorName: new FormControl(this.contractorName, Validators.required)
    });

    this.contractorForm
      .get("contractorName")
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.contractorNameChange.emit(value);
      });
  }

  onSubmit() {
    this.selectedMonthChange.emit(this.monthPickerForm.value.month); // emits choosen month from selected option
    this.isMonthSubmittedChange.emit(true);
  }

  onUnsubmit() {
    this.isMonthSubmittedChange.emit(false);
  }
}
