import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    const url = 'some-site.com/login';
    const body = { username, password };
    return this.http.post<any>(url, body);
  }

}
