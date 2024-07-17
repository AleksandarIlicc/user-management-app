export interface ValidationMessages {
  [key: string]: { [key: string]: string };
}

export const validationMessages: ValidationMessages = {
  email: {
    required: 'Email is required',
    email: 'Invalid email',
  },
  password: {
    required: 'Password is required',
    passwordStrength: 'Password is not strong enough',
  },
  name: {
    required: 'Name is required',
  },
  confirmPassword: {
    required: 'Confirm Password is required',
    passwordsMismatch: 'Passwords do not match',
  },
  type: {
    required: 'User type is required',
  },
  pib: {
    required: 'PIB is required',
    pattern: 'PIB must be a number',
  },
  mbr: {
    required: 'MBR is required',
    pattern: 'MBR must be a number',
  },
};
