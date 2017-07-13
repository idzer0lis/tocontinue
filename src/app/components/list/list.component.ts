import { Component, OnInit } from '@angular/core';
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
export class ListComponent implements OnInit {
  private companies: Company[];
  private currentCompany: Company;
  public newCompany: Company = new Company();
  public showAddCompany = false;
  public filterText = '';

  constructor(private companyService: CompanyService) {}
  ngOnInit() {
    this.companyService.getAllcompanies().subscribe(companies => this.companies = companies );
  }

  addCompany() {
    this.companyService.addCompany(this.newCompany);
    this.newCompany = new Company();
  }
  removeCompany(company: Company): void {
    this.companyService.deleteCompanyById(company.id);
  }
  selectedCompany(company: Company) {
    this.currentCompany = company;
  }
}
