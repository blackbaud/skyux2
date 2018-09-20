import {
  Component,
  Input
} from '@angular/core';

import {
  SkyProgressIndicatorDisplayMode
} from '../types/progress-indicator-mode';

@Component({
  selector: 'sky-progress-indicator-item',
  templateUrl: './progress-indicator-item.component.html',
  styleUrls: ['./progress-indicator-item.component.scss']
})
export class SkyProgressIndicatorItemComponent {
  public itemNumber: number;
  public isActive = false;
  public isComplete = false;
  public isLastItem = false;
  public displayMode = SkyProgressIndicatorDisplayMode.Vertical;
  public isPassive = false;
  public isNextToInactive = true;

  @Input()
  public title: string;

  public get displayTitle(): string {
    if (this.isPassive) {
      return this.isActive || this.isComplete ? this.title : '';
    } else {
      return this.itemNumber + ' - ' + this.title;
    }
  }

  public get isHorizontal(): boolean {
    return this.displayMode === SkyProgressIndicatorDisplayMode.Horizontal;
  }
}
