import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { CompanyUserService } from '../../services/company-user/company-user.service';
import { CompanyService } from '../../services/company/company.service';
import { Company } from '../../models/company';
import { CompanyUserRole } from '../../models/company-user-role';
import { CompanyUserRoleTable } from '../../models/company-user-role-table';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { ValidationService } from '../../services/validation/validation.service';
import { slideInDownAnimation } from '../../animations/animations';

@Component({
  selector: 'my-company-edit',
  templateUrl: './company-edit-form.component.html',
  styleUrls: ['./company-edit-form.component.scss'],
  providers: [CompanyService, CompanyUserService, NotificationService, ValidationService],
  animations: [slideInDownAnimation]
})
export class CompanyEditComponent implements OnInit, OnChanges {
  private editForm: FormGroup;
  @Input()company: Company;
  public newUsers: Object;
  private companyUsers: CompanyUserRoleTable[];
  public selectedRoles: Array<number> = [];
  public selectedUsers: Array<number> = [];
  public showAddCompanyButton = false;
  constructor(
    public dialog: MdDialog,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private companyUserService: CompanyUserService,
    private notificationService: NotificationService,
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.editForm = this.fb.group({
      'companyName': [this.company.title, [
        Validators.required,
        Validators.minLength(4),
      ]],
      'voiceLicences': [this.company.voiceLicences, [
        Validators.required,
        Validators.min(0),
        ValidationService.isInteger
      ]],
      'digitalLicences': [this.company.digitalLicences, [
        Validators.required,
        Validators.min(0),
        ValidationService.isInteger
      ]]
    });
  }
  ngOnChanges() {
    this.buildForm();
    this.companyUserService
      .getUsersByCompany(this.company.id)
      .subscribe(((data: CompanyUserRoleTable[]) =>  this.companyUsers = data));
    this.notificationService.error(null);
  }
  addToCompany(): void {
    let userIds: Array<number> = [];
    let newUserIds: Array<number>;

    this.selectedUsers.forEach((newUser: number) => {
      this.companyUsers.forEach((user: CompanyUserRoleTable) => {
        if (userIds.indexOf(user.id) === -1) { userIds.push(user.id); }
        if (this.selectedUsers.indexOf(user.id) > -1) { // found from table in the selection
          if (this.selectedRoles.indexOf(user.roleId) > -1) { // found both in table and the selection
            this.notificationService.error('User/Role already exists!');
          } else { // a new role for existing table user
            let newValue: CompanyUserRole = {
              id: user.id,
              userId: newUser,
              companyId: this.company.id,
              companyRole: this.selectedRoles.concat(user.roleId)
            };
            this.newUsers = this.companyUserService
              .setUsersInCompany(this.company.id, newValue);
          }
        }
       });
    });
    userIds.sort();
    this.selectedUsers.sort();
    newUserIds = this.selectedUsers.filter(id => userIds.indexOf(id) === -1);
    newUserIds.forEach(newId => {
      let newTableId = this.companyUserService.getLastUserCompanyId() + 1;
      let newValue: CompanyUserRole = {
        id: newTableId,
        userId: newId,
        companyId: this.company.id,
        companyRole: this.selectedRoles
      };
      this.newUsers = this.companyUserService
        .setUsersInCompany(this.company.id, newValue);
    });
  }
  getSelectedUsers(users: User[]) {
     users.forEach((user: User) => {
       // filter only unique id's
       if (this.selectedUsers.indexOf(user.id) === -1) {
         this.selectedUsers.push(user.id);
         this.showAddCompanyButton = true;
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
  editCompany(data): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    let nrVoiceLicences = this.editForm.controls.voiceLicences.value;
    let nrDigitalLicences = this.editForm.controls.digitalLicences.value;
    dialogRef.afterClosed().subscribe(result => {
      if (parseInt(result, 10)) {
        this.companyService.updateCompanyById(this.company.id, {voiceLicences: nrVoiceLicences, digitalLicences: nrDigitalLicences});
      }
    });
  }
}
