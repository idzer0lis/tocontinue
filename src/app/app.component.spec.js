"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var router_1 = require("@angular/router");
var testing_2 = require("@angular/router/testing");
var services_1 = require("./services");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var in_memory_data_service_1 = require("./services/in-memory-data.service");
describe('App', function () {
    // provide our implementations or mocks to the dependency injector
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule, http_1.HttpModule, angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.UserData)],
            declarations: [app_component_1.AppComponent],
            providers: [services_1.ApiService, router_1.provideRoutes([])]
        });
    });
    it('should have an url', function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.componentInstance.url).toEqual('git@github.com:idzer0lis/angular2starter.git');
    });
});
//# sourceMappingURL=app.component.spec.js.map