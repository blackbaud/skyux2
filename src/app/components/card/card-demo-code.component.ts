import { Component } from '@angular/core';

import { SkyDemoPageCodeFile } from '../shared/demo-page-code-file';

@Component({
  selector: 'sky-card-demo-code',
  template: `
<sky-demo-page-code [codeFiles]="codeFiles"></sky-demo-page-code>
  `
})
export class SkyCardDemoCodeComponent {
  public codeFiles: SkyDemoPageCodeFile[] = [
    new SkyDemoPageCodeFile('card', 'card-demo.component.html'),
    new SkyDemoPageCodeFile('card', 'card-demo.component.ts')
  ];
}
