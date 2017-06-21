"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
var i18n_providers_1 = require("./app/services/locale/i18n-providers");
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
    core_1.enableProdMode();
}
console.log('Running JIT compiled');
function main() {
    i18n_providers_1.getTranslationProviders().then(function (providers) {
        var options = { providers: providers };
        return platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule, options);
    });
    // return platformBrowserDynamic().bootstrapModule(AppModule);
}
exports.main = main;
if (document.readyState === 'complete') {
    main();
}
else {
    document.addEventListener('DOMContentLoaded', main);
}
//# sourceMappingURL=main.js.map