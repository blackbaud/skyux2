import { Component } from '@angular/core';

import { SkyKeyInfoComponent } from '../key-info.component';

@Component({
  selector: 'sky-test-cmp',
  template: `
<div>
  <sky-key-info [layout]="layout">
    <sky-key-info-label>Label</sky-key-info-label>
    <sky-key-info-value>Value</sky-key-info-value>
  </sky-key-info>
</div>
  `,
  directives: [SkyKeyInfoComponent]
})
export class TestComponent {
  public layout = 'vertical';
}
