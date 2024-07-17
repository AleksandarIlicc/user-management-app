import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagedUser } from '../../../model/IUser';

export class AppUserForm extends FormGroup {
  constructor(user?: ManagedUser) {
    super({
      name: new FormControl(user?.name || '', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      email: new FormControl(user?.email || '', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      type: new FormControl(user?.type || 'individual', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      pib: new FormControl(
        { value: user?.pib || '', disabled: user?.type !== 'company' },
        { nonNullable: true }
      ),
      mbr: new FormControl(
        { value: user?.mbr || '', disabled: user?.type !== 'company' },
        { nonNullable: true }
      ),
    });

    this.get('type')?.valueChanges.subscribe((type) => {
      const pibControl = this.get('pib');
      const mbrControl = this.get('mbr');

      if (type === 'company') {
        pibControl?.enable();
        pibControl?.setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]);
        mbrControl?.enable();
        mbrControl?.setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]);
      } else {
        pibControl?.disable();
        pibControl?.clearValidators();
        mbrControl?.disable();
        mbrControl?.clearValidators();
      }

      pibControl?.updateValueAndValidity();
      mbrControl?.updateValueAndValidity();
    });
  }
}
