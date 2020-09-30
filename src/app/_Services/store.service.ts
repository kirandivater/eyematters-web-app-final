import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';
import { Store } from '../_Models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient) { }

  GetStoreList(clientId) {
    return this.http.get(environment.GlobalApi + Methods.Store + '/' + clientId);
  }

  UpdateStore(storeModel: Store) {
    return this.http.put(environment.GlobalApi + Methods.Store, storeModel);
  }

  DeleteStore(storeModel: Store) {
    return this.http.patch(environment.GlobalApi + Methods.Store, storeModel);
  }

  InsertStore(storeModel: Store) {
    return this.http.post(environment.GlobalApi + Methods.Store, storeModel);
  }
}
