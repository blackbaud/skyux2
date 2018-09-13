import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import {
  SkyModalInstance,
  SkyProgressIndicatorChange,
  SkyProgressIndicatorDisplayMode
} from '../../core';

@Component({
  selector: 'sky-demo-progress-indicator-horizontal',
  templateUrl: './progress-indicator-horizontal-demo.component.html'
})
export class SkyProgressIndicatorHorizontalDemoComponent {
  public activeIndex = 0;
  public title = 'Progress indicator wizard example';
  public requiredValue1: string;
  public requiredValue2: boolean;
  public displayMode = SkyProgressIndicatorDisplayMode.Horizontal;

  public get requirementsMet(): boolean {
    switch (this.activeIndex) {
      case 0:
        return !!this.requiredValue1;
      case 1:
        return !!this.requiredValue2;
      default:
        return false;
    }
  }

  public get isDone(): boolean {
    return this.activeIndex === 2;
  }

  constructor(
    public instance: SkyModalInstance,
    private changeDetector: ChangeDetectorRef
  ) { }

  public updateIndex(changes: SkyProgressIndicatorChange): void {
    this.activeIndex = changes.activeIndex;
    this.changeDetector.detectChanges();
  }
}
