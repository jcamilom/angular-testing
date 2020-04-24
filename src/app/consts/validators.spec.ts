import { FormControl } from '@angular/forms';
import { emailDomainValidator } from './validators';

describe('Validators', () => {

  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('', emailDomainValidator);
  });

  it('should succeed for domain \'leanstaffing.com\'', () => {
    control.setValue('something@leanstaffing.com');
    const errors = control.errors || {};
    expect(errors['emailDomain']).toBeFalsy();
  });

  it('should fail for any other domain', () => {
    control.setValue('something@google.com');
    const errors = control.errors || {};
    expect(errors['emailDomain']).toBeTruthy();
  });

});
