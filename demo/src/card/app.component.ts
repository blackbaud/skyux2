import { Component } from '@angular/core';

import { SkyCardComponent } from '../../../src/modules/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyCardComponent]
})
export class AppComponent {
  public showCardTitle = true;

  public showCheckbox = true;
}

Bootstrapper.bootstrap(AppComponent);
