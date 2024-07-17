import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(
  charLength: number = 8,
  strength: number = 3
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value as string;
    const hasNumber = /[0-9]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= charLength;

    const strengthCount = [
      hasNumber,
      hasUpperCase,
      hasSpecialChar,
      hasMinLength,
    ].filter(Boolean).length;

    return strengthCount > strength ? null : { passwordStrength: true };
  };
}

export function getValidationMessage(
  control: AbstractControl | null,
  validationMessages: { [key: string]: { [key: string]: string } },
  controlName: string,
  errorKey: string,
  submitted: boolean
): string | null {
  if (
    control?.hasError(errorKey) &&
    (control?.dirty || control?.touched || submitted)
  ) {
    return validationMessages[controlName][errorKey];
  }
  return null;
}

export function isControlInvalid(
  control: AbstractControl | null,
  submitted: boolean
): boolean | undefined {
  return control?.invalid && (control?.dirty || control?.touched || submitted);
}
