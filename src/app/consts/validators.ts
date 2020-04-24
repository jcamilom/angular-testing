import { FormControl } from '@angular/forms';

export function emailDomainValidator(control: FormControl) {
  const email = control.value;
  if (email && email.indexOf('@') !== -1) {
    const [_, domain] = email.split('@');
    if (domain !== 'leanstaffing.com') {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      };
    }
  }
  return null;
}
