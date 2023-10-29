import { AbstractControl, ValidationErrors } from '@angular/forms';

export function isValidEmail(c: AbstractControl): ValidationErrors | null {
  if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(c.value)) {
    return null;
  } else {
    return { isValidEmail: true };
  }
}
