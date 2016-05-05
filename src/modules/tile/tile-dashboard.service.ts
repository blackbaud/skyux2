import {EventEmitter, Injectable} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileDashboardConfig} from './tile-dashboard-config';
import {SkyTileDashboardConfigColumn} from './tile-dashboard-config-column';
import {SkyTileDashboardConfigTile} from './tile-dashboard-config-tile';

let bagIdIndex = 0;

function findTile(
  dashboardConfig: SkyTileDashboardConfig,
  tileId: string
): SkyTileDashboardConfigTile {
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

@Injectable()
export class SkyTileDashboardService {
  public bagId: string;

  public ready = new EventEmitter<SkyTileDashboardConfig>();

  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  private config: SkyTileDashboardConfig;

  private dragulaService: DragulaService;

  public setConfig(config: SkyTileDashboardConfig) {
    this.config = config;
    this.checkReady();
  }

  public setDragulaService(dragulaService: DragulaService) {
    let self = this;

    bagIdIndex++;

    self.dragulaService = dragulaService;
    self.bagId = 'sky-tile-dashboard-bag-' + bagIdIndex;

    dragulaService.setOptions(this.bagId, {
      moves: (el: HTMLElement, container: HTMLElement, handle: HTMLElement) => {
        return handle.matches('.sky-tile-grab-handle');
      }
    });

    dragulaService.drop.subscribe((value: Array<any>) => {
      let bag = dragulaService.find(self.bagId);

      if (bag) {
        let containers: any[] = bag.drake.containers;
        let columns: SkyTileDashboardConfigColumn[] = [];

        for (let container of containers) {
          let column: SkyTileDashboardConfigColumn = {tiles: []},
            tiles = container.querySelectorAll('sky-tile');

          if (tiles) {
            for (let tileEl of tiles) {
              let tileId = tileEl.getAttribute('skyTileId');
              let tile = findTile(self.config, tileId);

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

        self.configChange.emit(config);
      }
    });

    self.checkReady();
  }

  private checkReady() {
    if (this.config && this.dragulaService) {
      this.ready.emit(this.config);
    }
  }
}
