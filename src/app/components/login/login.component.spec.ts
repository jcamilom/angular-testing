import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AbstractControl, FormBuilder, } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;


  beforeEach(() => {
    // Create a fake AuthService object with a `login()` spy
    const authService = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        FormBuilder,
        { provide: AuthService, useValue: authService }
      ]
    });
    component = TestBed.inject(LoginComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
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

    it('should submit a valid form', fakeAsync(() => {
      // Make the spy return a synchronous Observable with the test data
      authServiceSpy.login.and.returnValue(asyncData({
        userData: {
          name: 'Pedro',
          age: 29
        },
        token: '1234'
      }));
      component.ngOnInit();
      component.form.setValue({
        email: 'juan@leanstaffing.com',
        password: '1234',
      });
      component.login();
      tick();
      expect(component.isLoggedIn).toBeTrue();
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
      // Make the spy return a synchronous Observable with the test data
      authServiceSpy.login.and.returnValue(asyncError('Error ocurred'));
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


import { defer } from 'rxjs';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

/** Create async observable error that errors
 *  after a JS engine turn */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
