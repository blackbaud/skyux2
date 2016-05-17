import { Component } from '@angular/core';

import { SkyCheckboxComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyCheckboxComponent]
})
export class AppComponent {
  public selected = false;
}

Bootstrapper.bootstrap(AppComponent);
