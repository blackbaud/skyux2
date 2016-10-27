import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const styleLoader = require('../config/utils/sky-style-loader');

(window as any).stylesAreLoaded = function () {
  return styleLoader.stylesAreLoaded();
};

export class Bootstrapper {
  public static bootstrapModule(moduleType: any) {
    platformBrowserDynamic().bootstrapModule(moduleType);
  }
}
