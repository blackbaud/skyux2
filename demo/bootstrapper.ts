import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

require('../src/scss/sky.scss');
// require('font-awesome-webpack');

export class Bootstrapper {
  public static bootstrapModule(moduleType: any) {
    platformBrowserDynamic().bootstrapModule(moduleType);
  }
}
