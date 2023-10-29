import { FormControl, FormGroup } from '@angular/forms';
import { noInputValueValidator } from './no-input-value-validator.ts';

describe('noInputValueValidator', () => {
  describe('input value not found in control value', () => {
    it('should return null', () => {
      const inputControl = new FormControl('John');
      const validator = noInputValueValidator(inputControl);

      const formGroup = new FormGroup({
        firstName: new FormControl('David', [validator]),
      });

      const result = formGroup.get('firstName')?.errors;
      expect(result).toBeNull();
    });
  });

  describe('input value is found in the control value', () => {
    it('should return an error object', () => {
      const inputControl = new FormControl('John');
      const validator = noInputValueValidator(inputControl);

      const formGroup = new FormGroup({
        firstName: new FormControl('John Doe', [validator]),
      });

      const result = formGroup.get('firstName')?.errors;
      expect(result).toEqual({ noFirstName: true });
    });
  });
});
