/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { User } from './user';
import { Company } from './company';
import { CompanyUserRole } from './company-user-role';
import { Tenant } from './tenant';

export interface AppStore {
  user: User;
  users: User[];
  company: Company;
  companies: Company[];
  companyUsers: CompanyUserRole[];
  tenant: Tenant;
  tenants: Tenant[];
}
