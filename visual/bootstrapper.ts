import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { SKY_PROVIDERS } from '../src/core';

require('style-loader!../src/scss/sky.scss');
require('font-awesome-webpack');

window.onerror = function (message, file, line, column, errorObj) {
  let node = document.createElement('div');

  node.innerText =
    'Message: ' + message + ' file: ' + file + ' line: ' + line + ' stack: ' + errorObj.stack;

  document.body.appendChild(node);
}

export class Bootstrapper {
  public static bootstrap(componentType: any, dependencies: any[] = []): void {
    dependencies = dependencies || [];

    dependencies = [
      ...dependencies,
      ...SKY_PROVIDERS
    ];

    bootstrap(componentType, dependencies);
  }

  public static bootstrapModule(moduleType: any) {
    platformBrowserDynamic().bootstrapModule(moduleType);
  }
}
