import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyProgressIndicatorComponent,
  SkyProgressIndicatorMessageType
} from '..';

@Component({
  selector: 'test-progress-indicator',
  templateUrl: './progress-indicator.component.fixture.html'
})
export class ProgressIndicatorTestComponent {

  public firstDone = false;
  public secondDone = false;
  public thirdDone = false;

  @ViewChild(SkyProgressIndicatorComponent)
  public progressIndicator: SkyProgressIndicatorComponent;

  public isDone(index: number) {
    switch (index) {
      case 1: return this.firstDone;
      case 2: return this.secondDone;
      case 3: return this.thirdDone;
      default: return false;
    }
  }

  public changeProgress(index: number, value: boolean) {
    switch (index) {
      case 1:
        this.firstDone = value;
        break;
      case 2:
        this.secondDone = value;
        break;
      case 3:
        this.thirdDone = value;
        break;
      default:
        break;
    }
    this.progress(value ? SkyProgressIndicatorMessageType.ItemComplete : SkyProgressIndicatorMessageType.ItemIncomplete);
  }

  public resetClicked() {
    this.firstDone = false;
    this.secondDone = false;
    this.thirdDone = false;
    this.progress(SkyProgressIndicatorMessageType.ProgressReset);
  }

  public progress(type: SkyProgressIndicatorMessageType) {
    this.progressIndicator.messageStream.next(type);
  }

}
