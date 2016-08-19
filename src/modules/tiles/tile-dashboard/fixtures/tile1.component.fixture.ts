import { Component, ViewChild } from '@angular/core';

import { SkyTileComponent } from '../../tile';

@Component({
  selector: 'sky-test-cmp',
  template: require('./tile1.component.fixture.html')
})
export class Tile1TestComponent {
  @ViewChild(SkyTileComponent)
  public tile: SkyTileComponent;

  public tileSettingsClick() { }
}
