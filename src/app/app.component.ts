import { Component } from "@angular/core";
import * as moment from "moment";
import { ExcelService } from "./services/excel.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "angular-contract-hours";
  date = moment("1995-12-25");

  daysInMonth = moment("2019-03", "YYYY-MM").daysInMonth();

  name = "Angular 6";
  data: any = [
    {
      eid: "e101",
      ename: "Jurek",
      esal: 1000
    },
    {
      eid: "e102",
      ename: "ram",
      esal: 2000
    },
    {
      eid: "e103",
      ename: "rajesh",
      esal: 3000
    }
  ];

  constructor(private excelService: ExcelService) {}

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, "sample");
  }
}
