import { InMemoryDbService } from 'angular-in-memory-web-api';

export class UserData implements InMemoryDbService {
  createDb() {
    // Call the fake backend api with /api/users
    let users = [
      {
        username: 'admin',
        password: 'admin12',
        role: 1,
        token: 'fake-token'
      },
      {
        username: 'user',
        password: 'user12',
        role: 2,
        token: 'fake-token'
      }];
    return {users};
  }
}
