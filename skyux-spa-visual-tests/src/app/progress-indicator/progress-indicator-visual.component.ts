import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyProgressIndicatorComponent,
  SkyProgressIndicatorMessageType
} from '@blackbaud/skyux/dist/core';

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

  public progress() {
    this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.Progress);
  }

  public regress() {
    this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.Regress);
  }
}
