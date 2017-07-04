import { Component, Input } from '@angular/core';
import { Company } from '../../services/company/company';
import { CompanyService } from '../../services/company/company.service';


@Component({
  selector: 'my-list-speed-dial',
  templateUrl: './list-speed-dial.component.html',
  providers: [CompanyService]
})
export class ListSpeedDialComponent {
  @Input()company: Company;
  public open = false;
  public fixed = false;
  public spin = true;
  public direction = 'left';
  public animationMode = 'scale';
  constructor(private companyService: CompanyService) {}

  _click(event: any) {
    console.log(event);
  }
  removeCompany(company) {
    console.log(company);
    return this.companyService.deleteCompanyById(company.id);
  }
}
