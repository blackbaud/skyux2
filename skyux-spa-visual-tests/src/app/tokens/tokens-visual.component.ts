import {
  Component
} from '@angular/core';

import {
  SkyToken
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'tokens-visual',
  templateUrl: './tokens-visual.component.html'
})
export class TokensVisualComponent {
  public colors: SkyToken[] = [
    { name: 'Black' },
    { name: 'Blue' },
    { name: 'Brown' },
    { name: 'Green' },
    { name: 'Orange' },
    { name: 'Pink' },
    { name: 'Purple' },
    { name: 'Red' },
    { name: 'Turquoise' },
    { name: 'White' },
    { name: 'Yellow' }
  ].map(value => ({ value }));

  public filters: SkyToken[] = [
    { label: 'Canada' },
    { label: 'Older than 55' },
    { label: 'Employed' },
    { label: 'Added before 2018' }
  ].map(value => ({ value }));
}
