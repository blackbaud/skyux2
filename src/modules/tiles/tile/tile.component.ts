import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output
} from '@angular/core';

import slideAnimation from '../../animation/slide';
import { SkyChevronComponent } from '../../chevron/chevron.component';
import { SkyResourcesPipe } from '../../resources/resources.pipe';
import { SkyTileDashboardService } from './../tile-dashboard';

@Component({
  selector: 'sky-tile',
  styles: [require('./tile.component.scss')],
  template: require('./tile.component.html'),
  directives: [SkyChevronComponent],
  pipes: [SkyResourcesPipe],
  animations: [slideAnimation]
})
export class SkyTileComponent implements AfterViewInit {
  public isInDashboardColumn = false;

  @Output()
  public settingsClick = new EventEmitter();

  @Output()
  public collapsedStateChange = new EventEmitter<boolean>();

  @Input()
  public get isCollapsed(): boolean {
    if (this.dashboardService) {
      return this.dashboardService.tileIsCollapsed(this);
    }

    return this._isCollapsed;
  }

  public set isCollapsed(value: boolean) {
    if (this.dashboardService) {
      this.dashboardService.setTileCollapsed(this, value);
    } else {
      this._isCollapsed = value;
    }

    if (this.viewInitialized) {
      this.slideForCollapsed(true);
    }
  }

  private _isCollapsed = false;

  private viewInitialized = false;

  public settingsButtonClicked() {
    this.settingsClick.emit(undefined);
  }

  public get hasSettings(): boolean {
    return this.settingsClick.observers.length > 0;
  }

  constructor(
    @Optional() private dashboardService: SkyTileDashboardService,
    public elementRef: ElementRef
  ) {
    this.isInDashboardColumn = !!dashboardService;
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
