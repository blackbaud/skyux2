import { Component } from '@angular/core';

import { SkyKeyInfoComponent } from '../../../../src/core';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./key-info.component.visual-fixture.html'),
  directives: [SkyKeyInfoComponent]
})
export class AppComponent {}

Bootstrapper.bootstrap(AppComponent);
