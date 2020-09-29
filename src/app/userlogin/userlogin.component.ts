import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegLogin } from '../_Models/reg-login';
import { RegLoginService } from '../_Services/reg-login.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  uid: String;
  pwd: String;
  mail: String;
  cpwd: String;
  address: String;
  contactno: String;

  constructor(private router: Router, private RegUserService: RegLoginService, private RegUser: RegLogin) { }

  ngOnInit(): void {
  }

  CreateUser() {
    this.RegUser.email = this.mail;
    this.RegUser.mobile = this.contactno;
    this.RegUser.password = this.cpwd;
    this.RegUser.username = this.uid;
    this.RegUser.user_type = 'U';
    this.RegUser.clientId = localStorage.getItem('clientid');

    this.RegUserService.InsertRegLogin(this.RegUser).subscribe(Response => {

    }, error => {
      alert(JSON.stringify(error));
    }, () => {
      alert('User create successfully');
      //this.router.navigate(['/', 'login']);
    });
    //this.router.navigate(['/', 'login']);
  }
}
