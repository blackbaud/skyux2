import { Component } from '@angular/core';

import { SkyLabelComponent } from '../../../../src/core';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./label.component.visual-fixture.html'),
  directives: [SkyLabelComponent]
})
class AppComponent { }

Bootstrapper.bootstrap(AppComponent);
