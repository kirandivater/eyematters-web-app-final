import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subcategory } from '../_Models/subcategory';
import { SubcategoryService } from '../_Services/subcategory.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  dataSource: any;
  previousIndex: number;
  id: String;
  clientID: string;
  closeResult: string;
  SubCategoryDetails = [];
  CategoryDetails = [];
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  ELEMENT_DATA: any[];
  displayedColumns: any[] = [ 'CategoryName' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modal: NgbModal, private toastr: ToastrService, private http: HttpClient,
    private subcatService: SubcategoryService, private subcatModel: Subcategory) { }

  ngOnInit(): void {
    this.SubCategoryLoad();
  }

  SubCategoryLoad() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;
    
    this.subcatService.GetSubCategoryList(clientId[0].clientId).subscribe(Response => {
      this.CategoryDetails = JSON.parse(JSON.stringify(Response));
      
      this.ELEMENT_DATA = JSON.parse(JSON.stringify(Response));
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  UpdateSubCategory() {
    let bname = $("#txtsubcatname").val();
    this.subcatModel._id = this.id;
    this.subcatModel.Name = bname;

    this.subcatService.UpdateSubCategory(this.subcatModel).subscribe(Response => {
      let item = [];
      item = JSON.parse(JSON.stringify(Response));

      if(item.length <= 0) {
        this.toastr.success('Sub Category Updated...', 'Sub Category', { timeOut: 3000 });
      } else {
        this.toastr.warning('Sub Category already exist...', 'Sub Category', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Sub Category', { timeOut: 3000 });
    }, () => {
      this.modal.dismissAll();

      this.SubCategoryLoad();
    })
  }

  InsertSubCategory() {
    this.subcatModel.ClientId = this.clientID;
    this.subcatModel.Name = $("#txtsubcatname1").val();
    this.subcatModel.Title = $("#txtsubcatname1").val();
    this.subcatModel.Description = $("#txtdescription").val();
    this.subcatModel.CategoryId = $( "#catid option:selected" ).val();
    this.subcatModel.Route = { "ActionName": '/', "ControllerName": 'category/subcat'};

    this.subcatService.InsertSubCategory(this.subcatModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Sub Category', { timeOut: 3000 });
    }, () => {
      this.modal.dismissAll();
      this.SubCategoryLoad();
      this.toastr.success('Sub Category inserted...', 'Sub Category', { timeOut: 3000 });
    });
  }

  DeleteSubCategory(id) {
    this.subcatModel._id = id;
    this.subcatModel.DeleteAddStatus = "R";

    this.subcatService.DeleteSubCategory(this.subcatModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Sub Category', { timeOut: 3000 });
    }, () => {
      this.SubCategoryLoad();
      this.toastr.success('Sub Category Deleted...', 'Sub Category', { timeOut: 3000 });
    });
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

  getdata(data) {
    this.SubCategoryDetails = [data];
    this.id = this.SubCategoryDetails[0]._id;
  }

  loadcat() {}
}
