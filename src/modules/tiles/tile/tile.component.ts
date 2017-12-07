import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output
} from '@angular/core';

import skyAnimationSlide from '../../animation/slide';
import { SkyTileDashboardService } from '../tile-dashboard/tile-dashboard.service';

@Component({
  selector: 'sky-tile',
  styleUrls: ['./tile.component.scss'],
  templateUrl: './tile.component.html',
  animations: [skyAnimationSlide]
})
export class SkyTileComponent {
  public isInDashboardColumn = false;

  @Output()
  public settingsClick = new EventEmitter();

  @Output()
  public isCollapsedChange = new EventEmitter<boolean>();

  public get isCollapsed(): boolean {
    if (this.dashboardService) {
      return this.dashboardService.tileIsCollapsed(this);
    }

    return this._isCollapsed;
  }

  @Input()
  public set isCollapsed(value: boolean) {
    if (this.dashboardService) {
      this.dashboardService.setTileCollapsed(this, value);
    } else {
      this._isCollapsed = value;
    }

    this.isCollapsedChange.emit(value);
  }

  private _isCollapsed = false;

  constructor(
    public elementRef: ElementRef,
    @Optional() private dashboardService: SkyTileDashboardService
  ) {
    this.isInDashboardColumn = !!dashboardService;
  }

  public settingsButtonClicked() {
    this.settingsClick.emit(undefined);
  }

  public get hasSettings(): boolean {
    return this.settingsClick.observers.length > 0;
  }

  public titleClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  public chevronDirectionChange(direction: string) {
    this.isCollapsed = direction === 'down';
  }
}
