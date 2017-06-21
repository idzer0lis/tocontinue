"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This shows a different way of testing a component, check about for a simpler one
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var home_component_1 = require("./home.component");
var login_component_1 = require("../login/login.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var in_memory_data_service_1 = require("../../services/in-memory-data.service");
describe('Home Component', function () {
    var html = '<my-home></my-home>';
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.UserData)],
            declarations: [home_component_1.HomeComponent, login_component_1.LoginComponent, TestComponent]
        });
        testing_1.TestBed.overrideComponent(TestComponent, { set: { template: html } });
    });
    it('should ...', function () {
        var fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].textContent).toContain('Home Works!');
    });
});
var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
TestComponent.decorators = [
    { type: core_1.Component, args: [{ selector: 'my-test', template: '' },] },
];
/** @nocollapse */
TestComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=home.component.spec.js.map