import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { FormArray, FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ScheduleService } from "src/app/services/schedule.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ScheduleDay } from "../models/scheduleDay.model";
import { Settings } from "../models/settings.model";

@Component({
  selector: "app-schedule-edit",
  templateUrl: "./schedule-edit.component.html",
  styleUrls: ["./schedule-edit.component.css"]
})
export class ScheduleEditComponent implements OnInit, OnDestroy, OnChanges {
  private ngUnsubscribe = new Subject();
  schedule: ScheduleDay[];

  @Input() settings: Settings;
  @Output() printModeChanged = new EventEmitter<boolean>(); // fired when printMode turned on/off

  printMode = false;
  scheduleForm: FormGroup;
  formWatchSubscription: Subscription;
  formDaysSubscriptions: Subscription[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // reinit scheduleForm only when selectedMonth was changed or selected for the first time
    if (
      this.settings.selectedMonth &&
      (changes.settings.firstChange ||
        changes.settings.currentValue.selectedMonth !==
          changes.settings.previousValue.selectedMonth)
    ) {
      this.schedule = this.scheduleService.initSchedule(
        this.settings.selectedMonth
      );
      this.initScheduleForm();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initScheduleForm(): void {
    // unsubscribe curren watching form subscription, if there is any
    if (this.formWatchSubscription) {
      this.formWatchSubscription.unsubscribe();
    }

    // unsubscribe all subscriptions from FormArray (watching if day is disabled/enabled)
    if (this.formDaysSubscriptions && this.formDaysSubscriptions.length > 0) {
      this.formDaysSubscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
      this.formDaysSubscriptions = [];
    }

    // --- form creation

    // create FormArray for each day in given this.schedule
    const daysFields = new FormArray([]);

    if (this.schedule) {
      for (const day of this.schedule) {
        daysFields.push(
          new FormGroup({
            date: new FormControl({ value: day.date, disabled: false }),
            weekday: new FormControl({ value: day.weekday, disabled: false }),
            workingDay: new FormControl({
              value: day.workingDay,
              disabled: false
            }),
            hours: new FormControl(
              {
                value: day.hours,
                disabled: !day.workingDay
              },
              [Validators.min(0), Validators.max(24)]
            )
          })
        );
      }
    }

    // create main form with days FormArray and field totalHours
    this.scheduleForm = new FormGroup({
      totalHours: new FormControl({ value: 0, disabled: true }),
      days: daysFields
    });

    // subscribe to watch changes in form fields values - to sum total hours
    this.formWatchSubscription = this.scheduleForm.controls.days.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        const sum = this.scheduleForm.value.days
          .map(day => (day.hours > 0 ? day.hours : 0))
          .reduce((a, b) => a + b);
        this.scheduleForm.get("totalHours").setValue(sum);
      });

    // subscribe to watch only 'workingDay' control (binded with select in form) in each group in FormArray
    this.getDaysControls().forEach((control: FormControl, index: number) => {
      const subscription: Subscription = control
        .get("workingDay")
        .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(newWorkingDayStatus => {
          const changedControl = (this.scheduleForm.get("days") as FormArray)
            .controls[index];

          // if "day" changed to non working set hours to 0 and disable hours control
          // otherwise enable hours control
          if (!newWorkingDayStatus) {
            changedControl.patchValue({
              hours: "0"
            });
            changedControl.get("hours").disable();
          } else {
            changedControl.get("hours").enable();
          }
        });

      // add subscription to subscriptions array to unsubscribe later easly
      this.formDaysSubscriptions.push(subscription);
    });
  }

  public getDaysControls() {
    return (this.scheduleForm.get("days") as FormArray).controls;
  }

  private areAllDaysControlsValid() {
    return this.scheduleForm.get("days").valid;
  }

  private getTotalScheduledHours() {
    return this.scheduleForm.get("totalHours").value;
  }

  public onPrint() {
    // submitting schedule form and going to "printing" - exporting printable pdf
    this.printMode = true;
    this.schedule = this.scheduleForm.value.days;
    this.printModeChanged.emit(this.printMode);
  }

  public onClosePrint(): void {
    this.printMode = false;
    this.printModeChanged.emit(this.printMode);
  }
}
