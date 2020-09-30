import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';
import { Customer } from '../_Models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  GetCustomerDetails(ClientId) {
    return this.http.get(environment.GlobalApi + Methods.Customer + '/' + ClientId);
  }

  InsertCustomerDetails(customerModel: Customer) {
    return this.http.post(environment.GlobalApi + Methods.Customer, customerModel);
  }

  DeleteCustomerDetails(customerModel: Customer) {
    return this.http.patch(environment.GlobalApi + Methods.Customer, customerModel);
  }
}
