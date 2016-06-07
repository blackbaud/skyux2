import { Component } from '@angular/core';

import { SkyTileComponent } from '../';

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyTileComponent],
  template: `
    <sky-tile [isCollapsed]="tileIsCollapsed" (settingsClick)="tileSettingsClick()">
      <sky-tile-title>Title</sky-tile-title>
      <sky-tile-content>Content</sky-tile-content>
    </sky-tile>
  `
})
export class TestComponent {
  public tileIsCollapsed = false;

  public tileSettingsClick() {

  }
}
