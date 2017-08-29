/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Tenant } from './tenant';
import { User } from './user';
export class Company {
  id: number;
  title: string;
  tenants: Array<Tenant>;
  users: Array<User>;
  voiceLicences: number;
  digitalLicences: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
