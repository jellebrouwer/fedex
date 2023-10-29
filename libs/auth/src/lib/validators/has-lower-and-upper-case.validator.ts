import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasLowerAndUpperCaseValidator(
  c: AbstractControl
): ValidationErrors | null {
  if (/(?=.*[a-z])(?=.*[A-Z])/g.test(c.value)) {
    return null;
  } else {
    return { lowerAndUpperCase: true };
  }
}
