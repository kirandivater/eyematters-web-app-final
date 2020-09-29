import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  GetColor(ClientId) {
    return this.http.get(environment.GlobalApi + Methods.Color + '/' + ClientId);
  }
}
