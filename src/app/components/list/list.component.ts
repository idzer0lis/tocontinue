import { Component } from '@angular/core';
import { Company } from '../../services/company/company';
import { CompanyService } from '../../services/company/company.service';
import { slideInDownAnimation } from '../../animations/animations';


@Component({
  selector: 'my-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [CompanyService],
  animations: [slideInDownAnimation]
})
export class ListComponent {
  public newCompany: Company = new Company();
  public showAddCompany = false;
  public filterText = '';

  constructor(private companyService: CompanyService) {}

  addCompany() {
    this.companyService.addCompany(this.newCompany);
    this.newCompany = new Company();
  }

  get companies() {
    return this.companyService.getAllcompanies();
  }
}
