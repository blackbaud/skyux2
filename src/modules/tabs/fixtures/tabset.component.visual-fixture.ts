import { Component } from '@angular/core';

import { SkyTabComponent, SkyTabsetComponent } from '../../../../src/core';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./tabset.component.visual-fixture.html'),
  directives: [SkyTabComponent, SkyTabsetComponent ]
})
export class AppComponent {
  public newTabClick() { }
  public openTabClick() { }
  public closeTab() { }
}

Bootstrapper.bootstrap(AppComponent);
