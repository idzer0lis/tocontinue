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
        companyId: [1],
      },
      {
        id: 2,
        username: 'user',
        password: 'user12',
        role: 2,
        token: 'fake-token',
        companyId: [2],
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
        companyId: 1,
        companyRole: [1],
      },
      {
        id: 2,
        userId: 2,
        companyId: 2,
        companyRole: [2],
      }
    ];
    let companies = [
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
        voiceLicences: 2,
        digitalLicences: 4,
      },
      {
        id: 2,
        title: 'Second Company',
        tenants:
        [{
          id: 3,
          title: 'First Tenant from Company 2'
        }],
        voiceLicences: 3,
        digitalLicences: 1,
      }
    ];
    return { users, companies, roles, companyRoles, companyUserRoles };
  }
}
