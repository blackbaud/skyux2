import { Component } from '@angular/core';

import { SkyDemoPageCodeFile } from '../../shared/demo-page-code-file';

@Component({
  selector: 'sky-alert-demo-code',
  template: `
<sky-demo-page-code [codeFiles]="codeFiles"></sky-demo-page-code>
  `
})
export class SkyAlertDemoCodeComponent {
  public codeFiles: SkyDemoPageCodeFile[] = [
    new SkyDemoPageCodeFile('alert', 'alert-demo.component.html'),
    new SkyDemoPageCodeFile('alert', 'alert-demo.component.ts')
  ];
}
