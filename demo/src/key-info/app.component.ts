import { Component } from '@angular/core';

import { SkyKeyInfoComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyKeyInfoComponent]
})
export class AppComponent {
  public layout = 'vertical';
}

Bootstrapper.bootstrap(AppComponent);
