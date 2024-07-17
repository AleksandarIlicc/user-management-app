import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppLoginForm } from '../forms/login-form/app-login-form';
import { RouterModule } from '@angular/router';
import {
  getValidationMessage,
  isControlInvalid,
} from '../../common/validators';
import { validationMessages } from 'src/app/common/validation-messages';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<{
    email: string;
    password: string;
  }>();
  loginForm: FormGroup = new AppLoginForm();
  submitted = false;
  isSubmitting = false;

  validationMessages = validationMessages;

  getValidationMessage(controlName: string, errorKey: string): string | null {
    const control = this.loginForm.get(controlName);
    return getValidationMessage(
      control,
      this.validationMessages,
      controlName,
      errorKey,
      this.submitted
    );
  }

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return isControlInvalid(control, this.submitted);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted = true;

    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.loginForm.value);
    }
  }
}
