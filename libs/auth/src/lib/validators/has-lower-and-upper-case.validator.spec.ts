import { FormControl } from '@angular/forms';
import { hasLowerAndUpperCaseValidator } from './has-lower-and-upper-case.validator';

describe('hasLowerAndUpperCaseValidator', () => {
  describe('has lower and upper case', () => {
    it('should return null', () => {
      const formControl = new FormControl('Valid');
      const result = hasLowerAndUpperCaseValidator(formControl);
      expect(result).toBeNull();
    });
  });

  describe('only lower case', () => {
    it('should return false', () => {
      const formControl = new FormControl('invalid');
      const result = hasLowerAndUpperCaseValidator(formControl);
      expect(result).toEqual({ lowerAndUpperCase: true });
    });
  });

  describe('only upper case', () => {
    it('should return false', () => {
      const formControl = new FormControl('INVALID');
      const result = hasLowerAndUpperCaseValidator(formControl);
      expect(result).toEqual({ lowerAndUpperCase: true });
    });
  });
});
