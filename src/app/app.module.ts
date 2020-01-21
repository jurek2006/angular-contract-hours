import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ScheduleModule } from './schedule/schedule.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [ScheduleModule, BrowserModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
