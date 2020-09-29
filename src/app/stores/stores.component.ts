import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from '../_Services/store.service';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '../_Models/store';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  dataSource: any;
  previousIndex: number;
  id: String;
  clientID: string;
  CustomerDetails = [];

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  ELEMENT_DATA: any[];

  displayedColumns: any[] = [ 'store_name', 'phone', 'email', 'street', 'city', 'state', 'zip_code', 'action' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  closeResult: string;
  
  constructor(private modal: NgbModal, private toastr: ToastrService, private storesService: StoreService, 
    private storeModel: Store) {}
    
  ngOnInit() {
    this.StoreLoad();
  }

  StoreLoad() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;
    
    this.storesService.GetStoreList(clientId[0].clientId).subscribe(Response => {
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

  UpdateBrand() {
    let sname = $("#txtstoredname").val();
    let mobile = $("#txtphone").val();
    let email = $("#txtmail").val();
    let address = $("#txtaddr").val();
    let city = $("#txtcity").val();
    let state = $("#txtstate").val();
    let zip = $("#txtzip").val();

    this.storeModel._id = this.id;
    this.storeModel.store_name = sname;
    this.storeModel.phone = mobile;
    this.storeModel.email = email;
    this.storeModel.street = address;
    this.storeModel.city = city;
    this.storeModel.state = state;
    this.storeModel.zip_code = zip;

    this.storesService.UpdateStore(this.storeModel).subscribe(Response => {
      let item = [];
      item = JSON.parse(JSON.stringify(Response));

      if (item.length <= 0) {
        this.toastr.success('Store Updated...', 'Store', { timeOut: 3000 });
      } else {
        this.toastr.warning('Store already exist...', 'Store', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Store', { timeOut: 3000 });
    }, () => {
      this.modal.dismissAll();

      this.StoreLoad();
    })
  }

  DeleteBrand(id) {
    this.storeModel._id = id;
    this.storeModel.Status = "R";
    
    this.storesService.DeleteStore(this.storeModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Store', { timeOut: 3000 });
    }, () => {
      this.StoreLoad();
      this.toastr.success('Store Deleted...', 'Store', { timeOut: 3000 });
    });
  }

  InsertStore() {
    this.storeModel.clientId = this.clientID;
    this.storeModel.store_name = $("#txtstoredname1").val();
    this.storeModel.city = $("#txtcity1").val();
    this.storeModel.email = $("#txtmail1").val();
    this.storeModel.phone = $("#txtphone1").val();
    this.storeModel.state = $("#txtstate1").val();
    this.storeModel.street = $("#txtaddr1").val();
    this.storeModel.zip_code = $("#txtzip1").val();
    this.storeModel.Status = "A";

    this.storesService.InsertStore(this.storeModel).subscribe(Response => {
      let count = [] 
      count = JSON.parse(JSON.stringify(Response));

      if(count.length > 0) {
        this.toastr.warning("Store already exist", 'Store', { timeOut: 3000 });
      } else {
        this.StoreLoad();
        this.toastr.success('Store Inserted...', 'Store', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Store', { timeOut: 3000 });
    }, () => {
      this.modal.dismissAll();
    });
  }
}
