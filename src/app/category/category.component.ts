import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../_Services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../_Models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  dataSource: any;
  previousIndex: number;
  id: String;
  clientID: string;
  CustomerDetails = [];

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  ELEMENT_DATA: any[];

  displayedColumns: any[] = [ 'CategoryName', 'action' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  closeResult: string;
  
  constructor(private modal: NgbModal, private toastr: ToastrService, private catService: CategoryService, 
    private catModal: Category) {}

  ngOnInit() {
    this.CategoryLoad();
  }
    
  CategoryLoad() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;
    
    this.catService.GetCategoryList(clientId[0].clientId).subscribe(Response => {
      this.ELEMENT_DATA = JSON.parse(JSON.stringify(Response));
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getdata(data) {
    this.CustomerDetails = [data];
    this.id = this.CustomerDetails[0]._id;
  }

  open(content) {
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

  UpdateCategory() {
    let bname = $("#txtcatname").val();
    this.catModal._id = this.id;
    this.catModal.CategoryName = bname;

    this.catService.UpdateCategory(this.catModal).subscribe(Response => {
      let item = [];
      item = JSON.parse(JSON.stringify(Response));

      if(item.length <= 0) {
        this.toastr.success('Category Updated...', 'Category', { timeOut: 3000 });
      } else {
        this.toastr.warning('Category already exist...', 'Category', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Category', { timeOut: 3000 });
    }, () => {
      this.modal.dismissAll();

      this.CategoryLoad();
    })
  }

  DeleteCategory(id) {
    this.catModal._id = id;
    this.catModal.DeleteAddStatus = "R";
    
    this.catService.DeleteCategory(this.catModal).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Category', { timeOut: 3000 });
    }, () => {
      this.CategoryLoad();
      this.toastr.success('Category Deleted...', 'Category', { timeOut: 3000 });
    });
  }

  InsertCategory() {
    this.catModal.ClientId = this.clientID;
    this.catModal.CategoryName = $("#txtcatname").val();
    this.catModal.DeleteAddStatus = "A";

    this.catService.InsertCategory(this.catModal).subscribe(Response => {
      let count = [] 
      count = JSON.parse(JSON.stringify(Response));

      if(count.length > 0) {
        this.toastr.warning("Category already exist", 'Category', { timeOut: 3000 });
      } else {
        this.CategoryLoad();
        this.toastr.success('Category Inserted...', 'Category', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Category', { timeOut: 3000 });
    }, () => {
      this.modal.dismissAll();
    });
  }
}
