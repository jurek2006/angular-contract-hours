import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScheduleDay } from '../../models/scheduleDay.model';
import { Settings } from '../../models/settings.model';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnDestroy, OnChanges {
  public schedule: ScheduleDay[];
  public isPrintView = false;
  public scheduleForm: FormGroup;
  private ngUnsubscribe = new Subject();
  private formWatchSubscription: Subscription;
  private formDaysSubscriptions: Subscription[] = [];

  @Input() settings: Settings;
  @Output() isPrintViewChanged = new EventEmitter<boolean>(); // fired when isPrintView turned on/off

  constructor(private scheduleService: ScheduleService) {}

  ngOnChanges(changes: SimpleChanges) {
    // reinit scheduleForm only when selectedMonth was changed or selected for the first time
    const monthHasChanged =
      this.settings.selectedMonth &&
      (changes.settings.firstChange ||
        changes.settings.currentValue.selectedMonth !==
          changes.settings.previousValue.selectedMonth);

    if (monthHasChanged) {
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
    // create main form with days FormArray and field totalHours
    this.scheduleForm = new FormGroup({
      totalHours: new FormControl({ value: 0, disabled: true }),
      days: this.formGenerateDaysFieldsArray()
    });

    this.formSubscribeToSumHours();
    this.formSubscribeToWatchWorkingDayStatus();
  }

  private formGenerateDaysFieldsArray(): FormArray {
    // create FormArray for each day in given this.schedule
    const daysFields: FormArray = new FormArray([]);
    const getDayData = (
      value: string | number | boolean,
      disabled: boolean = false
    ) => ({
      value,
      disabled
    });

    if (this.schedule) {
      for (const day of this.schedule) {
        daysFields.push(
          new FormGroup({
            date: new FormControl(getDayData(day.date)),
            weekday: new FormControl(getDayData(day.weekday)),
            workingDay: new FormControl(getDayData(day.workingDay)),
            hours: new FormControl(getDayData(day.hours, !day.workingDay), [
              Validators.min(0),
              Validators.max(24)
            ])
          })
        );
      }
    }
    return daysFields;
  }

  private formSubscribeToSumHours(): void {
    // subscribe to watch changes in form fields values - to sum total hours

    // unsubscribe current watching form subscription, if there is any
    if (this.formWatchSubscription) {
      this.formWatchSubscription.unsubscribe();
    }

    // subscribe
    this.formWatchSubscription = this.scheduleForm.controls.days.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        // form data taken below from value instead of this.scheduleForm.value days
        // because value is updated whenever any input value is changed,
        // this.scheduleForm.value days only when input lost focus
        const sum = value
          .map(day => (day.hours > 0 ? day.hours : 0))
          .reduce((a, b) => a + b);
        this.scheduleForm.get('totalHours').setValue(sum);
      });
  }

  private formSubscribeToWatchWorkingDayStatus(): void {
    // subscribe to watch 'workingDay' control (enabling/disabling day) for each day in FormArray

    // unsubscribe all subscriptions from FormArray (watching if day is disabled/enabled)
    if (this.formDaysSubscriptions && this.formDaysSubscriptions.length > 0) {
      this.formDaysSubscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
      this.formDaysSubscriptions = [];
    }

    // subscribe to watch only 'workingDay' control for each day
    this.getDaysControls().forEach((control: FormControl, index: number) => {
      const subscription: Subscription = control
        .get('workingDay')
        .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(newWorkingDayStatus => {
          const changedControl = (this.scheduleForm.get('days') as FormArray)
            .controls[index];

          // if "day" changed to non working set hours to 0 and disable hours control
          // otherwise enable hours control
          if (!newWorkingDayStatus) {
            changedControl.patchValue({
              hours: '0'
            });
            changedControl.get('hours').disable();
          } else {
            changedControl.get('hours').enable();
          }
        });

      // add subscription to subscriptions array to unsubscribe later easly
      this.formDaysSubscriptions.push(subscription);
    });
  }

  public getDaysControls(): Array<AbstractControl> {
    return (this.scheduleForm.get('days') as FormArray).controls;
  }

  public areAllDaysControlsValid(): boolean {
    return this.scheduleForm.get('days').valid;
  }

  public getTotalScheduledHours(): number {
    return this.scheduleForm.get('totalHours').value;
  }

  public openPrintView(): void {
    // submitting schedule form and going to "printing" - exporting printable pdf
    this.isPrintView = true;
    this.schedule = this.scheduleForm.value.days;
    this.isPrintViewChanged.emit(this.isPrintView);
  }

  public closePrintView(): void {
    this.isPrintView = false;
    this.isPrintViewChanged.emit(this.isPrintView);
  }
}
