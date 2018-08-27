import {
  Component,
  ViewChild,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SkyProgressIndicatorComponent,
  SkyProgressIndicatorMessageType,
  SkyProgressIndicatorChange
} from '..';
import {
  SkyProgressIndicatorNavButtonComponent
} from '../progress-indicator-nav-button';
import { SkyProgressIndicatorResetButtonComponent } from '../progress-indicator-reset-button';

@Component({
  selector: 'test-progress-indicator',
  templateUrl: './progress-indicator.component.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressIndicatorTestComponent {
  public isHorizontal: boolean;
  public startingIndex: number;

  public previousButtonText: string;
  public previousButtonType = 'previous';
  public previousButtonDisabled: boolean;

  public nextButtonText: string;
  public nextButtonType = 'next';
  public nextButtonDisabled: boolean;

  public resetButtonDisabled: boolean;

  public activeIndex = 0;
  public resetWasClicked = false;

  @ViewChild(SkyProgressIndicatorComponent)
  public progressIndicator: SkyProgressIndicatorComponent;

  @ViewChildren(SkyProgressIndicatorNavButtonComponent)
  public navButtons: QueryList<SkyProgressIndicatorNavButtonComponent>;

  @ViewChild(SkyProgressIndicatorResetButtonComponent)
  public resetButton: SkyProgressIndicatorResetButtonComponent;

  constructor(private changeDetector: ChangeDetectorRef) { }

  public progress() {
    this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.Progress);
  }

  public regress() {
    this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.Regress);
  }

  public resetClicked() {
    this.resetWasClicked = true;
  }

  public updateIndex(changes: SkyProgressIndicatorChange) {
    this.activeIndex = changes.activeIndex;
    this.changeDetector.detectChanges();
  }
}
