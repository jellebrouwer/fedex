import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noInputValueValidator(
  inputControl: AbstractControl
): ValidatorFn {
  return (currentControl: AbstractControl): ValidationErrors | null => {
    const regexName = new RegExp(inputControl.value, 'gi');
    const hasFirstName = regexName.test(currentControl.value);
    return hasFirstName ? { noFirstName: true } : null;
  };
}
