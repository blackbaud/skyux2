import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyProgressIndicatorComponent,
  SkyProgressIndicatorMessageType
} from '../../core';

@Component({
  selector: 'app-progress-indicator-demo',
  templateUrl: './progress-indicator-demo.component.html',
  styleUrls: ['./progress-indicator-demo.component.scss']
})
export class SkyProgressIndicatorDemoComponent {

  private firstDone = false;
  private secondDone = false;
  private thirdDone = false;

  @ViewChild('progressIndicator')
  private progressIndicator: SkyProgressIndicatorComponent;

  public isDone(index: number) {
    switch (index) {
      case 1: return this.firstDone;
      case 2: return this.secondDone;
      case 3: return this.thirdDone;
      default: return false;
    }
  }

  public buttonClicked(index: number, value: boolean) {
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

  private progress(type: SkyProgressIndicatorMessageType) {
    this.progressIndicator.messageStream.next(type);
  }

}
