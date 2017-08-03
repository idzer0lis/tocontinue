/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Pipe, PipeTransform } from '@angular/core';

import { Company } from '../../models/company';

@Pipe({
  name: 'myCompanyFilter',
  pure: false
})
export class CompanyFilter implements PipeTransform {
  transform(items: Company[], filter: string): Company[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Company) => this.applyFilter(item, filter));
  }

  // It does not filter tenants yet. Thinking about a solution
  applyFilter(Company: Company, filter: string): boolean {
    if (Company.title.toLowerCase().indexOf(filter.toLowerCase()) === -1 /*||
    Company.tenants[0].title.toLowerCase().indexOf(filter.toLowerCase()) === -1*/) {
      return false;
    }
    return true;
    /*Company.tenants.forEach(tenant => {
      console.log(tenant);
      if (tenant.title.toLowerCase().indexOf(filter.toLowerCase()) === -1) {
        return false;
      }
    });
    return true;*/
  }
}
