import {
  AfterViewInit,
  animate,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  trigger,
  state,
  style,
  transition
} from '@angular/core';

import { SkyTileDashboardService } from '../tile-dashboard/tile-dashboard.service';

@Component({
  selector: 'sky-tile',
  styleUrls: ['./tile.component.scss'],
  templateUrl: './tile.component.html',
  animations: [trigger('slide', [
    state('down', style({
      overflow: 'hidden',
      height: '*'
    })),
    state('up', style({
      overflow: 'hidden',
      height: 0
    })),
    transition(
      'up <=> down',
      animate('150ms ease-in')
    )
  ])]
})
export class SkyTileComponent implements AfterViewInit {
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

    if (this.viewInitialized) {
      this.slideForCollapsed(true);
    }

    this.isCollapsedChange.emit(value);
  }

  private _isCollapsed = false;
  private viewInitialized = false;

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

  public ngAfterViewInit() {
    this.viewInitialized = true;

    if (this.isCollapsed) {
      this.slideForCollapsed(false);
    }
  }

  private slideForCollapsed(animate: boolean) {
    // let direction = this.isCollapsed ? 'up' : 'down';
    // this.slideService.slide(this.elementRef, '.sky-tile-content', direction, animate);
  }
}
