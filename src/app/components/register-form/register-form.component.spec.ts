import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form.component';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, RegisterFormComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have all elements defined', () => {
    const form = component.registerForm;
    expect(form).toBeDefined();
    expect(form.controls['name']).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['password']).toBeDefined();
    expect(form.controls['confirmPassword']).toBeDefined();
  });

  it('should show no errors when pristine and invalid on first open', () => {
    const compiled = fixture.debugElement.nativeElement;
    const nameError = compiled.querySelector('#name ~ .invalid-feedback');
    const emailError = compiled.querySelector('#email ~ .invalid-feedback');
    const passwordError = compiled.querySelector(
      '#password ~ .invalid-feedback'
    );
    const confirmPasswordError = compiled.querySelector(
      '#confirmPassword ~ .invalid-feedback'
    );

    expect(nameError).toBeNull();
    expect(emailError).toBeNull();
    expect(passwordError).toBeNull();
    expect(confirmPasswordError).toBeNull();
  });

  it('should show errors when fields are touched and invalid', () => {
    component.registerForm.controls['name'].markAsTouched();
    component.registerForm.controls['email'].markAsTouched();
    component.registerForm.controls['password'].markAsTouched();
    component.registerForm.controls['confirmPassword'].markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const nameError = compiled.querySelector('#name ~ .invalid-feedback');
    const emailError = compiled.querySelector('#email ~ .invalid-feedback');
    const passwordError = compiled.querySelector(
      '#password ~ .invalid-feedback'
    );
    const confirmPasswordError = compiled.querySelector(
      '#confirmPassword ~ .invalid-feedback'
    );

    expect(nameError).toBeTruthy();
    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();
    expect(confirmPasswordError).toBeTruthy();
  });

  it('should show no errors when all fields are valid', () => {
    component.registerForm.controls['name'].setValue('John Doe');
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Test1234!');
    component.registerForm.controls['confirmPassword'].setValue('Test1234!');
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const nameError = compiled.querySelector('#name ~ .invalid-feedback');
    const emailError = compiled.querySelector('#email ~ .invalid-feedback');
    const passwordError = compiled.querySelector(
      '#password ~ .invalid-feedback'
    );
    const confirmPasswordError = compiled.querySelector(
      '#confirmPassword ~ .invalid-feedback'
    );

    expect(nameError).toBeFalsy();
    expect(emailError).toBeFalsy();
    expect(passwordError).toBeFalsy();
    expect(confirmPasswordError).toBeFalsy();
  });
});
