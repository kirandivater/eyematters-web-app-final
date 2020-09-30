import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegLogin } from 'src/app/_Models/reg-login';
// import { environment } from 'src/environments/environment';
// import { Methods } from 'src/app/_Models/methods';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  Login(loginModel: RegLogin) {
    return this.auth.login(loginModel);
    //return this.http.post(environment.GlobalApi + Methods.LoginStatus, loginModel);
  }
}
