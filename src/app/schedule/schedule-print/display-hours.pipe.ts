import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "displayHours"
})
export class DisplayHoursPipe implements PipeTransform {
  transform(value: number, args?: any): string {
    // jeśli value jest 0 lub undefined to zwróć "-"
    return value === 0 || !value ? "-" : "" + value;
  }
}
