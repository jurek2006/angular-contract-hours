import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ScheduleComponent } from "./schedule.component";
import { ScheduleSettingsComponent } from "./schedule-settings/schedule-settings.component";
import { ScheduleEditComponent } from "./schedule-edit/schedule-edit.component";
import { SchedulePrintComponent } from "./schedule-print/schedule-print.component";
import { DisplayHoursPipe } from "./schedule-print/display-hours.pipe";
import { DisableControlDirective } from "./disable-control.directive";
import { ScheduleSummaryComponent } from "./schedule-edit/schedule-summary/schedule-summary.component";
import { MaterialModule } from "../shared/modules/material.module";

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleSettingsComponent,
    ScheduleEditComponent,
    SchedulePrintComponent,
    ScheduleSummaryComponent,
    DisplayHoursPipe,
    DisableControlDirective
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [ScheduleComponent]
})
export class ScheduleModule {}
