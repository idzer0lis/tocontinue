import { Component } from '@angular/core';

import { User } from '../../services/user/user';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentUser: User;
  users: User[] = [];

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
