/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Company } from '../../models/company';
import { Tenant } from '../../models/tenant';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ListComponent } from '../company-listing/company-listing.component';
import { TenantService } from '../../services/tenant/tenant.service';


@Component({
  selector: 'my-list-speed-dial',
  templateUrl: './list-speed-dial.component.html',
  styleUrls: ['./list-speed-dial.component.scss']
})
export class ListSpeedDialComponent {
  @Input()company = Company;
  @Input()tenant: Tenant;
  @Output()selectedCompany = new EventEmitter<Company>();
  @Output() showAddTenant = new EventEmitter<Company>();
  @Output() showEditTenant = new EventEmitter<Company>();
  // List speed dial options
  public open = false;
  public fixed = false;
  public spin = false;
  public direction = 'right';
  public animationMode = 'scale';
  constructor(
    public dialog: MdDialog,
    @ViewChild(ListComponent)
    private listComponent: ListComponent,
    private tenantService: TenantService
  ) {}

  public editCompany(company: Company): void {
    this.selectedCompany.emit(company);
  }
  public addTenant(company: Company): void {
    this.showAddTenant.emit(company);
  }
  public editTenant(company: Company): void {
    console.log(company);
    this.selectedCompany.emit(company);
  }
  openDialog(data) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    dialogRef.afterClosed().subscribe(result => {
      if (parseInt (result, 10)) {
        switch (data.action) {
          case 'delete':
            this.listComponent.removeCompany(data.company);
            break;
          case 'disable':
            console.log('disable');
            break;
          default:
            break;
        }
      }
    });
  }
}
