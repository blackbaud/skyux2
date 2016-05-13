import { Component } from '@angular/core';

import { SkyChevronComponent } from '../../../src/modules/chevron';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [SkyChevronComponent]
})
export class AppComponent {
  direction = 'up';
}

Bootstrapper.bootstrap(AppComponent);
