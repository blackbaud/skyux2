import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
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
  styleUrls: ['./progress-indicator-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyProgressIndicatorDemoComponent {

  public activeIndex = 0;
  public progressMessageStream = new Subject<SkyProgressIndicatorMessageType>();

  constructor(
    private modal: SkyModalService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public openWizard() {
    this.modal.open(SkyProgressIndicatorDemoFormComponent);
  }

  public progress() {
    this.progressMessageStream.next(SkyProgressIndicatorMessageType.Progress);
  }

  public regress() {
    this.progressMessageStream.next(SkyProgressIndicatorMessageType.Regress);
  }

  public resetClicked() {
    this.progressMessageStream.next(SkyProgressIndicatorMessageType.Reset);
  }

  public updateIndex(changes: SkyProgressIndicatorChange) {
    this.activeIndex = changes.activeIndex;
    this.changeDetector.detectChanges();
  }
}
