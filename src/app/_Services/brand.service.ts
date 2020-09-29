import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';
import { Brand } from '../_Models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  GetBrandList(clientId) {
    return this.http.get(environment.GlobalApi + Methods.Brand + '/' + clientId);
  }

  UpdateBrand(brandModel: Brand) {
    return this.http.put(environment.GlobalApi + Methods.Brand, brandModel);
  }

  DeleteBrand(brandModel: Brand) {
    return this.http.patch(environment.GlobalApi + Methods.Brand, brandModel);
  }

  InsertBrand(brandModel: Brand) {
    return this.http.post(environment.GlobalApi + Methods.Brand, brandModel);
  }
}
