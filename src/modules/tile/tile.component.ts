import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Optional,
  Output
} from 'angular2/core';
import {SkySlideService} from '../animation/slide.service';
import {SkyChevronComponent} from '../chevron/chevron.component';
import {SkyResourcesPipe} from '../resources/resources.pipe';
import {SkyTileDashboardService} from './tile-dashboard.service';

@Component({
  selector: 'sky-tile',
  styles: [require('./tile.component.scss')],
  template: require('./tile.component.html'),
  directives: [SkyChevronComponent],
  pipes: [SkyResourcesPipe],
  viewProviders: [SkySlideService]
})
export class SkyTileComponent implements AfterViewInit {
  public tileId: string;

  public isInDashboardColumn = false;

  @Output()
  public settingsClick = new EventEmitter();

  @Output()
  public collapsedStateChange = new EventEmitter<boolean>();

  private get isCollapsed(): boolean {
    if (this.dashboardService) {
      return this.dashboardService.tileIsCollapsed(this);
    }

    return this._isCollapsed;
  }

  private set isCollapsed(value: boolean) {
    if (this.dashboardService) {
      this.dashboardService.setTileCollapsed(this, value);
    } else {
      this._isCollapsed = value;
    }

    this.slideForCollapsed();
  }

  private _isCollapsed = false;

  public settingsButtonClicked() {
    this.settingsClick.emit(undefined);
  }

  public get hasSettings(): boolean {
    return this.settingsClick.observers.length > 0;
  }

  constructor(
    @Optional() private dashboardService: SkyTileDashboardService,
    private slideService: SkySlideService,
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
    if (this.isCollapsed) {
      this.slideForCollapsed(false);
    }
  }

  private slideForCollapsed(animate = true) {
    let direction = this.isCollapsed ? 'up' : 'down';
    this.slideService.slide(this.elementRef, '.sky-tile-content', direction, animate);
  }
}
