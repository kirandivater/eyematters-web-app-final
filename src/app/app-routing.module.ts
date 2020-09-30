import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './admin/product/product.component';
import { UserComponent } from './admin/user/user.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './brand/brand.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './_helper/auth.guard';
import { StoresComponent } from './stores/stores.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { ClientComponent } from './client/client.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SellerComponent } from './seller/seller.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: RegisterUserComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'customer', component: CustomersComponent, canActivate: [AuthGuard] },
      { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'brand', component: BrandComponent, canActivate: [AuthGuard] },
      { path: 'cat', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'store', component: StoresComponent, canActivate: [AuthGuard] },
      { path: 'regadmin', component: RegisterUserComponent, canActivate: [AuthGuard] },
      { path: 'reguser', component: UserloginComponent, canActivate: [AuthGuard] },
      { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
      { path: 'subcat', component: SubcategoryComponent, canActivate: [AuthGuard] },
      { path: 'seller', component: SellerComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
