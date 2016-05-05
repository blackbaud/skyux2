import {EventEmitter, Injectable} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {TileDashboardConfig} from './tile-dashboard-config';
import {TileDashboardConfigColumn} from './tile-dashboard-config-column';
import {TileDashboardConfigTile} from './tile-dashboard-config-tile';

let bagIdIndex = 0;

function findTile(
  dashboardConfig: TileDashboardConfig,
  tileId: string
): TileDashboardConfigTile {
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
export class TileDashboardService {
  public bagId: string;

  public ready = new EventEmitter<TileDashboardConfig>();

  public configChange = new EventEmitter<TileDashboardConfig>();

  private config: TileDashboardConfig;

  private dragulaService: DragulaService;

  public setConfig(config: TileDashboardConfig) {
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
        let columns: TileDashboardConfigColumn[] = [];

        for (let container of containers) {
          let column: TileDashboardConfigColumn = {tiles: []},
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
