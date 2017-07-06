import { Tenant } from './tenant';
import { User } from '../user/user';
export class Company {
  id: number;
  title: string;
  tenants: Array<Tenant>;
  users: Array<User>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
