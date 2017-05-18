import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
console.log('before requires');
const styleLoader = require('../config/utils/sky-style-loader');

require('../node_modules/axe-core/axe.min.js');
console.log('after requires');

(window as any).styleLoader = styleLoader;

export class Bootstrapper {
  public static bootstrapModule(moduleType: any) {
    platformBrowserDynamic().bootstrapModule(moduleType);
  }
}
