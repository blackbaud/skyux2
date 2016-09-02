import { Component } from '@angular/core';

import { SkyAvatarSrc } from '../';

@Component({
  selector: 'sky-test-cmp',
  template: require('./avatar.component.fixture.html')
})
export class AvatarTestComponent {
  public src: SkyAvatarSrc;

  public name: string;
}
