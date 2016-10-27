import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const styleLoader = require('../config/utils/sky-style-loader');

(window as any).styleLoader = styleLoader;

export class Bootstrapper {
  public static bootstrapModule(moduleType: any) {
    platformBrowserDynamic().bootstrapModule(moduleType);
  }
}
