import { Component } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "angular-contract-hours";
  date = moment("1995-12-25");

  daysInMonth = moment("2019-03", "YYYY-MM").daysInMonth(); // 29
}
