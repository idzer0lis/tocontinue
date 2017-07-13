import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { UserService } from '../../services/user/user.service';
import { Company } from '../../services/company/company';
import { Role } from '../../services/role/role';
import { User } from '../../services/user/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'my-company-edit',
  templateUrl: './company-edit-form.component.html',
  styleUrls: ['./company-edit-form.component.scss'],
  providers: [NotificationService]
})
export class CompanyEditComponent implements OnInit, OnChanges {
  private editForm: FormGroup;
  @Input()company: Company;
  public newUsers = new BehaviorSubject<Object[]>([]);
  public selectedRoles: Array<number> = [];
  public selectedUsers: Array<number> = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.editForm = this.fb.group({
      'voice-licences': [this.company.voiceLicences, [
        Validators.required,
        Validators.maxLength(24)
      ]],
      'digital-licences': [this.company.digitalLicences, [
        Validators.required,
        Validators.maxLength(24)
      ]]
    });
  }
  ngOnChanges() {
    this.editForm = this.fb.group(
      {'voice-licences': [this.company.voiceLicences]},
      {'digital-licences': [this.company.digitalLicences]});
  }
  addToCompany() {
    let newUsers = this.userService.setUsersInCompany(1, {userId: this.selectedUsers});
    this.newUsers.next([...this.newUsers.value, newUsers]);
    // this.newUsers.emit(users);
  }
  getSelectedUsers(users: User[]) {
     users.forEach((user: User) => this.selectedUsers.push(user.id));
     // Filter for unique ID's
    /*if (this.selectedUsers.length > 1) {
      this.selectedUsers.filter((item, i, ar) => ar.indexOf(item) === i);
    }*/
  }
  getSelectedRoles(roles: Role[]) {
    console.log(roles);
    roles.forEach((role: Role) => this.selectedRoles.push(role.id));
  }
}
