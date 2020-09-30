import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';
import { Subcategory } from '../_Models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) { }

  GetSubCategoryListWithCatId(ClientId, CategoryId) {
    return this.http.get(environment.GlobalApi + Methods.SubCategory + '/' + ClientId + '/' + CategoryId);
  }

  GetSubCategoryList(ClientId) {
    return this.http.get(environment.GlobalApi + Methods.SubCategory + '/' + ClientId);
  }

  UpdateSubCategory(subCatModel: Subcategory) {
    return this.http.put(environment.GlobalApi + Methods.SubCategory, subCatModel);
  }

  DeleteSubCategory(subCatModel: Subcategory) {
    return this.http.patch(environment.GlobalApi + Methods.SubCategory, subCatModel);
  }

  InsertSubCategory(subCatModel: Subcategory) {
    return this.http.post(environment.GlobalApi + Methods.SubCategory, subCatModel);
  }
}
