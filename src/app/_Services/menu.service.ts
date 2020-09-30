import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  GetMenu(user_type) {
    return this.http.get(environment.GlobalApi + Methods.Menu + "/" + user_type);
  }
}
