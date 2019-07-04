import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Global} from "../../global";
import {FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";


const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public IsLogin: boolean;
  public userName: string;

  registerUser(jsonOfUser: JSON) {
    this.http.post(Global.url + 'auth/register', jsonOfUser, {headers: headers}).subscribe();
  }

  public submitRegistration(registerForm: FormGroup) {
    let email = registerForm.get('email').value;
    let password = registerForm.get('password').value;
    let submitJson: JSON;
    let registrationObject: any = {
      "email": email,
      "password": password
    };
    submitJson = <JSON>registrationObject;
    this.registerUser(submitJson);
  }


  public login(loginFormGroup: FormGroup) {
    let email = loginFormGroup.get('email').value;
    let password = loginFormGroup.get('password').value;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
      .post(
        Global.url + 'auth/login',
        {email: email, password: password},
        {headers, responseType: "text"}).pipe(
        map(res => {
          localStorage.setItem('auth_token', res);
          console.log(localStorage.getItem('auth_token'));
          this.IsLogin = true;
        }))
  };

  public logout() {
    localStorage.removeItem('auth_token');
    this.IsLogin = false;
  }
}
