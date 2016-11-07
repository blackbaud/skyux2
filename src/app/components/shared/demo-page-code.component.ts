import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

declare let Prism: any;
import 'prismjs/prism';
import 'prismjs/components/prism-typescript';

import { SkyDemoPageCodeFile } from './demo-page-code-file';
import { SkyDemoPagePlunkerService } from './demo-page-plunker-service';

@Component({
  selector: 'sky-demo-page-code',
  templateUrl: './demo-page-code.component.html',
  styleUrls: ['./demo-page-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkyDemoPagePlunkerService]
})
export class SkyDemoPageCodeComponent {
  @Input()
  public codeFilesForBinding: SkyDemoPageCodeFile[];

  @Input()
  public get plunkerFiles(): any[] {
    return [
      ...this.plunkerService.getFiles(this.codeFilesForBinding)
    ];
  }

  @Input()
  public set codeFiles(
    value: {
      folder: string,
      name: string,
      componentName: string,
      bootstrapSelector: string
    }[]
  ) {
    this.codeFilesForBinding = value.map((item) => {
      return new SkyDemoPageCodeFile(
        item.folder,
        item.name,
        item.componentName,
        item.bootstrapSelector
      );
    });
  };

  constructor(private plunkerService: SkyDemoPagePlunkerService) { }
}
