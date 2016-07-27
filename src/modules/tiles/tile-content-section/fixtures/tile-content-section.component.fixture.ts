import { Component } from '@angular/core';

import { SkyTileComponent } from '../../tile';
import { SkyTileContentSectionComponent } from '../../tile-content-section';

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyTileComponent, SkyTileContentSectionComponent],
  template: require('./tile-content-section.component.fixture.html')
})
export class TileContentSectionTestComponent { }
