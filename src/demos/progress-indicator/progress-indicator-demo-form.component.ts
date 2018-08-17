import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  SkyModalInstance,
  SkyProgressIndicatorChange
} from '../../core';

@Component({
  selector: 'sky-demo-progress-indicator-form',
  templateUrl: './progress-indicator-demo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyProgressIndicatorDemoFormComponent {
  public activeIndex = 0;
  public title = 'Progress indicator wizard example';
  public requiredValue1: string;
  public requiredValue2: boolean;

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

  constructor(
    public instance: SkyModalInstance
  ) { }

  public updateIndex(changes: SkyProgressIndicatorChange) {
    this.activeIndex = changes.activeIndex;
  }
}
