import { Injectable, ElementRef } from '@angular/core';
import { UiService } from './ui.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  constructor(public uiService: UiService) {}

  public generatePdf(params: {
    elementToConvert: ElementRef;
    fileName: string;
  }) {
    // converts schedule HTML (nativeElement) to image and puts it to generated pdf
    this.uiService.isActionInProgress.next(true);
    const scheduleImage = params.elementToConvert.nativeElement;
    html2canvas(scheduleImage, {
      imageTimeout: 15000,
      scale: 1
    })
      .then(canvas => {
        const page = { height: 297, width: 210 }; // a4 page size (in mm) to fit image on pdf page
        const contentDataURL = canvas.toDataURL('image/jpeg', 0.5); // converts element to dataURL
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        pdf.addImage(contentDataURL, 'JPEG', 0, 0, page.width, page.height); // add converted image to pdf - occupying full page
        pdf.save(params.fileName); // generate pdf for download
        this.uiService.isActionInProgress.next(false);
        this.uiService.showSnackbar('Successfully generated PDF ');
      })
      .catch(err => {
        console.error('Generating pdf failed', err);
        this.uiService.isActionInProgress.next(false);
        this.uiService.showSnackbar('Error - Generating pdf failed');
      });
  }
}
