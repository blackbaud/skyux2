import { Component } from '@angular/core';

import {
  SkyTileComponent,
  SkyTileContentSectionComponent
} from '../../../src/modules/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'div.tile-2',
  template: `
    <sky-tile>
      <sky-tile-title>
        Tile 2
      </sky-tile-title>
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
export class Tile2Component {
  constructor() {
    console.log('Created tile 2 component');
  }
}
