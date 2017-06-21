import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'my-navbar-menu',
  templateUrl: 'navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
  providers: [UserService]
})
export class NavbarMenuComponent {
  constructor(private userService: UserService) {}
  doLogout() {
    this.userService.logout();
  }
}
