import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [ LoginComponent ]
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

  it('should have email field invalid on init', () => {
    component.ngOnInit();
    const emailControl = component.form.controls['email'];
    expect(emailControl.valid).toBeFalsy();
  });

  it('should validate email required fail', () => {
    component.ngOnInit();
    const emailControl = component.form.controls['email'];
    const errors = emailControl.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should validate email required success', () => {
    component.ngOnInit();
    const emailControl = component.form.controls['email'];
    emailControl.setValue('pablo@mail.com');
    const errors = emailControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

});
