import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'my-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  providers: [UserService]
})

export class UserTableComponent {
  public tableData: User[];
  public columns: ITdDataTableColumn[] = [
    { name: 'username', label: 'Username'},
    { name: 'role', label: 'User role' },
  ];

  constructor(  private userService: UserService) {
    this.tableData = this.userService.getAllUsers();
  }
}
