import { Pipe, PipeTransform } from '@angular/core';

import { Tenant } from '../company/tenant';

@Pipe({
  name: 'myTenantFilter',
  pure: false
})
export class TenantFilter implements PipeTransform {
  transform(items: Tenant[], filter: string): Tenant[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Tenant) => this.applyFilter(item, filter));
  }

  // It does not filter tenants yet. Thinking about a solution
  applyFilter(tenant: Tenant, filter: string): boolean {
    if (tenant.title.toLowerCase().indexOf(filter.toLowerCase()) === -1 /*||
     Company.tenants[0].title.toLowerCase().indexOf(filter.toLowerCase()) === -1*/) {
      return false;
    }
    return true;
  }
}
