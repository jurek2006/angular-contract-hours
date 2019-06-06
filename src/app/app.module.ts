import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { ScheduleModule } from "./schedule/schedule.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [ScheduleModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
