import { Component } from '@angular/core';

import { SkyChevronComponent } from '../../../src/modules/chevron';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyChevronComponent]
})
export class AppComponent {
  public direction = 'up';
}

Bootstrapper.bootstrap(AppComponent);
