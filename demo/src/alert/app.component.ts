import { Component } from '@angular/core';

import { SkyAlertComponent } from '../../../src/modules/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [SkyAlertComponent]
})
class AppComponent {
  alertCloseable = true;
}

Bootstrapper.bootstrap(AppComponent);
