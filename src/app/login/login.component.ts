import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/auth/user.service';
import { RegLogin } from '../_Models/reg-login';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_Services/auth/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uid: String;
  pwd: String;
  returnUrl: string;
  count = [];
  data = [];
  user_type: string;
  selectedValue: string;
  UserType = [{ usertype: 'Admin', id: "A"}, { usertype: 'User', id: "U"}];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private userModel: RegLogin,
    private authenticationService: AuthenticationService) {
    if (!this.authenticationService.currentUserValue) {
      if (this.returnUrl == '/') {
        this.router.navigate(['/', 'login']);
      }
    } else {
      this.count = JSON.parse(JSON.stringify(this.authenticationService.currentUserValue));

      if (this.count.length > 0) {
        this.UserRoute();
      }
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  UserRoute() {
    this.data = JSON.parse(localStorage.getItem('currentUser'));

    for (let d of this.data) {
      this.user_type = d.user_type;
      //localStorage.setItem('usertype', this.user_type);

      if (this.user_type == 'A') {
        this.router.navigate(['/', 'home', 'dashboard']);
      } else if (this.user_type == 'S') {
        this.router.navigate(['/', 'home', 'client']);
      } else if (this.user_type == 'U') {
        this.router.navigate(['/', 'home', 'dashboard']);
      }
    }
  }

  Login() {
    this.userModel.mobile = this.uid;
    this.userModel.email = this.uid;
    this.userModel.password = this.pwd;

    if(this.selectedValue == undefined) {
      this.selectedValue = 'S';
    }
    
    this.userModel.user_type = this.selectedValue;

    this.authenticationService.login(this.userModel)
      .pipe(first())
      .subscribe(
        data => {
          this.count = JSON.parse(JSON.stringify(data));

          if (this.count.length > 0) {
            localStorage.setItem('clientid', data[0].clientId);
            
            if (this.returnUrl == '/') {
              this.UserRoute();
            } else {
              this.router.navigate([this.returnUrl]);
            }
          } else {
            alert('User name or password is incorrect');
          }
        },
        error => {
          alert(JSON.stringify(error));
        });
  }

  Users(data) {
    this.selectedValue = data;
  }
}
