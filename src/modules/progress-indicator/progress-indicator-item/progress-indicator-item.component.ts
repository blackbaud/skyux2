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
  public isActive = false;
  public isComplete = false;
  public isLastItem = false;
  public displayMode = SkyProgressIndicatorDisplayMode.Vertical;
  public isNextToInactive = true;

  @Input()
  public itemNumber: number;

  @Input()
  public title: string;

  public get isHorizontal(): boolean {
    return this.displayMode === SkyProgressIndicatorDisplayMode.Horizontal;
  }
}
