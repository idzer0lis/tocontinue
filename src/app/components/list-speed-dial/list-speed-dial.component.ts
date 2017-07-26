import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Company } from '../../models/company';
import { Tenant } from '../../services/company/tenant';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ListComponent } from '../company-listing/company-listing.component';


@Component({
  selector: 'my-list-speed-dial',
  templateUrl: './list-speed-dial.component.html',
  styleUrls: ['./list-speed-dial.component.scss']
})
export class ListSpeedDialComponent {
  @Input()company = Company;
  @Input()tenant: Tenant;
  @Output()selectedCompany = new EventEmitter<Company>();
  // List speed dial options
  public open = false;
  public fixed = false;
  public spin = false;
  public direction = 'right';
  public animationMode = 'scale';
  constructor(
    public dialog: MdDialog,
    @ViewChild(ListComponent)
    private listComponent: ListComponent
  ) {}

  public editCompany(company: Company): void {
    this.selectedCompany.emit(company);
  }
  openDialog(data) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    dialogRef.afterClosed().subscribe(result => {
      if (parseInt (result, 10)) {
        switch (data.action) {
          case 'add':
            console.log('add tenant');
            break;
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
