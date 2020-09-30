import { Injectable } from '@angular/core';
import { Client } from '../_Models/client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  InsertClient(clientModel: Client) {
    return this.http.post(environment.GlobalApi + Methods.Client, clientModel);
  }

  GetClient(ClientId) {
    return this.http.get(environment.GlobalApi + Methods.Client + '/' + ClientId);
  }

  GetClientList() {
    return this.http.get(environment.GlobalApi + Methods.Client);
  }
}
