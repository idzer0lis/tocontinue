var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ApiService } from './services';
import '../style/app.scss';
var AppComponent = (function () {
    function AppComponent(api) {
        this.api = api;
        this.url = 'git@github.com:idzer0lis/angular2starter.git';
        this.title = this.api.title;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
    }),
    __metadata("design:paramtypes", [ApiService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map