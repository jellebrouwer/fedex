import { FormControl } from '@angular/forms';
import { isValidEmail } from './is-valid-email.validator.js';

describe('isValidEmail', () => {
  describe('valid email', () => {
    it('should return null', () => {
      const emailControl = new FormControl('john@example.com');
      const result = isValidEmail(emailControl);
      expect(result).toBeNull();
    });
  });

  describe('invalid email', () => {
    it('should return error object', () => {
      const emailControl = new FormControl('john@example');
      const result = isValidEmail(emailControl);
      expect(result).toEqual({ isValidEmail: true });
    });
  });
});
