import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordStrengthValidator } from '../../../common/validators';

export class AppLoginForm extends FormGroup {
  constructor() {
    super({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, passwordStrengthValidator(8, 3)],
        nonNullable: true,
      }),
    });
  }
}
