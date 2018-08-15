import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyProgressIndicatorComponent,
  SkyProgressIndicatorMessageType,
  SkyModalService
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

  private firstDone = false;
  private secondDone = false;
  private thirdDone = false;

  @ViewChild(SkyProgressIndicatorComponent)
  private progressIndicator: SkyProgressIndicatorComponent;

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
