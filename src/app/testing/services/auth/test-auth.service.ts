import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { asyncData } from 'src/app/testing/helpers/async-observable-helpers';
import { getTestLoginResponse } from './test-auth.service.response';

@Injectable()
export class TestAuthService extends AuthService {

  constructor() {
    super(null);
  }

  public login(username: string, password: string): Observable<any> {
    return asyncData(getTestLoginResponse());
  }

}
