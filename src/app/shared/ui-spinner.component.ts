import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-ui-spinner',
  templateUrl: './ui-spinner.component.html',
  styleUrls: ['./ui-spinner.component.css']
})
export class UiSpinnerComponent implements OnInit {
  constructor(public uiService: UiService) {}

  ngOnInit() {}
}
