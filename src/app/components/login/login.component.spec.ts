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

});
