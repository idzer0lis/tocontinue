import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company/company.service';
import { slideInDownAnimation } from '../../animations/animations';

@Component({
  selector: 'my-list',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.scss'],
  providers: [CompanyService],
  animations: [slideInDownAnimation]
})
export class ListComponent implements OnInit {
  private companies: Company[];
  private currentCompany: Company;
  public showAddCompany = false;
  public filterText = '';

  constructor(private companyService: CompanyService) {}
  ngOnInit() {
    this.companyService.getAllcompanies().subscribe(companies => this.companies = companies );
  }
  removeCompany(company: Company): void {
    this.companyService.deleteCompanyById(company.id);
  }
  selectedCompany(company: Company) {
    this.currentCompany = company;
    this.showAddCompany = false;
  }
}
