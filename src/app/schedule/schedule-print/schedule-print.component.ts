import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { MomentMonthsService } from 'src/app/services/moment-months.service';
import { ScheduleDay } from '../models/scheduleDay.model';
import { Settings } from '../models/settings.model';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@Component({
  selector: 'app-schedule-print',
  templateUrl: './schedule-print.component.html',
  styleUrls: ['./schedule-print.component.css']
})
export class SchedulePrintComponent implements OnInit {
  @Input() schedule: ScheduleDay[];
  @Input() settings: Settings;

  @Output() closePrint = new EventEmitter<void>();

  @ViewChild('contentToConvert', { static: false })
  elementToConvertToPdf: ElementRef;

  constructor(
    private momentMonthsService: MomentMonthsService,
    private pdfGeneratorService: PdfGeneratorService
  ) {}

  ngOnInit() {
    // scroll to see top of the preview
    window.scroll(0, 0);
  }

  public closePrintView(): void {
    this.closePrint.emit();
  }

  public countTotalHours(): number {
    return this.schedule
      .map(day => (day.hours > 0 ? day.hours : 0))
      .reduce((a, b) => a + b);
  }

  public generatePdf(): void {
    this.pdfGeneratorService.generatePdf({
      elementToConvert: this.elementToConvertToPdf,
      fileName: `${
        this.settings.contractorName
      } - ${this.getSelectedMonthLabel()}.pdf`
    });
  }

  public getSelectedMonthLabel(): string {
    return this.momentMonthsService.getMonthLabel(this.settings.selectedMonth);
  }
}
