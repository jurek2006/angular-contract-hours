import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { FormArray, FormGroup, FormControl, Validators } from "@angular/forms";
import { ScheduleDay } from "../scheduleDay.model";
import { Subscription } from "rxjs";
import { ScheduleService } from "src/app/services/schedule.service";
import { Moment } from "moment";

@Component({
  selector: "app-schedule-edit",
  templateUrl: "./schedule-edit.component.html",
  styleUrls: ["./schedule-edit.component.css"]
})
export class ScheduleEditComponent implements OnInit, OnChanges {
  schedule: ScheduleDay[];

  @Input() selectedMonth: Moment;
  @Output() printModeChanged = new EventEmitter<boolean>(); // fired when printMode turned on/off

  printMode = false;
  scheduleForm: FormGroup;
  formWatchSubscription: Subscription;
  formDaysSubscriptions: Subscription[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.schedule = this.scheduleService.initSchedule(this.selectedMonth);
    this.initScheduleForm();
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
            disabled: new FormControl({
              value: day.disabled,
              disabled: false
            }),
            hours: new FormControl(
              {
                value: day.hours,
                disabled: day.disabled
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
    this.formWatchSubscription = this.scheduleForm.controls.days.valueChanges.subscribe(
      value => {
        const sum = this.scheduleForm.value.days
          .map(day => (day.hours > 0 ? day.hours : 0))
          .reduce((a, b) => a + b);
        this.scheduleForm.get("totalHours").setValue(sum);
      }
    );

    // subscribe to watch only disabled control (binded with select in form) in each group in FormArray
    this.getControls().forEach((control: FormControl, index: number) => {
      const subscription: Subscription = control
        .get("disabled")
        .valueChanges.subscribe(value => {
          const changedControl = (this.scheduleForm.get("days") as FormArray)
            .controls[index];

          // if "day" changed to disabled set hours to 0 and disable hours control
          // otherwise enable hours control
          if (value) {
            changedControl.patchValue({
              hours: 0
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

  public getControls() {
    return (this.scheduleForm.get("days") as FormArray).controls;
  }

  public onPrint() {
    // submitting schedule form and going to "printing it" - exportint printable pdf
    this.printMode = true;
    this.schedule = this.scheduleForm.value.days;
    this.printModeChanged.emit(this.printMode);
  }

  public onClosePrint(): void {
    this.printMode = false;
    this.printModeChanged.emit(this.printMode);
  }

  public getSelectedMonthLabel(): string {
    return this.scheduleService.getMonthLabel(this.selectedMonth);
  }
}
