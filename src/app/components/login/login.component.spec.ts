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
      expect(errors['pattern']).toBeFalsy();
    });

    it('should validate email domain fail', () => {
      emailControl.setValue('henry@mail.com');
      const errors = emailControl.errors || {};
      expect(errors['emailDomain']).toBeTruthy();
    });

    it('should validate email domain success', () => {
      emailControl.setValue('henry@leanstaffing.com');
      const errors = emailControl.errors || {};
      expect(errors['emailDomain']).toBeFalsy();
    });

  });

  describe('FormSubmission', () => {

    it('should have invalid form on init', () => {
      component.ngOnInit();
      expect(component.form.valid).not.toBeTruthy();
      expect(component.form.valid).toBeFalsy();
    });

    it('should submit a valid form', () => {
      component.ngOnInit();
      component.form.setValue({
        email: 'juan@leanstaffing.com',
        password: '1234',
      });
      component.login();
      expect(component.isLoggedIn).toBeTrue();
    });

    it('should not submit an invalid form', () => {
      component.ngOnInit();
      component.form.setValue({
        email: 'juan@email.com',
        password: '',
      });
      component.login();
      expect(component.isLoggedIn).toBeFalsy();
    });

  });

});
