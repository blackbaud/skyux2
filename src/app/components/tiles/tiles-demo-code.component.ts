import { Component } from '@angular/core';

import { SkyDemoPageCodeFile } from '../../shared/demo-page-code-file';

@Component({
  selector: 'sky-tiles-demo-code',
  template: `
<sky-demo-page-code [codeFiles]="codeFiles"></sky-demo-page-code>
  `
})
export class SkyTilesDemoCodeComponent {
  public codeFiles: SkyDemoPageCodeFile[] = [
    new SkyDemoPageCodeFile('tiles', 'tiles-demo.component.html'),
    new SkyDemoPageCodeFile('tiles', 'tiles-demo.component.ts'),
    new SkyDemoPageCodeFile('tiles', 'tiles-demo-tile1.component.html'),
    new SkyDemoPageCodeFile('tiles', 'tiles-demo-tile1.component.ts'),
    new SkyDemoPageCodeFile('tiles', 'tiles-demo-tile2.component.html'),
    new SkyDemoPageCodeFile('tiles', 'tiles-demo-tile2.component.ts')
  ];
}
