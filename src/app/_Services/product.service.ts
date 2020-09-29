import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';
import { Product } from '../_Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  GetProductList(ClientId) {
    return this.http.get(environment.GlobalApi + Methods.ProductList + '/' + ClientId);
  }

  DeleteProduct(productModel: Product) {
    return this.http.patch(environment.GlobalApi + Methods.Product, productModel);
  }

  UpdateProduct(productModel: Product) {
    return this.http.put(environment.GlobalApi + Methods.Product, productModel);
  }

  InsertProduct(productModel: Product) {
    return this.http.post(environment.GlobalApi + Methods.Product, productModel);
  }
}
