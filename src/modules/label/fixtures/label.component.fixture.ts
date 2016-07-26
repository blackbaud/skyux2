import { Component } from '@angular/core';

import { SkyLabelComponent } from '../label.component';

@Component({
  selector: 'sky-test-cmp',
  template: `
<sky-label [labelType]="labelType">Test label</sky-label>
  `,
  directives: [SkyLabelComponent]
})
export class LabelTestComponent {
  public labelType = 'danger';
}
