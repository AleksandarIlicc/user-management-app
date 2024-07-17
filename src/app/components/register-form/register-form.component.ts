import { Component, EventEmitter, Output } from '@angular/core';
import { AppRegisterForm } from '../../components/forms/register-form/app-register-form';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  getValidationMessage,
  isControlInvalid,
} from 'src/app/common/validators';
import { validationMessages } from 'src/app/common/validation-messages';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  @Output() formSubmit = new EventEmitter<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>();
  registerForm: AppRegisterForm = new AppRegisterForm();
  submitted = false;
  isSubmitting = false;

  validationMessages = validationMessages;

  getValidationMessage(controlName: string, errorKey: string): string | null {
    const control = this.registerForm.get(controlName);
    return getValidationMessage(
      control,
      this.validationMessages,
      controlName,
      errorKey,
      this.submitted
    );
  }

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.registerForm.get(controlName);
    return isControlInvalid(control, this.submitted);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted = true;

    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.registerForm.value);
    }
  }
}
