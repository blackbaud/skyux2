import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output
} from '@angular/core';

import {
  skyAnimationSlide
} from '../../animation/slide';

import {
  SkyTileDashboardService
} from '../tile-dashboard';

@Component({
  selector: 'sky-tile',
  styleUrls: ['./tile.component.scss'],
  templateUrl: './tile.component.html',
  animations: [skyAnimationSlide]
})
export class SkyTileComponent {
  public isInDashboardColumn = false;

  @Input()
  public showSettings: boolean = true;

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
    return this.settingsClick.observers.length > 0 && this.showSettings;
  }

  public titleClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  public chevronDirectionChange(direction: string) {
    this.isCollapsed = direction === 'down';
  }

  public moveTile(event: KeyboardEvent) {
    if (this.isInDashboardColumn) {
      let direction: 'up' | 'down' | 'left' | 'right';
      switch (event.key.toLowerCase()) {
        case 'arrowup':
        case 'up':
          // up arrow
          direction = 'up';
          break;

        case 'arrowdown':
        case 'down':
          // down arrow
          direction = 'down';
          break;

        case 'arrowleft':
        case 'left':
          // left arrow
          direction = 'left';
          break;

        case 'arrowright':
        case 'right':
          // right arrow
          direction = 'right';
          break;

        default:
          break;
      }
      if (direction) {
        this.dashboardService.moveTile(this, direction);
        this.focusHandle();
      }
    }
  }

  private focusHandle(): void {
    this.elementRef.nativeElement.querySelector('.sky-tile-grab-handle').focus();
  }
}
