import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HoursDisplayPipe } from "./hours-display.pipe";
import { ScheduleComponent } from "./schedule/schedule.component";
import { ScheduleSettingsComponent } from "./schedule/schedule-settings/schedule-settings.component";
import { ScheduleEditComponent } from './schedule/schedule-edit/schedule-edit.component';
import { SchedulePrintComponent } from './schedule/schedule-print/schedule-print.component';
import { DisplayHoursPipe } from './schedule/schedule-print/display-hours.pipe';
import { DisableControlDirective } from './schedule/disable-control.directive';
import { ScheduleSummaryComponent } from './schedule/schedule-edit/schedule-summary/schedule-summary.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HoursDisplayPipe,
    ScheduleComponent,
    ScheduleSettingsComponent,
    ScheduleEditComponent,
    SchedulePrintComponent,
    DisplayHoursPipe,
    DisableControlDirective,
    ScheduleSummaryComponent,
    HeaderComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
