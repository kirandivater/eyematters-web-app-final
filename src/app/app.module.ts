import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/app/shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductComponent } from './admin/product/product.component';
import { UserComponent } from './admin/user/user.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { AuthenticationService } from './_Services/auth/authentication.service';
import { Methods } from './_Models/methods';
import { RegLogin } from './_Models/reg-login';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from './_Services/customer.service';
import { ProductService } from './_Services/product.service';
import { StoreService } from './_Services/store.service';
import { BrandService } from './_Services/brand.service';
import { CategoryService } from './_Services/category.service';
import { FileUploadService } from './_Services/file-upload.service';
import { Product } from './_Models/product';
import { Customer } from './_Models/customer';
import { Store } from './_Models/store';
import { Brand } from './_Models/brand';
import { FileUpload } from './_Models/file-upload';
import { Category } from './_Models/category';
import { AlphabetsOnlyDirective } from './_Directives/alphabets-only.directive';
import { NumberOnlyDirective } from './_Directives/number-only.directive';
import { DecimalOnlyDirective } from './_Directives/decimal-only.directive';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './brand/brand.component';
import { StoresComponent } from './stores/stores.component';
import { PasswordMatchDirective } from './_Directives/password-match.directive';
import { DragDropDirective } from './_Directives/drag-drop.directive';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AlphabetsWithoutSpaceDirective } from './_Directives/alphabets-without-space.directive';
import { AlphaNumericDirective } from './_Directives/alpha-numeric.directive';
import { UserloginComponent } from './userlogin/userlogin.component';
import { MenuService } from './_Services/menu.service';
import { Menu } from './_Models/menu';
import { ClientComponent } from './client/client.component';
import { DragDrop } from '@angular/cdk/drag-drop';
import { CountryStateCityService } from './_Services/country-state-city.service';
import { ClientService } from './_Services/client.service';
import { Client } from './_Models/client';
import { RegLoginService } from './_Services/reg-login.service';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubcategoryService } from './_Services/subcategory.service';
import { Subcategory } from './_Models/subcategory';
import { SellerComponent } from './seller/seller.component';
import { SellerService } from './_Services/seller.service';
import { Seller } from './_Models/seller';
import { ColorService } from './_Services/color.service';
import { Color } from './_Models/color';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    ProductComponent,
    UserComponent,
    CustomersComponent,
    LoginComponent,
    HomeComponent,
    PagenotfoundComponent,
    AlphabetsOnlyDirective,
    NumberOnlyDirective,
    DecimalOnlyDirective,
    CategoryComponent,
    BrandComponent,
    StoresComponent,
    PasswordMatchDirective,
    RegisterUserComponent,
    AlphabetsWithoutSpaceDirective,
    AlphaNumericDirective,
    DragDropDirective,
    UserloginComponent,
    ClientComponent,
    SubcategoryComponent,
    SellerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    // services
    RegLoginService,
    AuthenticationService,
    CustomerService,    
    ProductService,
    BrandService,
    CategoryService,
    StoreService,
    MenuService,
    FileUploadService,
    CountryStateCityService,
    ClientService,
    SubcategoryService,
    SellerService,
    ColorService,

    // classes
    RegLogin,
    Methods,
    Customer,
    Product,
    Brand,
    Category,
    Store,
    Menu,
    FileUpload,
    Client,
    Subcategory,
    Seller,
    Color
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
