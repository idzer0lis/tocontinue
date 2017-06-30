export class Company {
  id: number;
  title: string;
  tenants: Array<object>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
