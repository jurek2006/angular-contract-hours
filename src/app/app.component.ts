import { Component, OnInit } from "@angular/core";
import { ScheduleService } from "./services/schedule.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  schedule = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.scheduleService.setMomentLocale();
  }
}
