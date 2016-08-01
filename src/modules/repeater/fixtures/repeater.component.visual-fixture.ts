import { Component } from '@angular/core';

import { SkyRepeaterComponent, SkyRepeaterItemComponent } from '../../../../src/core';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./repeater.component.visual-fixture.html'),
  directives: [SkyRepeaterComponent, SkyRepeaterItemComponent]
})
export class AppComponent {
  public isCustomExpanded = false;
  public isCustomCollapsible = true;
  public customExpandMode = 'multiple';
}

Bootstrapper.bootstrap(AppComponent);
