import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AbstractControl, FormBuilder, } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TestAuthService } from 'src/app/testing/services/auth/test-auth.service';
import { asyncError } from 'src/app/testing/helpers/async-observable-helpers';
import { getTestLoginResponse } from 'src/app/testing/services/auth/test-auth.service.response';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        FormBuilder,
        { provide: AuthService, useClass: TestAuthService }
      ]
    });
    component = TestBed.inject(LoginComponent);
    authService = TestBed.inject(AuthService);
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

    let testLoginResponse: any;

    beforeEach(() => {
      testLoginResponse = getTestLoginResponse();
    });

    it('should have invalid form on init', () => {
      component.ngOnInit();
      expect(component.form.valid).not.toBeTruthy();
      expect(component.form.valid).toBeFalsy();
    });

    it('should submit a valid form', fakeAsync(() => {
      component.ngOnInit();
      component.form.setValue({
        email: 'juan@leanstaffing.com',
        password: '1234',
      });
      component.login();
      tick();
      expect(component.isLoggedIn).toBeTrue();
      expect(component.userAge).toEqual(testLoginResponse.userData.age, 'user age');
    }));

    it('should not submit an invalid form', () => {
      component.ngOnInit();
      component.form.setValue({
        email: 'juan@email.com',
        password: '',
      });
      component.login();
      expect(component.isLoggedIn).toBeFalsy();
    });

    it('should set variable to false on error', fakeAsync(() => {
      spyOn(authService, 'login').and.returnValue(asyncError('Error ocurred'));
      component.ngOnInit();
      component.form.setValue({
        email: 'juan@leanstaffing.com',
        password: '1234',
      });
      component.login();
      tick();
      expect(component.isLoggedIn).toBeFalse();
    }));

  });

});
