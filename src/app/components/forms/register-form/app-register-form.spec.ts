import { AppRegisterForm } from './app-register-form';

describe('AppRegisterForm', () => {
  let form: AppRegisterForm;

  beforeEach(() => {
    form = new AppRegisterForm();
  });

  it('should have all elements defined', () => {
    expect(form).toBeDefined();
    expect(form.controls['name']).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['password']).toBeDefined();
    expect(form.controls['confirmPassword']).toBeDefined();
  });

  it('should be invalid when no input values are defined', () => {
    expect(form.valid).toBeFalsy();
  });

  it('should be valid when all input values are defined and correct', () => {
    form.controls['name'].setValue('John Doe');
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('Test1234!');
    form.controls['confirmPassword'].setValue('Test1234!');
    form.controls['name'].markAsTouched();
    form.controls['email'].markAsTouched();
    form.controls['password'].markAsTouched();
    form.controls['confirmPassword'].markAsTouched();
    expect(form.valid).toBeTruthy();
  });

  it('should be valid when password strength is met', () => {
    form.controls['name'].setValue('John Doe');
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('Test1234!');
    form.controls['confirmPassword'].setValue('Test1234!');
    form.controls['name'].markAsTouched();
    form.controls['email'].markAsTouched();
    form.controls['password'].markAsTouched();
    form.controls['confirmPassword'].markAsTouched();
    expect(form.valid).toBeTruthy();
  });

  it('should be invalid when password strength is not met', () => {
    form.controls['name'].setValue('John Doe');
    form.controls['email'].setValue('test@example.com');

    // Test with password missing number
    form.controls['password'].setValue('TestTest!');
    form.controls['confirmPassword'].setValue('TestTest!');
    form.controls['password'].markAsTouched();
    form.controls['confirmPassword'].markAsTouched();
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('passwordStrength')).toBeTruthy();

    // Test with password missing uppercase letter
    form.controls['password'].setValue('testtest1!');
    form.controls['confirmPassword'].setValue('testtest1!');
    form.controls['password'].markAsTouched();
    form.controls['confirmPassword'].markAsTouched();
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('passwordStrength')).toBeTruthy();

    // Test with password missing special character
    form.controls['password'].setValue('Testtest12');
    form.controls['confirmPassword'].setValue('Testtest12');
    form.controls['password'].markAsTouched();
    form.controls['confirmPassword'].markAsTouched();
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('passwordStrength')).toBeTruthy();

    // Test with password missing length
    form.controls['password'].setValue('T1!');
    form.controls['confirmPassword'].setValue('T1!');
    form.controls['password'].markAsTouched();
    form.controls['confirmPassword'].markAsTouched();
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('passwordStrength')).toBeTruthy();
  });

  it('should be invalid when passwords do not match', () => {
    form.controls['name'].setValue('John Doe');
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('Test1234!');
    form.controls['confirmPassword'].setValue('Different1234!');
    form.controls['name'].markAsTouched();
    form.controls['email'].markAsTouched();
    form.controls['password'].markAsTouched();
    form.controls['confirmPassword'].markAsTouched();
    expect(form.valid).toBeFalsy();
    expect(form.hasError('passwordsMismatch')).toBeTruthy();
  });
});
