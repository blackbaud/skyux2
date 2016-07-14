import { Component } from '@angular/core';

import { SkyChevronComponent } from '../../../../src/modules/chevron';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./chevron.component.visual-fixture.html'),
  directives: [SkyChevronComponent]
})
class AppComponent {
  public directionUp = 'up';
  public directionDown = 'down';
}

Bootstrapper.bootstrap(AppComponent);
