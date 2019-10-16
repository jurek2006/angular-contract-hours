import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const scheduleSummaryFormValidator: ValidatorFn = (
  form: FormGroup
): ValidationErrors | null => {
  const {
    isTotalHoursDefined,
    totalHoursDefined,
    totalHoursCurrent
  } = form.controls;
  // Validator checking (when defined total hours for month)
  // if defined (expected) total hours match current (scheduled) total hours
  // if not - returns error with message
  if (
    isTotalHoursDefined.value &&
    totalHoursDefined.value - totalHoursCurrent.value !== 0
  ) {
    if (totalHoursDefined.value - totalHoursCurrent.value > 0) {
      return {
        error: {
          msg: `Not enough hours: ${totalHoursDefined.value -
            totalHoursCurrent.value}`,
          msgVerbose: `Less hours scheduled than expected: ${totalHoursDefined.value -
            totalHoursCurrent.value}`
        }
      };
    } else if (totalHoursDefined.value - totalHoursCurrent.value < 0) {
      return {
        error: {
          msg: `To many hours hours: ${totalHoursCurrent.value -
            totalHoursDefined.value}`,
          msgVerbose: `To many hours scheduled than expected: ${totalHoursCurrent.value -
            totalHoursDefined.value}`
        }
      };
    }
  }
  return null;
};
