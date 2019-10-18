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
  // if defined total hours doesn't match currently scheduled - return error:
  // "to many hours" or "not enough hours"

  if (
    isTotalHoursDefined.value &&
    totalHoursDefined.value - totalHoursCurrent.value !== 0
  ) {
    return {
      error: {
        msg:
          totalHoursDefined.value - totalHoursCurrent.value > 0
            ? `Not enough hours`
            : `To many hours`,
        msgVerbose:
          totalHoursDefined.value - totalHoursCurrent.value > 0
            ? `Less hours scheduled than expected`
            : `To many hours scheduled than expected`,
        differenceAmount: Math.abs(
          totalHoursDefined.value - totalHoursCurrent.value
        )
      }
    };
  }
  return null;
};
