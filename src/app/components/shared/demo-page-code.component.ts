import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { SkyDemoPageCodeFile } from './demo-page-code-file';
import { SkyDemoPagePlunkerService } from './demo-page-plunker-service';
import { SkyDemoComponentsService } from '../demo-components.service';

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
  public set demoName(value: string) {

    let items = this.componentsService.getComponents().find((item) => {
      return item.name === value;
    });

    this.codeFilesForBinding = items.getCodeFiles().map((item) => {
      return new SkyDemoPageCodeFile(
        item.name,
        item.fileContents,
        item.componentName,
        item.bootstrapSelector
      );
    });
  }

  public get plunkerFiles(): any[] {
    return [
      ...this.plunkerService.getFiles(this.codeFilesForBinding)
    ];
  }

  constructor(
    private plunkerService: SkyDemoPagePlunkerService,
    private componentsService: SkyDemoComponentsService
  ) { }
}
