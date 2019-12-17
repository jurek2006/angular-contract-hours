import { Component, OnInit } from '@angular/core';
import { MomentMonthsService } from './services/moment-months.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private momentMonthService: MomentMonthsService) {}

  ngOnInit() {
    this.momentMonthService.setMomentLocale('pl');
  }
}
