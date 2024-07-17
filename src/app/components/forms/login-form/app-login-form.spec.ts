import { AppLoginForm } from './app-login-form';

describe('AppLoginForm', () => {
  let form: AppLoginForm;

  beforeEach(() => {
    form = new AppLoginForm();
  });

  it('should have all elements defined', () => {
    expect(form).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['password']).toBeDefined();
  });

  it('should be invalid when no input values are defined', () => {
    expect(form.valid).toBeFalsy();
  });

  it('should be valid when all input values are defined', () => {
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('Test1234!');
    expect(form.valid).toBeTruthy();
  });

  it('should be valid when password strength is met', () => {
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('Test1234!');
    expect(form.valid).toBeTruthy();
  });

  it('should be invalid when password strength is not met (all combinations for strength)', () => {
    form.controls['email'].setValue('test@example.com');

    // Test with password missing number
    form.controls['password'].setValue('TestTest!');
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('passwordStrength')).toBeTruthy();

    // Test with password missing uppercase letter
    form.controls['password'].setValue('testtest1!');
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('passwordStrength')).toBeTruthy();

    // Test with password missing special character
    form.controls['password'].setValue('Testtest12');
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('passwordStrength')).toBeTruthy();

    // Test with password missing length
    form.controls['password'].setValue('T1!');
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('passwordStrength')).toBeTruthy();
  });
});
