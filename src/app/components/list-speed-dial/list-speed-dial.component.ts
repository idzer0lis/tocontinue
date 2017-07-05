import { Component, Input } from '@angular/core';
import { Company } from '../../services/company/company';
import { Tenant } from '../../services/company/tenant';
import { CompanyService } from '../../services/company/company.service';


@Component({
  selector: 'my-list-speed-dial',
  templateUrl: './list-speed-dial.component.html',
  styleUrls: ['./list-speed-dial.component.scss'],
  providers: [CompanyService]
})
export class ListSpeedDialComponent {
  @Input()company: Company;
  @Input()tenant: Tenant;
  public open = false;
  public fixed = false;
  public spin = false;
  public direction = 'right';
  public animationMode = 'scale';
  constructor(private companyService: CompanyService) {}

  _click(event: any) {
    console.log(event);
  }
  removeCompany(company: Company): CompanyService {
    console.log(company);
    return this.companyService.deleteCompanyById(company.id);
  }
}
