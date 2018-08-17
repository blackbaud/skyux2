import {
  Component,
  ViewChild,
  QueryList,
  ViewChildren
} from '@angular/core';

import {
  SkyProgressIndicatorComponent,
  SkyProgressIndicatorMessageType
} from '..';
import { SkyProgressIndicatorNavButtonComponent } from '../progress-indicator-nav-button';

@Component({
  selector: 'test-progress-indicator',
  templateUrl: './progress-indicator.component.fixture.html'
})
export class ProgressIndicatorTestComponent {
  public isHorizontal: boolean;

  public firstDone = false;
  public secondDone = false;
  public thirdDone = false;

  public previousButtonText: string;
  public previousButtonType = 'previous';
  public previousButtonDisabled: boolean;

  public nextButtonText: string;
  public nextButtonType = 'next';
  public nextButtonDisabled: boolean;

  @ViewChild(SkyProgressIndicatorComponent)
  public progressIndicator: SkyProgressIndicatorComponent;

  @ViewChildren(SkyProgressIndicatorNavButtonComponent)
  public navButtons: QueryList<SkyProgressIndicatorNavButtonComponent>;

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
