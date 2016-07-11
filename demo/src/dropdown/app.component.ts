import { Component } from '@angular/core';

import { SkyDropdownComponent, SkyDropdownItemComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyDropdownComponent, SkyDropdownItemComponent]
})
class AppComponent {
  public dropdownOpen = false;

  public click() {
    this.dropdownOpen = true;
  }
}

Bootstrapper.bootstrap(AppComponent);
