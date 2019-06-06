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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [ScheduleComponent]
})
export class ScheduleModule {}
