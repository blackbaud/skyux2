import { Component } from '@angular/core';

import { SkyAvatarComponent, SkyCheckboxComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyAvatarComponent, SkyCheckboxComponent]
})
class AppComponent {
  public name = 'Robert C. Hernandez';

  public showImage: boolean;

  public get src(): string {
    return this.showImage ? require('./avatar.png') : undefined;
  }
}

Bootstrapper.bootstrap(AppComponent);
