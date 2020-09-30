import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_Services/auth/authentication.service';
import { Router } from '@angular/router';
import { MenuService } from '../_Services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  data = [];
  Menu = [];
  user_type: String;
  Sequence: String;

  constructor(private router: Router, private menuService: MenuService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('currentUser'));

    for (let d of this.data) {
      this.user_type = d.user_type;
    }

    this.menuService.GetMenu(this.user_type).subscribe(Response => {
      this.Menu = JSON.parse(JSON.stringify(Response));
    });
  }

  Logout(action, controller) {
    if (action == false) {
      this.authenticationService.logout();
      this.router.navigate(['/', 'login']);
    } else {
      this.router.navigate([controller]);
    }
  }
}
