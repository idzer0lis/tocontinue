import { NgModule, ApplicationRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ListComponent } from './components/list/list.component';
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
import { CovalentExpansionPanelModule } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CompanyFilter } from './services/filter/companyFilter.component';
import { TenantFilter } from './services/filter/tenantFilter.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendData }  from './services/in-memory-data.service';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
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
    CovalentHighlightModule
  ],
  declarations: [
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
    TenantFilter
  ],
  providers: [
    UserService,
    ValidationService,
    AuthGuard,
    NotificationService,
    CompanyService,
    SearchService
  ],
  bootstrap: [AppComponent]
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
