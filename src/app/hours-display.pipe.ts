import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "hoursDisplay"
})
export class HoursDisplayPipe implements PipeTransform {
  transform(value: number): string {
    return value === 0 ? "-" : value.toString();
  }
}
