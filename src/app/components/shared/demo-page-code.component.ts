import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

declare let Prism: any;
import 'prismjs/prism';
import 'prismjs/components/prism-typescript';

import { SkyDemoPageCodeFile } from './demo-page-code-file';

@Component({
  selector: 'sky-demo-page-code',
  templateUrl: './demo-page-code.component.html',
  styleUrls: ['./demo-page-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoPageCodeComponent {
  @Input()
  public codeFilesForBinding: SkyDemoPageCodeFile[];

  @Input()
  public set codeFiles(value: {folder: string, name: string}[]) {
    this.codeFilesForBinding = value.map((item) => {
      return new SkyDemoPageCodeFile(item.folder, item.name);
    });
  };
}
