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
