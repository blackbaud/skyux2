import { Component } from '@angular/core';

import { SkyCardComponent } from '../../../src/modules/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [SkyCardComponent]
})
export class AppComponent {
  showCardTitle = true;

  showCheckbox = true;
}

Bootstrapper.bootstrap(AppComponent);
