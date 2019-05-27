import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ScheduleDay } from "../scheduleDay.model";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-schedule-print",
  templateUrl: "./schedule-print.component.html",
  styleUrls: ["./schedule-print.component.css"]
})
export class SchedulePrintComponent implements OnInit {
  @Input() schedule: ScheduleDay[];
  @Input() scheduleMonth: string;
  @Output() closePrint = new EventEmitter<void>();

  @ViewChild("contentToConvert") contentToConvert: ElementRef;
  private totalHours: number;

  constructor() {}

  ngOnInit() {
    console.log(this.schedule);
  }

  onClose() {
    this.closePrint.emit();
  }

  private countTotalHours() {
    return this.schedule
      .map(day => (day.hours > 0 ? day.hours : 0))
      .reduce((a, b) => a + b);
  }

  public generatePdf() {
    let data = this.contentToConvert.nativeElement;
    console.log("data", data);
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

      const contentDataURL = canvas.toDataURL("image/jpeg", 0.5);
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      console.log("contentDataURL", contentDataURL);
      pdf.addImage(contentDataURL, "PNG", marginLeft, 0, imgWidth, page.height);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
  }
}
