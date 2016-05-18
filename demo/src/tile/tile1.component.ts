import { Component } from '@angular/core';

import {
  SkyTileComponent,
  SkyTileContentSectionComponent
} from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'div.tile-1',
  template: `
    <sky-tile (settingsClick)="tileSettingsClick()">
      <sky-tile-title>
        Tile 1
      </sky-tile-title>
      <sky-tile-summary>
        $123.4m
      </sky-tile-summary>
      <sky-tile-content>
        <sky-tile-content-section>Section 1</sky-tile-content-section>
        <sky-tile-content-section>Section 2</sky-tile-content-section>
        <sky-tile-content-section>
          asdf asdf asdf sadf sadf asdf asdf sadf asdf asdf asdf asdf asdf asdf
          asdf asdf asdf sadf sadf asdf asdf sadf asdf asdf asdf asdf asdf asdf
          asdf asdf asdf sadf sadf asdf asdf sadf asdf asdf asdf asdf asdf asdf
          asdf asdf asdf sadf sadf asdf asdf sadf asdf asdf asdf asdf asdf asdf
        </sky-tile-content-section>
      </sky-tile-content>
    </sky-tile>
  `,
  directives: [
    SkyTileComponent,
    SkyTileContentSectionComponent
  ]
})
export class Tile1Component {
  constructor() {
    console.log('Created tile 1 component');
  }

  public tileSettingsClick() {
    alert('tile settings clicked');
  }
}
