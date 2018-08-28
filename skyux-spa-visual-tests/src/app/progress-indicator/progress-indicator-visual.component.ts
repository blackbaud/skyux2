import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyProgressIndicatorComponent,
  SkyProgressIndicatorMessageType,
  SkyModalService
} from '@blackbaud/skyux/dist/core';

import {
  SkyProgressIndicatorHorizontalVisualComponent
} from './progress-indicator-horizontal-visual.component';

@Component({
  selector: 'progress-indicator-visual',
  templateUrl: './progress-indicator-visual.component.html'
})
export class ProgressIndicatorVisualComponent {
  public step1 = false;
  public step2 = false;
  public step3 = false;

  @ViewChild(SkyProgressIndicatorComponent)
  private progressIndicator: SkyProgressIndicatorComponent;

  constructor(private modal: SkyModalService) { }

  public progress(): void {
    this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.Progress);
  }

  public regress(): void {
    this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.Regress);
  }

  public openWizard(): void {
    this.modal.open(SkyProgressIndicatorHorizontalVisualComponent);
  }
}
