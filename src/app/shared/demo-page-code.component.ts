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
  public set codeFiles(value: SkyDemoPageCodeFile[]) {
    if (value) {
      for (let codeFile of value) {
        codeFile.codeFormatted = Prism.highlight(
          codeFile.code,
          Prism.languages[codeFile.language]
        );
      }
    }

    this._codeFiles = value;
  }

  public get codeFiles(): SkyDemoPageCodeFile[] {
    return this._codeFiles;
  }

  private _codeFiles: SkyDemoPageCodeFile[];
}
