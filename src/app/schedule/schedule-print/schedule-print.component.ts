import {
  Component,
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
export class SchedulePrintComponent {
  @Input() schedule: ScheduleDay[];
  @Input() monthLabel: string;
  @Input() contractorName: string;

  @Output() closePrint = new EventEmitter<void>();

  @ViewChild("contentToConvert", { static: false }) pdfRenderView: ElementRef;

  constructor() {}

  onClose() {
    this.closePrint.emit();
  }

  private countTotalHours() {
    return this.schedule
      .map(day => (day.hours > 0 ? day.hours : 0))
      .reduce((a, b) => a + b);
  }

  public generatePdf() {
    // converts schedule HTML (nativeElement) to image and put it to generated pdf
    const scheduleImage = this.pdfRenderView.nativeElement; //
    html2canvas(scheduleImage).then(canvas => {
      const page = { height: 297, width: 210 }; // a4 page size (in mm) to fit image on pdf page

      const contentDataURL = canvas.toDataURL("image/jpeg", 0.5);
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      pdf.addImage(contentDataURL, "PNG", 0, 0, page.width, page.height); // converted image occupies full A4 page
      pdf.save(`${this.monthLabel}.pdf`); // generate pdf for downloading
    });
  }
}
