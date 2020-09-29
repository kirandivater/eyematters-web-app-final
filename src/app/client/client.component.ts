import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { FileHandle } from '../_Directives/drag-drop.directive';
import { FileUploadService } from '../_Services/file-upload.service';
import { FileUpload } from '../_Models/file-upload';
import { CountryStateCityService } from '../_Services/country-state-city.service';
import { Client } from '../_Models/client';
import { ClientService } from '../_Services/client.service';
import { ToastrService } from 'ngx-toastr';
import { RegLogin } from '../_Models/reg-login';
import { RegLoginService } from '../_Services/reg-login.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class ClientComponent implements OnInit {
  files: FileHandle[] = [];
  url: any;
  uid: String;
  pwd: String;
  mail: String;
  cpwd: String;
  address: String;
  state: String;
  city: String;
  contactno: String;
  substartdate: Date;
  subenddate: Date;
  id: String;
  _domain: String;
  dataSource: any;
  previousIndex: number;
  clientID: String;
  ELEMENT_DATA: any[];
  date = new FormControl(moment());
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  constructor(private fileUploadModel: FileUpload, private toastr: ToastrService, 
    private fileUploadService: FileUploadService, 
    private countryStateCityService: CountryStateCityService, private clientService: ClientService, 
    private regLoginService: RegLoginService, private clientModel: Client, 
    private regLoginModel: RegLogin) { }
    displayedColumns: any[] = [ 'Client_Name', 'email', 'mobile', 'DomainName', 'action' ];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.id = clientId[0].clientId;

    this.substartdate = new Date();
    this.subenddate = new Date();

    $(document).ready(function() {
      $("#btnRemove").click(function() {
        $("#FileName").text('');
        $("#imgupload").attr('src', '');
        $("#photo").val('');
      });
    });

    this.ClientDetailsLoad();
  }

  ClientDetailsLoad() {
    let clientId = JSON.parse(localStorage.getItem('currentUser'));
    this.clientID = clientId[0].clientId;
    //clientId[0].clientId
    this.clientService.GetClientList().subscribe(Response => {
      this.ELEMENT_DATA = JSON.parse(JSON.stringify(Response));
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      console.log(this.ELEMENT_DATA );

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onSelectFile(event) {
    $("#FileName").text(event.target.files[0].name);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      //this.filesDropped(event.target.files);
      this.files = event.target.files;
     
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        $("#imgupload").attr('src', this.url);
      }

      this.fileUploadModel.filename = event.target.files[0].name;

      this.fileUploadService.UploadFile(this.fileUploadModel).subscribe(Response => {
        console.log(Response);
      });
    }
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
    $("#FileName").text(files[0].file.name);
  }

  upload(): void {
    //get image upload file obj;
  }

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  InsertClientDetails() {
    //this.clientModel._id = this.id;
    this.clientModel.address = this.address;
    this.clientModel.state = this.state;
    this.clientModel.Client_Name = this.uid;
    this.clientModel.city = this.city;
    this.clientModel.DomainName = this._domain;
    this.clientModel.logo = '';
    this.clientModel.subscription_end_date = this.subenddate;
    this.clientModel.subscription_start_date = this.substartdate;

    this.clientService.InsertClient(this.clientModel).subscribe(Response => {
      let data: [] = JSON.parse(JSON.stringify(Response));

      if(data.length > 0) {
        this.toastr.warning('Client already exist...', 'Client', { timeOut: 3000 });
      } else {
        this.toastr.success('Client Added...', 'Client', { timeOut: 3000 });
      }
    }, error => {
      this.toastr.error(JSON.stringify(error), 'Client', { timeOut: 3000 });
    }, () => {
      this.regLoginModel.clientId = this.id;
      this.regLoginModel.email = this.mail;
      this.regLoginModel.mobile = this.contactno;
      this.regLoginModel.password = this.pwd;
      this.regLoginModel.staff_id = 1;
      this.regLoginModel.user_type = 'C';
      this.regLoginModel.username = this.mail;

      this.regLoginService.InsertRegLogin(this.regLoginModel).subscribe(Response => {
        this.ClientDetailsLoad();
      }, error => {
        this.toastr.error(JSON.stringify(error), 'User', { timeOut: 3000 });
      });
    })
  }
}
