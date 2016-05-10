import {bootstrap} from 'angular2/platform/browser';

require('style-loader!../src/scss/sky.scss');
require('font-awesome-webpack');

export class Bootstrapper {
  static bootstrap(componentType: any): void {

    bootstrap(componentType);
  }
}
