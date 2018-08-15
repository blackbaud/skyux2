import {
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';

import { SkyModalInstance, SkyProgressIndicatorComponent } from '../../core';

@Component({
  selector: 'sky-demo-progress-indicator-form',
  templateUrl: './progress-indicator-demo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyProgressIndicatorDemoFormComponent {
  @ViewChild(SkyProgressIndicatorComponent)
  private progressIndicator: SkyProgressIndicatorComponent;

  public title = 'Progress indicator wizard example';
  public requiredValue1: string;
  public requiredValue2: boolean;

  public get requirementsMet(): boolean {
    switch (this.progressIndicator.activeIndex) {
      case 0:
        return !!this.requiredValue1;
      case 1:
        return !!this.requiredValue2;
      default:
        return false;
    }

    return undefined;
  }

  constructor(
    public instance: SkyModalInstance
  ) { }
}
