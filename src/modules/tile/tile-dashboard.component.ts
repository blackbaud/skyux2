import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileComponent} from './tile.component';
import {SkyTileDashboardColumnComponent} from './tile-dashboard-column.component';
import {SkyTileDashboardConfig} from './tile-dashboard-config';
import {SkyTileDashboardConfigColumn} from './tile-dashboard-config-column';
import {SkyTileDashboardConfigTile} from './tile-dashboard-config-tile';

let bagIdIndex = 0;

function findTile(dashboardConfig: SkyTileDashboardConfig, tileId: string): SkyTileDashboardConfigTile {
  if (dashboardConfig && dashboardConfig.columns) {
    for (let column of dashboardConfig.columns) {
      if (column.tiles) {
        for (let tile of column.tiles) {
          if (tile.id === tileId) {
            return tile;
          }
        }
      }
    }
  }

  return undefined;
}

@Component({
  selector: 'sky-tile-dashboard',
  styles: [require('./tile-dashboard.component.scss')],
  template: require('./tile-dashboard.component.html'),
  directives: [SkyTileDashboardColumnComponent],
  providers: [DragulaService]
})
export class SkyTileDashboardComponent  {
  bagId: string;

  private _configSet = false;

  @Input()
  set dashboardConfig(config: SkyTileDashboardConfig) {
    if (config && !this._configSet) {
      this.dashboardConfigForBinding = config;
      this._configSet = true;
    }
  }

  @Output()
  dashboardConfigChange = new EventEmitter<SkyTileDashboardConfig>();

  dashboardConfigForBinding: SkyTileDashboardConfig;

  constructor(
    private _dragulaService: DragulaService
  ) {
    let self = this;

    bagIdIndex++;

    this.bagId = 'sky-tile-dashboard-bag-' + bagIdIndex;

    _dragulaService.setOptions(this.bagId, {
      moves: (el: HTMLElement, container: HTMLElement, handle: HTMLElement) => {
        return handle.matches('.sky-tile-grab-handle');
      }
    });

    _dragulaService.drop.subscribe((value: Array<any>) => {
      let bag = _dragulaService.find(self.bagId);

      if (bag) {
        let containers: any[] = bag.drake.containers;
        let columns: SkyTileDashboardConfigColumn[] = [];

        for (let container of containers) {
          let column: SkyTileDashboardConfigColumn = {tiles: []},
            tiles = container.querySelectorAll('sky-tile');

          if (tiles) {
            for (let tileEl of tiles) {
              let tileId = tileEl.getAttribute('skyTileId');
              let tile = findTile(self.dashboardConfigForBinding, tileId);

              if (tile) {
                column.tiles.push(tile);
              }
            }
          }

          columns.push(column);
        }

        let config = {
          columns: columns
        };

        self.dashboardConfigChange.emit(config);
      }
    });
  }
}
