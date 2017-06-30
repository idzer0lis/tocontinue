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
  public filter = '';
  // public filter: Company = new Company;

  constructor(private companyService: CompanyService) {}

  addCompany() {
    this.companyService.addCompany(this.newCompany);
    this.newCompany = new Company();
  }

  removeCompany(company) {
    this.companyService.deleteCompanyById(company.id);
  }

  get companies() {
    return this.companyService.getAllcompanies();
  }

  get tenants() {
    let tenants = [];
    this.companyService.getAllcompanies().forEach(company => {
      tenants.push(company.tenants);
    });
    console.log(tenants);
    return tenants;
  }
}
