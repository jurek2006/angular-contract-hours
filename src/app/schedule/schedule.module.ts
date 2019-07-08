import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/modules/material.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleSettingsComponent } from './schedule-settings/schedule-settings.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { ScheduleSummaryComponent } from './schedule-edit/schedule-summary/schedule-summary.component';
import { SchedulePrintComponent } from './schedule-print/schedule-print.component';
import { SchedulePrintRenderComponent } from './schedule-print/schedule-print-render/schedule-print-render.component';
import { DisplayHoursPipe } from './schedule-print/display-hours.pipe';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleSettingsComponent,
    ScheduleEditComponent,
    SchedulePrintComponent,
    ScheduleSummaryComponent,
    SchedulePrintRenderComponent,
    DisplayHoursPipe
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [ScheduleComponent]
})
export class ScheduleModule {}
