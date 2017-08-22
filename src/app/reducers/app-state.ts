import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { companies, CompaniesList } from './company.reducer';
import { companiesUserRoleReducer, CompanyUserRoleList }  from './company-user-role.reducer';

export interface AppState {
  companies: CompaniesList;
  companyUserRoles: CompanyUserRoleList;
}
export default compose(combineReducers)({
  companies: companies,
  companyUserRoles: companiesUserRoleReducer
});
