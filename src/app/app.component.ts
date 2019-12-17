import { Component, OnInit } from '@angular/core';
import { MomentService } from './services/moment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private momentService: MomentService) {}

  ngOnInit() {
    this.momentService.setMomentLocale('pl');
  }
}
