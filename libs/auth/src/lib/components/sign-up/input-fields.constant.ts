export interface ISignUpInputField {
  label: string;
  controlName: string;
  required: boolean;
  type: string;
}

export const inputFields = [
  {
    label: 'First name:',
    controlName: 'firstName',
    required: true,
    type: 'text',
  },
  {
    label: 'Last name:',
    controlName: 'lastName',
    required: true,
    type: 'text',
  },
  {
    label: 'Email:',
    controlName: 'email',
    required: true,
    type: 'email',
  },
  {
    label: 'Password:',
    controlName: 'password',
    required: true,
    type: 'password',
  },
];
