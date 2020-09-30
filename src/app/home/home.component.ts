import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_Services/auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  count = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) { 
    
  }
  ngDoCheck(): void {
    if (this.authenticationService.currentUserValue) {
      this.count = JSON.parse(JSON.stringify(this.authenticationService.currentUserValue));

      if(this.count.length <= 0) {
        this.router.navigate(['/', 'login']);
      }
    }
  }

  ngOnInit(): void {
  }

}
