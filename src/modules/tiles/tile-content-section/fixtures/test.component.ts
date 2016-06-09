import { Component } from '@angular/core';

import { SkyTileComponent } from '../../tile';
import { SkyTileContentSectionComponent } from '../../tile-content-section';

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyTileComponent, SkyTileContentSectionComponent],
  template: `
    <sky-tile>
      <sky-tile-title>Title</sky-tile-title>
      <sky-tile-content>
        <sky-tile-content-section>
          <span class="test-content"></span>
        </sky-tile-content-section>
      </sky-tile-content>
    </sky-tile>
  `
})
export class TestComponent { }
