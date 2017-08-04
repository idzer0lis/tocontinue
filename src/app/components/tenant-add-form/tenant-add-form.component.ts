/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Tenant instructions.
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
import { Tenant } from '../../models/tenant';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company/company.service';
import { ValidationService } from '../../services/validation/validation.service';
import { slideInDownAnimation } from '../../animations/animations';
import { Role } from '../../models/role';
import { User } from '../../models/user';

@Component({
  selector: 'my-tenant-add',
  templateUrl: './tenant-add-form.component.html',
  providers: [CompanyService, TenantService, NotificationService, ValidationService],
  animations: [slideInDownAnimation]
})
export class TenantAddComponent implements OnInit, OnChanges {
  @Input()company: Company;
  private editForm: FormGroup;
  public newTenant: Tenant = new Tenant();
  public selectedRoles: Array<number> = [];
  public selectedUsers: Array<number> = [];
  public showAddCompanyButton = false;

  constructor(
    public dialog: MdDialog,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private tenantService: TenantService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }
  ngOnChanges(): void {
    this.buildForm();
    this.selectedUsers = [];
    this.selectedRoles = [];
    this.notificationService.error(null);
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
  addTenant(data) {
    if (this.editForm.controls.name.invalid) { return; }
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    dialogRef.afterClosed().subscribe(result => {
      if (parseInt(result, 10)) {
        return this.tenantService.addTenant(this.company.id, this.newTenant);
      }
    });
  }

  getSelectedUsers(users: User[]): void {
    users.forEach((user: User) => {
      // filter only unique id's
      if (this.selectedUsers.indexOf(user.id) === -1) {
        this.selectedUsers.push(user.id);
        this.showAddCompanyButton = true;
      }
    });
  }
  getSelectedRoles(roles: Role[]): void {
    roles.forEach((role: Role) => {
      if (this.selectedRoles.indexOf(role.id) === -1) {
        this.selectedRoles.push(role.id);
      }
    });
  }
  addToCompany(data: any): void {
    if (this.editForm.controls.name.invalid ||
      this.editForm.controls.voiceLicences.invalid ||
      this.editForm.controls.digitalLicences.invalid ) { return; }
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    // No error handling for now, validation will come in
    dialogRef.afterClosed().subscribe(result => {
      if (parseInt(result, 10)) {
        console.log('adding tenant');
        return this.companyService.addCompany(this.company);
      }
    });
  }
}
