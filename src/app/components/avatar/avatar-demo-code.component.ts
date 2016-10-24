import { Component } from '@angular/core';

import { SkyDemoPageCodeFile } from '../shared/demo-page-code-file';

@Component({
  selector: 'sky-avatar-demo-code',
  template: `
<sky-demo-page-code [codeFiles]="codeFiles"></sky-demo-page-code>
  `
})
export class SkyAvatarDemoCodeComponent {
  public codeFiles: SkyDemoPageCodeFile[] = [
    new SkyDemoPageCodeFile('avatar', 'avatar-demo.component.html'),
    new SkyDemoPageCodeFile('avatar', 'avatar-demo.component.ts')
  ];
}
