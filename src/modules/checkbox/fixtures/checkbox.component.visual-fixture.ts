import { Component } from '@angular/core';

import { SkyCheckboxComponent } from '../../../../src/core';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./checkbox.component.visual-fixture.html'),
  directives: [SkyCheckboxComponent]
})
class AppComponent { }

Bootstrapper.bootstrap(AppComponent);
