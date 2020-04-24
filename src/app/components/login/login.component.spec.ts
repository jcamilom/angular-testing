import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule, AbstractControl, } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [LoginComponent]
    });
    component = TestBed.inject(LoginComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form on init', () => {
    component.ngOnInit();
    expect(component.form.valid).not.toBeTruthy();
    expect(component.form.valid).toBeFalsy();
  });

  describe('FieldValidity', () => {

    let emailControl: AbstractControl;

    beforeEach(() => {
      component.ngOnInit();
      emailControl = component.form.controls['email'];
    });

    it('should have email field invalid on init', () => {
      expect(emailControl.valid).toBeFalsy();
    });

    it('should validate email required fail', () => {
      const errors = emailControl.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should validate email required success', () => {
      emailControl.setValue('el-email-de-pablo');
      const errors = emailControl.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('should validate email pattern fail', () => {
      emailControl.setValue('@mail.com');
      const errors = emailControl.errors || {};
      expect(errors['pattern']).toBeTruthy();
    });

    it('should validate email pattern fail', () => {
      emailControl.setValue('@mail.com');
      const errors = emailControl.errors || {};
      expect(errors['pattern']).toBeTruthy();
    });

    it('should validate email pattern success', () => {
      emailControl.setValue('pablo@mail.com');
      const errors = emailControl.errors || {};
      expect(errors['pattern']).toBeTruthy();
    });

  });

});
