import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { ExcelService } from "./services/excel.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "angular-contract-hours";
  date = moment("2019-03-01");

  days = [];

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

  constructor(private excelService: ExcelService) {}

  ngOnInit() {
    const startDay = moment("2019-03-01");
    for (let i = 0; i < startDay.daysInMonth(); i++) {
      const day = startDay.clone().add(i, "days");

      this.days.push({
        date: day.format("D-MM"),
        hours: day.day() === 6 || day.day() === 0 ? 0 : 1
      });
    }
    console.log(this.days);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.days, "sample");
  }
}
