import { Component } from '@angular/core';

import { SkyAlertComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyAlertComponent]
})
class AppComponent {
  public alertCloseable = true;
}

Bootstrapper.bootstrap(AppComponent);
