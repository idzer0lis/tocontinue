/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
export class CompanyUserRoleTable {
  id: number;
  username: string;
  roleId: number;
  role: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
