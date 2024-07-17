import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, UserFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all elements defined', () => {
    const form = component.userForm;
    expect(form).toBeDefined();
    expect(form.controls['name']).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['type']).toBeDefined();
    expect(form.controls['pib']).toBeDefined();
    expect(form.controls['mbr']).toBeDefined();
  });

  it('should show no errors when pristine and invalid on first open', () => {
    const compiled = fixture.nativeElement;
    const nameErrors = compiled.querySelector('#name ~ .invalid-feedback');
    const emailErrors = compiled.querySelector('#email ~ .invalid-feedback');
    const typeErrors = compiled.querySelector('#type ~ .invalid-feedback');

    expect(nameErrors).toBeNull();
    expect(emailErrors).toBeNull();
    expect(typeErrors).toBeNull();
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should show errors when fields are touched and invalid', () => {
    component.userForm.controls['type'].setValue('individual');
    fixture.detectChanges();

    let compiled = fixture.nativeElement;
    let nameErrors = compiled.querySelector('#name ~ .invalid-feedback');
    let emailErrors = compiled.querySelector('#email ~ .invalid-feedback');
    let pibElement = compiled.querySelector('#pib');
    let mbrElement = compiled.querySelector('#mbr');

    expect(nameErrors).toBeNull();
    expect(emailErrors).toBeNull();
    expect(pibElement).toBeNull();
    expect(mbrElement).toBeNull();
    expect(component.userForm.valid).toBeFalsy();

    component.userForm.controls['type'].setValue('company');
    fixture.detectChanges();

    compiled = fixture.nativeElement;
    nameErrors = compiled.querySelector('#name ~ .invalid-feedback');
    emailErrors = compiled.querySelector('#email ~ .invalid-feedback');
    let pibErrors = compiled.querySelector('#pib ~ .invalid-feedback');
    let mbrErrors = compiled.querySelector('#mbr ~ .invalid-feedback');

    expect(nameErrors).toBeNull();
    expect(emailErrors).toBeNull();
    expect(pibErrors).toBeNull();
    expect(mbrErrors).toBeNull();
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should show no errors when all fields are valid', () => {
    const nameControl = component.userForm.controls['name'];
    const emailControl = component.userForm.controls['email'];
    const typeControl = component.userForm.controls['type'];
    const pibControl = component.userForm.controls['pib'];
    const mbrControl = component.userForm.controls['mbr'];

    nameControl.setValue('John Doe');
    emailControl.setValue('test@example.com');
    typeControl.setValue('company');
    pibControl.setValue('123456789');
    mbrControl.setValue('987654321');
    nameControl.markAsTouched();
    emailControl.markAsTouched();
    typeControl.markAsTouched();
    pibControl.markAsTouched();
    mbrControl.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const nameErrors = compiled.querySelector('#name ~ .invalid-feedback');
    const emailErrors = compiled.querySelector('#email ~ .invalid-feedback');
    const typeErrors = compiled.querySelector('#type ~ .invalid-feedback');
    const pibErrors = compiled.querySelector('#pib ~ .invalid-feedback');
    const mbrErrors = compiled.querySelector('#mbr ~ .invalid-feedback');

    expect(nameErrors).toBeNull();
    expect(emailErrors).toBeNull();
    expect(typeErrors).toBeNull();
    expect(pibErrors).toBeNull();
    expect(mbrErrors).toBeNull();
    expect(component.userForm.valid).toBeTruthy();
  });

  it('should disable and clear validators for pib and mbr when type is individual', () => {
    component.userForm.controls['type'].setValue('company');
    component.userForm.controls['pib'].setValue('123456789');
    component.userForm.controls['mbr'].setValue('987654321');
    component.userForm.controls['type'].setValue('individual');
    fixture.detectChanges();

    expect(component.userForm.controls['pib'].disabled).toBeTruthy();
    expect(component.userForm.controls['mbr'].disabled).toBeTruthy();
    expect(component.userForm.controls['pib'].valid).toBeFalsy();
    expect(component.userForm.controls['mbr'].valid).toBeFalsy();
  });
});
