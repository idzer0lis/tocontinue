/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class BackendData implements InMemoryDbService {
  createDb() {
    // Call the fake backend api with /api/[entity]
    let users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin12',
        role: 1,
        token: 'fake-token',
      },
      {
        id: 2,
        username: 'user', // add firstname, secondname
        password: 'user12',
        role: 2,
        token: 'fake-token',
      }];
    let roles = [
      {
        id: 1,
        name: 'Sys admin',
      },
      {
        id: 2,
        name: 'Sys user',
      }];
    let companyRoles = [
      {
        id: 1,
        name: 'Survey master'
      },
      {
        id: 2,
        name: 'Survey user'
      }
    ];
    let companyUserRoles = [ // many-to-many
      {
        id: 1,
        userId: 1,
        username: 'admin',
        companyId: 1,
        companyRole: [1],
        rolename: '' // to be removed
      },
      {
        id: 2,
        userId: 2,
        username: 'user',
        companyId: 2,
        companyRole: [2],
        rolename: '' // to be removed
      },
      {
        id: 3,
        userId: 2,
        username: 'user',
        companyId: 1,
        companyRole: [1],
        rolename: '' // to be removed
      },
    ];
    let company = [
      {
        id: 1,
        title: 'First Company',
        tenants:
          [{
            id: 1,
            title: 'First Tenant from Company 1'
          },
          {
            id: 2,
            title: 'Second Tenant from Company 1'
          }],
        current_voice_licences: 2,
        digital_licences_per_day: 4,
      },
      {
        id: 2,
        title: 'Second Company',
        tenants:
        [{
          id: 3,
          title: 'First Tenant from Company 2'
        }],
        current_voice_licences: 3,
        digital_licences_per_day: 1,
      }
    ];
    return { users, company, roles, companyRoles, companyUserRoles };
  }
}
