import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_Models/category';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  GetCategoryList(clientId) {
    return this.http.get(environment.GlobalApi + Methods.Cateogry + '/' + clientId);
  }

  UpdateCategory(categoryModel: Category) {
    return this.http.put(environment.GlobalApi + Methods.Cateogry, categoryModel);
  }

  DeleteCategory(categoryModel: Category) {
    return this.http.patch(environment.GlobalApi + Methods.Cateogry, categoryModel);
  }

  InsertCategory(categoryModel: Category) {
    return this.http.post(environment.GlobalApi + Methods.Cateogry, categoryModel);
  }
}
