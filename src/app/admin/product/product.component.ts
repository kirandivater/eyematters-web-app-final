import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/_Services/product.service';
import { Product } from 'src/app/_Models/product';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_Services/category.service';
import { SubcategoryService } from 'src/app/_Services/subcategory.service';
import { Category } from 'src/app/_Models/category';
import { Subcategory } from 'src/app/_Models/subcategory';
import { SellerService } from 'src/app/_Services/seller.service';
import { ColorService } from 'src/app/_Services/color.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  dataSource: any;
  previousIndex: number;
  clientID: String;
  CustomerDetails = [];
  SubCategoryDetails = [];
  SellerDetails = [];
  CategoryDetails = [];
  ProductList = [];
  Colors = [];
  ELEMENT_DATA: any[];

  displayedColumns: any[] = ['Name', 'action'];

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  closeResult: string;

  constructor(private modal: NgbModal, private toastr: ToastrService, 
    private productService: ProductService, private categoryService: CategoryService, 
    private subCategoryService: SubcategoryService, private sellerService: SellerService, 
    private colorService: ColorService, private categoryModel: Category,
    private subcategoryModel: Subcategory, private productModel: Product) { }

  ProductLoad() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;
   
    this.productService.GetProductList(this.clientID).subscribe(Response => {
      this.ELEMENT_DATA = JSON.parse(JSON.stringify(Response));

      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;

    this.categoryService.GetCategoryList(this.clientID).subscribe(Response => {
      this.CategoryDetails = JSON.parse(JSON.stringify(Response));
    });

    this.colorService.GetColor(this.clientID).subscribe(Response => {
      this.Colors = JSON.parse(JSON.stringify(Response));
    });

    this.sellerService.GetSellerList(this.clientID).subscribe(Response => {
      this.SellerDetails = JSON.parse(JSON.stringify(Response));
    });

    this.ProductLoad();
  }

  FillSubCategoryList(CategoryId) {
    if(CategoryId == 0) {
      this.SubCategoryDetails = [];
      this.toastr.warning('Select Product', 'Product', { timeOut: 3000 });
    } else {
      this.subCategoryService.GetSubCategoryListWithCatId(this.clientID, CategoryId).subscribe(Response => {
        this.SubCategoryDetails = JSON.parse(JSON.stringify(Response));
      });
    }
  }
  getdata(data) {
    this.CustomerDetails = [data];
    this.ProductList = this.CustomerDetails;
    // for(let _data of this.CustomerDetails) {
    //   $("#prodname").val(data.Name);
    // }
    
    console.log(this.CustomerDetails);
  }

  open(content) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  DeleteProduct(ProductId) {
    this.productModel._id = ProductId;
    this.productModel.DeleteAddStatus = "R";

    this.productService.DeleteProduct(this.productModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Product', { timeOut: 3000 });
    }, () => {
      this.ProductLoad();
      this.toastr.success('Product Deleted...', 'Product', { timeOut: 3000 });
    });
  }

  GetCategoryId(CatId?) {
    localStorage.setItem('CatId', CatId);
  }

  GetSubCatId(SubCatId?) {
    localStorage.setItem('SubCatId', SubCatId);
  }

  GetSellerId(SellerId?) {
    localStorage.setItem('SellerId', SellerId);
  }

  GetColor(Color?) {
    alert(Color);
    localStorage.setItem('Color', Color);
  }

  InsertProductDetails() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;

    this.productModel.ClientId = this.clientID;
    this.productModel.DeleteAddStatus = "A";
    this.productModel.Description = $("#desc1").val();
    this.productModel.DiscountCost = $("#disc1").val();
    this.productModel.Image = '';
    this.productModel.Name = $("#prodname1").val();
    this.productModel.TotalAmt = $("#totalamt1").val();
    this.productModel.Cost = Number($("#totalamt1").val()) - ((Number($("#totalamt1").val()) * Number($("#disc1").val())) / Number(100));
    this.productModel.CategoryId = localStorage.getItem('CatId');
    this.productModel.SubCategoryId = localStorage.getItem('SubCatId');
    this.productModel.SellerId = localStorage.getItem('SellerId');
    this.productModel.Color = localStorage.getItem('Color');
    this.productModel.UpdatedDate = new Date();
    this.productModel.UserCreateDate = new Date();

    this.productService.InsertProduct(this.productModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Product', { timeOut: 3000 });
    }, () => {
      this.toastr.success('Insert Product Details...', 'Product', { timeOut: 3000 });
      this.modal.dismissAll();
    });
  }

  UpdateProduct() {

  }
}
