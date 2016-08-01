import { Component } from '@angular/core';

import { SkyTileComponent } from '../';

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyTileComponent],
  template: require('./tile.component.fixture.html')
})
export class TileTestComponent {
  public tileIsCollapsed = false;

  public tileSettingsClick() {

  }
}
