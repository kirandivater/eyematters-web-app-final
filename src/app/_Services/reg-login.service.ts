import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegLogin } from '../_Models/reg-login';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';

@Injectable({
  providedIn: 'root'
})
export class RegLoginService {

  constructor(private http: HttpClient) { }

  InsertRegLogin(regLoginModel: RegLogin) {
    return this.http.post(environment.GlobalApi + Methods.Login, regLoginModel);
  }
}
