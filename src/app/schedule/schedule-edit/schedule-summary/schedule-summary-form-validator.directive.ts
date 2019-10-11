import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

// Validator checking (when defined total hours for month)
// if defined (expected) total hours match current (scheduled) total hours
// if not - returns error hoursDefinedCurrentNotMatch
export const scheduleSummaryFormValidator: ValidatorFn = (
  form: FormGroup
): ValidationErrors | null => {
  const {
    isTotalHoursDefined,
    totalHoursDefined,
    totalHoursCurrent
  } = form.controls;
  if (
    isTotalHoursDefined.value &&
    totalHoursDefined.value - totalHoursCurrent.value !== 0
  ) {
    if (totalHoursDefined.value - totalHoursCurrent.value > 0) {
      return {
        hoursDefinedCurrentNotMatch: `Not enough hours: ${totalHoursDefined.value -
          totalHoursCurrent.value}`
      };
    } else if (totalHoursDefined.value - totalHoursCurrent.value < 0) {
      return {
        hoursDefinedCurrentNotMatch: `To many hours: ${totalHoursCurrent.value -
          totalHoursDefined.value}`
      };
    }
  }
  return null;
};
