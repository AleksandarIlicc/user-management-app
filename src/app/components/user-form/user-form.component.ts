import { Component, EventEmitter, Output } from '@angular/core';
import { AppUserForm } from '../forms/user-form/app-user-form';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import {
  getValidationMessage,
  isControlInvalid,
} from '../../common/validators';
import { validationMessages } from '../../common/validation-messages';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Output() formSubmit = new EventEmitter<User>();
  userForm: AppUserForm = new AppUserForm();
  submitted = false;
  isSubmitting = false;

  validationMessages = validationMessages;

  getValidationMessage(controlName: string, errorKey: string): string | null {
    const control = this.userForm.get(controlName);
    return getValidationMessage(
      control,
      this.validationMessages,
      controlName,
      errorKey,
      this.submitted
    );
  }

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.userForm.get(controlName);
    return isControlInvalid(control, this.submitted);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted = true;

    if (this.userForm.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.userForm.getRawValue());
    }
  }
}
