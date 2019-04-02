import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HoursDisplayPipe } from './hours-display.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HoursDisplayPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
