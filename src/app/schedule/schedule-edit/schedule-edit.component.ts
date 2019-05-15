import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormArray, FormGroup, FormControl } from "@angular/forms";
import { ScheduleDay } from "../scheduleDay.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-schedule-edit",
  templateUrl: "./schedule-edit.component.html",
  styleUrls: ["./schedule-edit.component.css"]
})
export class ScheduleEditComponent implements OnInit, OnChanges {
  @Input() schedule: ScheduleDay[];
  scheduleForm: FormGroup;
  formWatchSubscription: Subscription;
  formDaysSubscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
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
    let daysFields = new FormArray([]);

    if (this.schedule) {
      for (let day of this.schedule) {
        daysFields.push(
          new FormGroup({
            date: new FormControl({ value: day.date, disabled: false }),
            weekday: new FormControl({ value: day.weekday, disabled: false }),
            disabled: new FormControl({
              value: day.disabled,
              disabled: false
            }),
            hours: new FormControl({
              value: day.hours,
              disabled: day.disabled
            })
          })
        );
      }
    }

    // create main form with days FormArray and field totalHours
    this.scheduleForm = new FormGroup({
      totalHours: new FormControl({ value: 0, disabled: false }),
      days: daysFields
    });

    // subscribe to watch chenges in form fields values - to sum total hours
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
          const changedControl = (<FormArray>this.scheduleForm.get("days"))
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

  public onSubmit() {}

  public getControls() {
    return (<FormArray>this.scheduleForm.get("days")).controls;
  }
}
