import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, LoginFormComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have all elements defined', () => {
    const form = component.loginForm;
    expect(form).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['password']).toBeDefined();
  });

  it('should show no errors when pristine and invalid on first open', () => {
    const compiled = fixture.nativeElement;
    const emailErrors = compiled.querySelector('#email ~ .invalid-feedback');
    const passwordErrors = compiled.querySelector(
      '#password ~ .invalid-feedback'
    );

    expect(emailErrors).toBeNull();
    expect(passwordErrors).toBeNull();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should show errors when fields are touched and invalid', () => {
    component.loginForm.controls['email'].markAsTouched();
    component.loginForm.controls['password'].markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const emailErrors = compiled.querySelector('#email ~ .invalid-feedback');
    const passwordErrors = compiled.querySelector(
      '#password ~ .invalid-feedback'
    );

    expect(emailErrors).not.toBeNull();
    expect(passwordErrors).not.toBeNull();
  });

  it('should show specific error messages when fields are touched and invalid', () => {
    component.loginForm.controls['email'].markAsTouched();
    component.loginForm.controls['password'].markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const emailRequiredError = compiled.querySelector(
      '#email ~ .invalid-feedback small'
    );
    const passwordRequiredError = compiled.querySelector(
      '#password ~ .invalid-feedback small'
    );

    expect(emailRequiredError.textContent).toContain('Email is required');
    expect(passwordRequiredError.textContent).toContain('Password is required');
  });

  it('should show errors for invalid email format', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const emailErrors = compiled.querySelector(
      '#email ~ .invalid-feedback small:nth-child(2)'
    );

    expect(emailErrors).not.toBeNull();
    expect(emailErrors.textContent).toContain('Invalid email');
  });

  it('should show no errors when all fields are valid', () => {
    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    emailControl.setValue('test@example.com');
    passwordControl.setValue('Test1234!');
    emailControl.markAsTouched();
    passwordControl.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const emailErrors = compiled.querySelector('#email ~ .invalid-feedback');
    const passwordErrors = compiled.querySelector(
      '#password ~ .invalid-feedback'
    );

    expect(emailErrors).toBeNull();
    expect(passwordErrors).toBeNull();
    expect(component.loginForm.valid).toBeTruthy();
  });
});
