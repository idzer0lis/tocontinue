import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { getTranslationProviders } from './app/services/locale/i18n-providers';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
}
console.log('Running JIT compiled');
export function main() {
  getTranslationProviders().then(providers => {
    const options = { providers };
    return platformBrowserDynamic().bootstrapModule(AppModule, options);
  });
  // return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
