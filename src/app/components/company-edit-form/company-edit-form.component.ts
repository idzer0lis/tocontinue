import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
  selector: 'my-company-edit',
  templateUrl: './company-edit-form.component.html',
  styleUrls: ['./company-edit-form.component.scss'],
  providers: [NotificationService, ValidationService],
  animations: [slideInDownAnimation]
})
export class CompanyEditComponent implements OnInit, OnChanges {
  private editForm: FormGroup;
  @Input()company: Company;
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
  }
  addToCompany(): void {
    this.newUsers = this.userService.setUsersInCompany(this.company.id, {userId: this.selectedUsers, companyRole: this.selectedRoles});
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
