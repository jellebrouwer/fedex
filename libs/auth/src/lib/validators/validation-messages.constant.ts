import { minLengthPassword } from '../components/sign-up/sign-up.component';

export const getValidationMessages = (): {
  [key: string]: { [key: string]: string };
} => {
  return {
    firstName: {
      required: 'First name is required.',
    },
    lastName: {
      required: 'Last name is required.',
    },
    email: {
      required: 'Email is required.',
      isValidEmail: 'Provide a valid email address: john.doe@exmaple.com',
    },
    password: {
      required: 'Password is required.',
      minlength: `Password must be at least ${minLengthPassword} characters long.`,
      lowerAndUpperCase: 'Password must contain a lower and upper case letter.',
      noFirstName: 'Password cannot contain your first name.',
    },
  };
};
