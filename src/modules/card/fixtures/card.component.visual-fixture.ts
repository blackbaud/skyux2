import { Component } from '@angular/core';

import { SkyCardComponent } from '../../../../src/core';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./card.component.visual-fixture.html'),
  directives: [SkyCardComponent]
})
class AppComponent { }

Bootstrapper.bootstrap(AppComponent);
