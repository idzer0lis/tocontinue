import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { UserService } from '../../services/user/user.service';
import { Company } from '../../services/company/company';
import { Role } from '../../services/role/role';
import { User } from '../../services/user/user';

@Component({
  selector: 'my-company-edit',
  templateUrl: './company-edit-form.component.html',
  styleUrls: ['./company-edit-form.component.scss'],
  providers: [NotificationService]
})
export class CompanyEditComponent implements OnInit, OnChanges {
  private editForm: FormGroup;
  @Input()company: Company;
  public newUsers: Object;
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
    this.newUsers = this.userService.setUsersInCompany(this.company.id, {userId: this.selectedUsers, companyRole: this.selectedRoles});
  }
  getSelectedUsers(users: User[]) {
     users.forEach((user: User) => {
       // filter only unique id's
       if (this.selectedUsers.indexOf(user.id) === -1) {
         this.selectedUsers.push(user.id);
       }
     });
  }
  getSelectedRoles(roles: Role[]) {
    roles.forEach((role: Role) => {
      if (this.selectedRoles.indexOf(role.id) === -1) {
        this.selectedRoles.push(role.id);
      }
    });
  }
}
