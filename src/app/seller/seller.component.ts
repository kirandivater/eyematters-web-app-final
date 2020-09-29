import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { SellerService } from '../_Services/seller.service';
import { Seller } from '../_Models/seller';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  dataSource: any;
  previousIndex: number;
  id: String;
  clientID: string;
  ELEMENT_DATA: any[];
  SellerDetails = [];
  displayedColumns: any[] = [ 'SellerName', 'action' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  closeResult: string;

  constructor(private modal: NgbModal, private toastr: ToastrService, private sellerService: SellerService,
    private sellerModel: Seller) { }

  ngOnInit(): void {
    this.SellerLoad();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  SellerLoad() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;
    
    this.sellerService.GetSellerList(clientId[0].clientId).subscribe(Response => {
      this.ELEMENT_DATA = JSON.parse(JSON.stringify(Response));
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getdata(data) {
    this.SellerDetails = [data];
    this.id = this.SellerDetails[0]._id;
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

  DeleteSeller(id) {
    this.sellerModel._id = id;
    this.sellerModel.DeleteAddStatus = 'R';

    this.sellerService.DeleteSellerList(this.sellerModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Seller', { timeOut: 3000 });
    }, () => {
      this.SellerLoad();
      this.toastr.success('Seller Deleted...', 'Seller', { timeOut: 3000 });
    });
  }

  UpdateSeller() {
    this.sellerModel._id = this.id;
    this.sellerModel.SellerName = $("#txtsellername").val();

    this.sellerService.UpdateSellerList(this.sellerModel).subscribe(Response => {
      let item = [];
      item = JSON.parse(JSON.stringify(Response));

      if(item.length <= 0) {
        this.toastr.success('Seller Updated...', 'Seller', { timeOut: 3000 });
      } else {
        this.toastr.warning('Seller already exist...', 'Seller', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Seller', { timeOut: 3000 });
    }, () => {
      this.SellerLoad();
      this.modal.dismissAll();
    });
  }

  InsertSeller() {
    this.sellerModel.SellerName = $("#txtsellername1").val();
    this.sellerModel.ClientId = this.clientID;
    this.sellerModel.UserCreateDate = new Date();

    console.log(JSON.stringify(this.sellerModel));

    this.sellerService.InsertSellerList(this.sellerModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Seller', { timeOut: 3000 });
    }, () => {
      this.SellerLoad();
      this.modal.dismissAll();
      this.toastr.success('Seller Inserted...', 'Seller', { timeOut: 3000 });
    });
  }
}
