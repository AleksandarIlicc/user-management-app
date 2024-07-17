import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagedUser } from 'src/app/model/IUser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  getValidationMessage,
  isControlInvalid,
} from 'src/app/common/validators';
import { validationMessages } from 'src/app/common/validation-messages';
import { AppUserForm } from '../../forms/user-form/app-user-form';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css',
})
export class EditFormComponent implements OnInit {
  @Input() user!: ManagedUser;
  @Output() formSubmit = new EventEmitter<ManagedUser>();

  userForm!: AppUserForm;
  submitted: boolean = false;
  isSubmitting: boolean = false;

  validationMessages = validationMessages;

  ngOnInit(): void {
    this.userForm = new AppUserForm(this.user);
  }

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

  onSubmit() {
    this.submitted = true;

    if (this.userForm.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.userForm.value);
    }
  }
}
