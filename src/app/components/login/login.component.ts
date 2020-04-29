import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailDomainValidator } from 'src/app/consts/validators';
import { AuthService } from 'src/app/services/auth/auth.service';

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@'+|={}`"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public isLoggedIn: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegExp), emailDomainValidator]],
      password: ['', [Validators.required]]
    });
  }

  public login(): void {
    if (!this.form.valid) {
      return;
    }
    const formValue = this.form.value;
    this.authService.login(formValue.email, formValue.password).subscribe(
      (resp) => {
        this.isLoggedIn = true;
      }
    );
  }

}
