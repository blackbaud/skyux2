import { Component } from '@angular/core';

import { SkyAvatarComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyAvatarComponent]
})
class AppComponent {
  public name = 'Robert C. Hernandez';
}

Bootstrapper.bootstrap(AppComponent);
