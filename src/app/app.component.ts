import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { ExcelService } from "./services/excel.service";
import { ScheduleService } from "./services/schedule.service";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

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

  public generatePdf() {
    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      // var imgWidth = canvas.height / 20;
      // var imgHeight = (canvas.height * imgWidth) / canvas.width;
      console.log("canvas.height", canvas.height);
      console.log("canvas.width", canvas.width);
      const imgHeight = 290;

      const page = { height: 297, width: 210 };
      const aspect = page.height / canvas.height;
      const imgWidth = aspect * canvas.width;
      const marginLeft = (page.width - imgWidth) / 2;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", marginLeft, 0, imgWidth, page.height);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
  }

  // exportAsXLSX(): void {
  //   this.excelService.exportAsExcelFile(this.days, "sample");
  // }
}
