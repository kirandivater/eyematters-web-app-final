import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegLogin } from '../_Models/reg-login';
import { RegLoginService } from '../_Services/reg-login.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  uid: String;
  pwd: String;
  mail: String;
  cpwd: String;
  address: String;
  contactno: String;

  constructor(private router: Router, private RegUserService: RegLoginService, private RegUser: RegLogin) { }

  ngOnInit(): void {
  }

  RegisterUser() {
    this.RegUser.email = this.mail;
    this.RegUser.mobile = this.contactno;
    this.RegUser.password = this.cpwd;
    this.RegUser.username = this.uid;
    this.RegUser.user_type = 'A';
    this.RegUser.clientId = localStorage.getItem('clientid');

    this.RegUserService.InsertRegLogin(this.RegUser).subscribe(Response => {

    }, error => {
      alert(JSON.stringify(error));
    }, () => {
      alert('User create successfully');
      //this.router.navigate(['/', 'login']);
    });
  }
}
