import { Component, ViewChild } from '@angular/core';

import { SkyTileComponent } from '../../tile';

@Component({
  selector: 'sky-test-cmp-2',
  directives: [SkyTileComponent],
  template: require('./tile2.component.fixture.html')
})
export class Tile2TestComponent {
  @ViewChild(SkyTileComponent)
  public tile: SkyTileComponent;

  public tileSettingsClick() { }
}
