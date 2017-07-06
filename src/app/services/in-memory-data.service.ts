import { InMemoryDbService } from 'angular-in-memory-web-api';

export class BackendData implements InMemoryDbService {
  createDb() {
    // Call the fake backend api with /api/users
    let users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin12',
        role: 1,
        token: 'fake-token'
      },
      {
        id: 2,
        username: 'user',
        password: 'user12',
        role: 2,
        token: 'fake-token'
      }];
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
        users: [1, 2], // simulating one-to-many relationship
      },
      {
        id: 2,
        title: 'Second Company',
        tenants:
        [{
          id: 3,
          title: 'First Tenant from Company 2'
        }],
        users: [1],
      }
    ];
    return { users, companies };
  }
}
