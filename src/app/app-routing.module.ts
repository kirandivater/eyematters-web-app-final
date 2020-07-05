import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './admin/product/product.component';
import { UserComponent } from './admin/user/user.component';
import { CustomersComponent } from './admin/customers/customers.component';


const routes: Routes = [
  { path: '', component:DashboardComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'customer', component:CustomersComponent },
  { path: 'product', component:ProductComponent },
  { path: 'user', component:UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
