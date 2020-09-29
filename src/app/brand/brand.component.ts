import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { BrandService } from '../_Services/brand.service';
import { Brand } from '../_Models/brand';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  dataSource: any;
  previousIndex: number;
  id: String;
  clientID: string;
  CustomerDetails = [];

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ELEMENT_DATA: any[];

  displayedColumns: any[] = ['Name', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  closeResult: string;

  ngOnInit() {
    this.BrandLoad();
  }

  constructor(private modal: NgbModal, private toastr: ToastrService, private brandService: BrandService, private brandModel: Brand) { }

  BrandLoad() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;

    this.brandService.GetBrandList(clientId[0].clientId).subscribe(Response => {
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

  UpdateBrand() {
    let bname = $("#txtbrandname").val();
    this.brandModel._id = this.id;
    this.brandModel.Name = bname;

    this.brandService.UpdateBrand(this.brandModel).subscribe(Response => {
      let item = [];
      item = JSON.parse(JSON.stringify(Response));

      if (item.length <= 0) {
        this.toastr.success('Brand Updated...', 'Brand', { timeOut: 3000 });
      } else {
        this.toastr.warning('Brand already exist...', 'Brand', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Brand', { timeOut: 3000 });
    }, () => {
      this.modal.dismissAll();

      this.BrandLoad();
    })
  }

  DeleteBrand(id) {
    this.brandModel._id = id;
    this.brandModel.DeleteAddStatus = "R";
    
    this.brandService.DeleteBrand(this.brandModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Brand', { timeOut: 3000 });
    }, () => {
      this.BrandLoad();
      this.toastr.success('Brand Deleted...', 'Brand', { timeOut: 3000 });
    });
  }

  InsertBrand() {
    this.brandModel.ClientId = this.clientID;
    this.brandModel.Name = $("#txtbrandname").val();
    this.brandModel.DeleteAddStatus = "A";

    this.brandService.InsertBrand(this.brandModel).subscribe(Response => {
      let count = [] 
      count = JSON.parse(JSON.stringify(Response));

      if(count.length > 0) {
        this.toastr.warning("Brand already exist", 'Brand', { timeOut: 3000 });
      } else {
        this.BrandLoad();
        this.toastr.success('Brand Inserted...', 'Brand', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Brand', { timeOut: 3000 });
    }, () => {
      this.modal.dismissAll();
    });
  }
}

