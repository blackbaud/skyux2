import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

require('style-loader!../src/scss/sky.scss');
require('font-awesome-webpack');

export class Bootstrapper {
  public static bootstrapModule(moduleType: any) {
    platformBrowserDynamic().bootstrapModule(moduleType);
  }
}
