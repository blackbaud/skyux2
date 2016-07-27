import { bootstrap } from '@angular/platform-browser-dynamic';

require('style-loader!../src/scss/sky.scss');
require('font-awesome-webpack');

export class Bootstrapper {
  static bootstrap(componentType: any): void {

    bootstrap(componentType);
  }

  static bootstrapDependencies(componentType: any, dependencies: any): void {

    bootstrap(componentType, dependencies);
  }
}
