import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../services/company/company';
import { Tenant } from '../../services/company/tenant';
import { CompanyService } from '../../services/company/company.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'my-list-speed-dial',
  templateUrl: './list-speed-dial.component.html',
  styleUrls: ['./list-speed-dial.component.scss'],
  providers: [CompanyService]
})
export class ListSpeedDialComponent {
  @Input()company: Company;
  @Input()tenant: Tenant;
  @Output() selectedCompany: EventEmitter<Company> = new EventEmitter<Company>();
  public open = false;
  public fixed = false;
  public spin = false;
  public direction = 'right';
  public animationMode = 'scale';
  constructor(private companyService: CompanyService, public dialog: MdDialog) {}

  openDialog(data) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  _click(event: any) {
    console.log(event);
  }
  editCompany(company: Company) {
    // console.log(company);
    this.selectedCompany.emit(company);
  }
  removeCompany(company: Company): CompanyService {
    console.log(company);
    return this.companyService.deleteCompanyById(company.id);
  }
}
