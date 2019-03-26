import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { ExcelService } from "./services/excel.service";
import { ScheduleService } from "./services/schedule.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  schedule = [];

  // name = "Angular 6";
  // data: any = [
  //   {
  //     eid: "e101",
  //     ename: "Jurek",
  //     esal: 1000
  //   },
  //   {
  //     eid: "e102",
  //     ename: "ram",
  //     esal: 2000
  //   },
  //   {
  //     eid: "e103",
  //     ename: "rajesh",
  //     esal: 3000
  //   }
  // ];

  constructor(
    private excelService: ExcelService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    const startDay = moment("2019-03-01");

    this.scheduleService.initSchedule(startDay);
    this.scheduleService.fillSchedule(67, 6, 2);
    this.schedule = this.scheduleService.getSchedule();

    console.log(this.schedule);
  }

  // exportAsXLSX(): void {
  //   this.excelService.exportAsExcelFile(this.days, "sample");
  // }
}
