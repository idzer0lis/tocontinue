/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
// Modules
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './modules/auth.module';

import { reducers } from './reducers/';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ListComponent } from './components/company-listing/company-listing.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';
import {
  CovalentExpansionPanelModule,
  CovalentDataTableModule,
  TdDataTableService,
  CovalentPagingModule,
  CovalentSearchModule
} from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import {
  FabSpeedDialActionsComponent,
  FabSpeedDialComponent,
  FabSpeedDialTriggerComponent } from './components/speed-dial/speed-dial.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ListSpeedDialComponent } from './components/list-speed-dial/list-speed-dial.component';
import { CompanyEditComponent } from './components/company-edit-form/company-edit-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { CompanyUserTableComponent } from './components/company-user-table/company-user-table.component';
import { CompanyRoleTableComponent } from './components/company-role-table/company-role-table.component';
import { CompanyAddComponent } from './components/company-add-form/company-add-form.component';
import { TenantAddComponent } from './components/tenant-add-form/tenant-add-form.component';
import { TenantEditComponent } from './components/tenant-edit-form/tenant-edit-form.component';

// Filters
import { CompanyFilter } from './services/filter/companyFilter.component';
import { TenantFilter } from './services/filter/tenantFilter.component';

// Services
import { UserService } from './services/user/user.service';
import { RoleService } from './services/role/role.service';
import { CompanyService } from './services/company/company.service';
import { CompanyRoleService } from './services/company-role/company-role.service';
import { CompanyUserService } from './services/company-user/company-user.service';
import { ValidationService } from './services/validation/validation.service';
import { NotificationService } from './services/notification/notification.service';
import { SearchService } from './services/search/search.service';
import { TenantService } from './services/tenant/tenant.service';

// Routing
import { routes } from './app.routing';
import { AuthGuard } from './services/auth.guard/auth.guard.service';
import { CustomRouterStateSerializer } from './services/routes/route';

// Imports for loading & configuring the in-memory web api

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

const IMPORTS = [
  BrowserModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  MaterialModule,
  FlexLayoutModule,
  CovalentExpansionPanelModule,
  CovalentHighlightModule,
  MdDialogModule,
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule,
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot([]),
  RouterModule.forRoot(routes, { useHash: true }),
  /**
   * Store devtools instrument the store retaining past versions of state
   * and recalculating new states. This enables powerful time-travel
   * debugging.
   *
   * To use the debugger, install the Redux Devtools extension for either
   * Chrome or Firefox
   *
   * See: https://github.com/zalmoxisus/redux-devtools-extension
   */
  StoreDevtoolsModule.instrument(),
  /**
   * @ngrx/router-store keeps router state up-to-date in the store.
   */
  StoreRouterConnectingModule,
  AuthModule.forRoot(),

];
const COMPONENTS = [
  AppComponent,
  HomeComponent,
  NavbarComponent,
  TabsComponent,
  SidenavComponent,
  ListComponent,
  SearchComponent,
  NavbarMenuComponent,
  CompanyFilter,
  TenantFilter,
  FabSpeedDialActionsComponent,
  FabSpeedDialComponent,
  FabSpeedDialTriggerComponent,
  ListSpeedDialComponent,
  DialogComponent,
  CompanyEditComponent,
  UserTableComponent,
  CompanyUserTableComponent,
  CompanyRoleTableComponent,
  CompanyAddComponent,
  TenantAddComponent,
  TenantEditComponent
];
const PROVIDERS = [
  UserService,
  RoleService,
  CompanyService,
  CompanyUserService,
  CompanyRoleService,
  ValidationService,
  AuthGuard,
  NotificationService,
  SearchService,
  TdDataTableService,
  TenantService,
  /**
   * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
   * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
   */
  { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
];

@NgModule({
  imports: IMPORTS,
  declarations: COMPONENTS,
  providers: PROVIDERS,
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [DialogComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store: any): void {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store: any): void {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store: any): void {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
