"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
function getTranslationProviders() {
    // Get the locale id from the global
    const locale = document['locale'];
    // return no providers if fail to get translation file for locale
    const noProviders = [];
    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en-US') {
        return Promise.resolve(noProviders);
    }
    // Ex: 'locale/messages.es.xlf`
    const translationFile = `./locale/messages.${locale}.xlf`;
    return getTranslationsWithSystemJs(translationFile)
        .then((translations) => [
        { provide: core_1.TRANSLATIONS, useValue: translations },
        { provide: core_1.TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: core_1.LOCALE_ID, useValue: locale }
    ])
        .catch(() => noProviders); // ignore if file not found
}
exports.getTranslationProviders = getTranslationProviders;
function getTranslationsWithSystemJs(file) {
    return System.import(file + '!text'); // relies on text plugin
}
//# sourceMappingURL=i18n-providers.js.map