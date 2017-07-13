/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
export class CompanyUserRole {
  id: number;
  companyId: number;
  userId: Array<number>;
  companyRole: Array<number>;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
