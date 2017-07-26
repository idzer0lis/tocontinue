import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../../services/user/user.service';
import { CompanyService } from '../../services/company/company.service';
import { Company } from '../../models/company';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { ValidationService } from '../../services/validation/validation.service';
import { slideInDownAnimation } from '../../animations/animations';

@Component({
  selector: 'my-company-add',
  templateUrl: './company-add-form.component.html',
  styleUrls: ['./company-add-form.component.scss'],
  providers: [NotificationService, ValidationService],
  animations: [slideInDownAnimation]
})
export class CompanyAddComponent implements OnInit {
  private editForm: FormGroup;
  public newCompany: Company = new Company();
  public newUsers: Object;
  public selectedRoles: Array<number> = [];
  public selectedUsers: Array<number> = [];
  public showAddCompanyButton = false;
  constructor(
    public dialog: MdDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.editForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      'voiceLicences': ['', [
        Validators.required,
        Validators.min(0),
        ValidationService.isInteger
      ]],
      'digitalLicences': ['', [
        Validators.required,
        Validators.min(0),
        ValidationService.isInteger
      ]]
    });
  }
  addToCompany() {
    let newCompanyId = this.companyService.getLastCompanyId() + 1;
    this.newUsers = this.userService.setUsersInCompany(newCompanyId, {userId: this.selectedUsers, companyRole: this.selectedRoles});
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
  addCompany(data) {
    if (this.editForm.controls.name.invalid ||
        this.editForm.controls.voiceLicences.invalid ||
        this.editForm.controls.digitalLicences.invalid ) { return; }
    console.log(this.newCompany);
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    // No error handling for now, validation will come in
    dialogRef.afterClosed().subscribe(result => {
      if (parseInt(result, 10)) {
        this.addToCompany();
        this.companyService.addCompany(this.newCompany);
      }
    });
  }
}
