import { AppUserForm } from './app-user-form';

describe('AppUserForm', () => {
  let form: AppUserForm;

  beforeEach(() => {
    form = new AppUserForm();
  });

  it('should have all elements defined', () => {
    expect(form).toBeDefined();
    expect(form.controls['name']).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['type']).toBeDefined();
    expect(form.controls['pib']).toBeDefined();
    expect(form.controls['mbr']).toBeDefined();
  });

  it('should be invalid when no input values are defined', () => {
    expect(form.valid).toBeFalsy();
  });

  it('should be valid when all input values are defined for individual', () => {
    form.controls['name'].setValue('John Doe');
    form.controls['email'].setValue('john.doe@example.com');
    form.controls['type'].setValue('individual');
    expect(form.valid).toBeTruthy();
  });

  it('should be valid when all input values are defined for company', () => {
    form.controls['name'].setValue('Company Group');
    form.controls['email'].setValue('company@example.com');
    form.controls['type'].setValue('company');
    form.controls['pib'].setValue('123456789');
    form.controls['mbr'].setValue('987654321');
    expect(form.valid).toBeTruthy();
  });

  it('should be invalid when type is company but pib or mbr are not defined', () => {
    form.controls['name'].setValue('Company Group');
    form.controls['email'].setValue('company@example.com');
    form.controls['type'].setValue('company');
    form.controls['pib'].setValue('');
    form.controls['mbr'].setValue('');
    expect(form.valid).toBeFalsy();
  });

  it('should enable and set validators for pib and mbr when type is company', () => {
    form.controls['type'].setValue('company');
    form.controls['pib'].setValue('123456789');
    form.controls['mbr'].setValue('987654321');
    expect(form.controls['pib'].enabled).toBeTruthy();
    expect(form.controls['mbr'].enabled).toBeTruthy();
    expect(form.controls['pib'].valid).toBeTruthy();
    expect(form.controls['mbr'].valid).toBeTruthy();
  });

  it('should disable and clear validators for pib and mbr when type is individual', () => {
    form.controls['type'].setValue('company');
    form.controls['pib'].setValue('123456789');
    form.controls['mbr'].setValue('987654321');
    form.controls['type'].setValue('individual');
    expect(form.controls['pib'].disabled).toBeTruthy();
    expect(form.controls['mbr'].disabled).toBeTruthy();
    expect(form.controls['pib'].valid).toBeFalsy();
    expect(form.controls['mbr'].valid).toBeFalsy();
  });

  it('should be invalid if email format is incorrect', () => {
    form.controls['name'].setValue('John Doe');
    form.controls['email'].setValue('invalid-email');
    form.controls['type'].setValue('individual');
    expect(form.valid).toBeFalsy();
    expect(form.controls['email'].hasError('email')).toBeTruthy();
  });
});
