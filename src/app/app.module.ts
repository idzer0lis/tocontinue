import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ListComponent } from './components/company-listing/company-listing.component';
import { SearchComponent } from './components/search/search.component';
import { ValidationComponent } from './components/validation/validation.component';
import { ValidationService } from './services/validation/validation.service';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';
import { NotificationComponent } from './components/notification/notification.component';

import { AuthGuard } from './services/auth.guard/auth.guard.service';
import { UserService } from './services/user/';
import { NotificationService } from './services/notification/notification.service';
import { CompanyService } from './services/company/company.service';
import { SearchService } from './services/search/search.service';
import { routing } from './app.routing';
import {
  CovalentExpansionPanelModule,
  CovalentDataTableModule,
  TdDataTableService,
  CovalentPagingModule,
  CovalentSearchModule
} from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CompanyFilter } from './services/filter/companyFilter.component';
import { TenantFilter } from './services/filter/tenantFilter.component';
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

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendData }  from './services/in-memory-data.service';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

let IMPORTS = [
  BrowserModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  routing,
  InMemoryWebApiModule.forRoot(BackendData),
  BrowserAnimationsModule,
  MaterialModule,
  FlexLayoutModule,
  CovalentExpansionPanelModule,
  CovalentHighlightModule,
  MdDialogModule,
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule
];
let COMPONENTS = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  ValidationComponent,
  NavbarComponent,
  TabsComponent,
  SidenavComponent,
  ListComponent,
  SearchComponent,
  NavbarMenuComponent,
  NotificationComponent,
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
  CompanyAddComponent
];
let PROVIDERS = [
  UserService,
  ValidationService,
  AuthGuard,
  NotificationService,
  CompanyService,
  SearchService,
  TdDataTableService
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
