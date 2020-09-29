import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/_Services/customer.service';
import { Customer } from 'src/app/_Models/customer';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class CustomersComponent implements OnInit {
  closeResult: string;
  dataSource: any;
  previousIndex: number;
  CustomerDetails = [];
  fname: String;
  lname: String;
  contactno: String;
  mail: String;
  address: String;
  city: String;
  state: String;
  zip: String;
  _dob: Date;
  _anniversary: Date;
  clientID: String;
  events: string[] = [];
  id: String;
  ELEMENT_DATA: any[];
  date = new FormControl(moment());

  displayedColumns: any[] = [ 'first_name', 'last_name', 'phone', 'email', 'street', 'city', 'state', 
  'zip_code', 'dob', 'anniversary', 'action' ];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  constructor(private modal: NgbModal, private toastr: ToastrService, private customerService: CustomerService, private customerModel: Customer) { }

  ngOnInit(): void {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.id = clientId[0].clientId;

    this._dob = new Date();
    this._anniversary = new Date();

    this.CustomerDetailsLoad();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
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
  
  CustomerDetailsLoad() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;
    
    this.customerService.GetCustomerDetails(this.clientID).subscribe(Response => {
      this.ELEMENT_DATA = JSON.parse(JSON.stringify(Response));
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  InsertCustomerDetails() {
    this.customerModel.ClientId = this.clientID;
    this.customerModel.anniversary = this._anniversary;
    this.customerModel.city = this.city;
    this.customerModel.dob = this._dob;
    this.customerModel.email = this.mail;
    this.customerModel.first_name = this.fname;
    this.customerModel.last_name = this.lname;
    this.customerModel.phone = this.contactno;
    this.customerModel.street = this.address;
    this.customerModel.state = this.state;
    this.customerModel.zip_code = this.zip;
    this.customerModel.DeleteAddStatus = "A";

    this.customerService.InsertCustomerDetails(this.customerModel).subscribe(Response => {
      this.toastr.success('Customer Details Inserted...', 'Customer', { timeOut: 3000 });
      this.CustomerDetailsLoad();
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Customer', { timeOut: 3000 });
    });
  }

  DeleteCustomerDetails(id) {
    this.customerModel._id = id;
    this.customerModel.DeleteAddStatus = "R";
    
    this.customerService.DeleteCustomerDetails(this.customerModel).subscribe(Response => {

    }, error => {
      this.toastr.error(JSON.stringify(error), 'Customer', { timeOut: 3000 });
    }, () => {
      this.CustomerDetailsLoad();
      this.toastr.success('Customer Deleted...', 'Customer', { timeOut: 3000 });
    });
  }
}
