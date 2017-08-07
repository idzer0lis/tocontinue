/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { TenantService } from '../../services/tenant/tenant.service';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company/company.service';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { ValidationService } from '../../services/validation/validation.service';
import { slideInDownAnimation } from '../../animations/animations';

@Component({
  selector: 'my-tenant-edit',
  templateUrl: './tenant-edit-form.component.html',
  providers: [TenantService, NotificationService, ValidationService],
  animations: [slideInDownAnimation]
})
export class TenantEditComponent implements OnInit, OnChanges {
  private editForm: FormGroup;
  @Input()company: Company;
  public showAddCompanyButton = false;
  public selectedRoles: Array<number> = [];
  public selectedUsers: Array<number> = [];

  constructor(
    public dialog: MdDialog,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private tenantService: TenantService,
    private notificationService: NotificationService,
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.editForm = this.fb.group({
      'name': [this.company.title, [
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
  ngOnChanges() {
    this.buildForm();
    this.notificationService.error(null);
    this.selectedUsers = [];
    this.selectedRoles = [];
  }
  editTenant(data): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    dialogRef.afterClosed().subscribe(result => {
      if (parseInt(result, 10)) {
        this.tenantService.updateTenantById(this.company.id, {name: this.editForm.controls.name});
      }
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
  addToCompany(data) {
    if (this.editForm.controls.name.invalid ||
      this.editForm.controls.voiceLicences.invalid ||
      this.editForm.controls.digitalLicences.invalid ) { return; }
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    // No error handling for now, validation will come in
    dialogRef.afterClosed().subscribe(result => {
      if (parseInt(result, 10)) {
        console.log('adding company');
        return this.companyService.createCompany(this.company);
      }
    });
  }
}
