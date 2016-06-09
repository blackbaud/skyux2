import { Component, ViewChild } from '@angular/core';

import { SkyTileComponent } from '../../tile';

@Component({
  selector: 'sky-test-cmp-2',
  directives: [SkyTileComponent],
  template: `
    <sky-tile (settingsClick)="tileSettingsClick()">
      <sky-tile-title>Title</sky-tile-title>
      <sky-tile-content>Content</sky-tile-content>
    </sky-tile>
  `
})
export class Test2Component {
  @ViewChild(SkyTileComponent)
  public tile: SkyTileComponent;

  public tileSettingsClick() { }
}
