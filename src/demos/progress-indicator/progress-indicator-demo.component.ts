import {
  Component
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  SkyProgressIndicatorMessageType,
  SkyModalService,
  SkyProgressIndicatorChange
} from '../../core';

import {
  SkyProgressIndicatorDemoFormComponent
} from './progress-indicator-demo-form.component';

@Component({
  selector: 'app-progress-indicator-demo',
  templateUrl: './progress-indicator-demo.component.html',
  styleUrls: ['./progress-indicator-demo.component.scss']
})
export class SkyProgressIndicatorDemoComponent {

  public activeIndex = 0;
  public progress = new Subject<SkyProgressIndicatorMessageType>();

  private firstDone = true;
  private secondDone = false;
  private thirdDone = false;

  constructor(private modal: SkyModalService) { }

  public openWizard() {
    this.modal.open(SkyProgressIndicatorDemoFormComponent);
  }

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
    this.progress.next(value ? SkyProgressIndicatorMessageType.ItemComplete : SkyProgressIndicatorMessageType.ItemIncomplete);
  }

  public resetClicked() {
    this.firstDone = false;
    this.secondDone = false;
    this.thirdDone = false;
    this.progress.next(SkyProgressIndicatorMessageType.ProgressReset);
  }

  public updateIndex(changes: SkyProgressIndicatorChange) {
    this.activeIndex = changes.activeIndex;
  }
}
