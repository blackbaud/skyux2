import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentResolver,
  Input,
  OnChanges,
  SimpleChange,
  ViewChild
} from 'angular2/core';
import {Dragula} from 'ng2-dragula/ng2-dragula';
import {SkyTileDashboardColumnContentComponent} from './tile-dashboard-column-content.component';
import {SkyTileDashboardConfigTile} from './tile-dashboard-config-tile';
import {SkyTileDashboardService} from './tile-dashboard.service';

let columnIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula, SkyTileDashboardColumnContentComponent]
})
export class SkyTileDashboardColumnComponent implements OnChanges, AfterViewInit {
  public bagId: string;

  public columnId: string;

  @Input()
  public tiles: SkyTileDashboardConfigTile[];

  @ViewChild('content')
  private _content: SkyTileDashboardColumnContentComponent;

  private _viewInitialized = false;

  constructor(
    private _dashboardService: SkyTileDashboardService,
    private _cmpResolver: ComponentResolver
  ) {
    columnIdIndex++;

    this.columnId = 'tile-dashboard-column-' + columnIdIndex;

    this.bagId = _dashboardService.bagId;
  }

  public updateTiles() {
    if (this._viewInitialized && this.tiles) {
      for (let tile of this.tiles) {
        this._cmpResolver.resolveComponent(tile.component)
          .then((factory: ComponentFactory) => {
            let componentRef = this._content.viewContainer.createComponent(factory);
            componentRef.instance.tileId = tile.id;
          });
      }
    }
  }

  public ngAfterViewInit() {
    this._viewInitialized = true;
    this.updateTiles();
  }

  public ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    let tilesChange = changes['tiles'];

    if (tilesChange && tilesChange.currentValue) {
      this.updateTiles();
    }
  }
}
