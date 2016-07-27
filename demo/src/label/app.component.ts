import { Component } from '@angular/core';

import { SkyLabelComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyLabelComponent]
})
class AppComponent {
}

Bootstrapper.bootstrap(AppComponent);
