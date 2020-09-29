import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';
import { Seller } from '../_Models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  GetSellerList(ClientId) {
    return this.http.get(environment.GlobalApi + Methods.Seller + '/' + ClientId);
  }

  InsertSellerList(sellerModel: Seller) {
    return this.http.post(environment.GlobalApi + Methods.Seller, sellerModel);
  }

  UpdateSellerList(sellerModel: Seller) {
    return this.http.put(environment.GlobalApi + Methods.Seller, sellerModel);
  }

  DeleteSellerList(sellerModel: Seller) {
    return this.http.patch(environment.GlobalApi + Methods.Seller, sellerModel);
  }
}
