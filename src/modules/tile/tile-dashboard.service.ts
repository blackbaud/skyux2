import {ComponentRef, EventEmitter, Injectable} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileComponent} from './tile.component';
import {SkyTileDashboardConfig} from './tile-dashboard-config';
import {SkyTileDashboardConfigColumn} from './tile-dashboard-config-column';
import {SkyTileDashboardConfigTile} from './tile-dashboard-config-tile';

const ATTR_TILE_ID = '_sky-tile-dashboard-tile-id';

let bagIdIndex = 0;

function getTileId(tile: SkyTileComponent): string {
  let el = tile.elementRef.nativeElement;
  let tileId: string;

  while (el) {
    tileId = el.getAttribute(ATTR_TILE_ID);

    if (tileId) {
      return tileId;
    }

    el = el.parentElement;
  }

  return undefined;
}

@Injectable()
export class SkyTileDashboardService {
  public bagId: string;

  public ready = new EventEmitter<SkyTileDashboardConfig>();

  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  private tileComponents: ComponentRef[];

  private config: SkyTileDashboardConfig;

  private dragulaService: DragulaService;

  public findTile(tileId: string): SkyTileDashboardConfigTile {
    if (this.config && this.config.columns) {
      for (let column of this.config.columns) {
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

  public setConfig(config: SkyTileDashboardConfig) {
    this.config = config;
    this.checkReady();
  }

  public addTileComponent(tile: SkyTileDashboardConfigTile, component: ComponentRef) {
    this.tileComponents = this.tileComponents || [];

    this.tileComponents.push(component);

    component.location.nativeElement.setAttribute(ATTR_TILE_ID, tile.id);
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

    dragulaService.drop.subscribe((value: any[]) => {
      let bag = dragulaService.find(self.bagId);

      if (bag) {
        let containers: any[] = bag.drake.containers;
        let columns: SkyTileDashboardConfigColumn[] = [];

        for (let container of containers) {
          let column: SkyTileDashboardConfigColumn = {tiles: []},
            tiles = container.querySelectorAll('[' + ATTR_TILE_ID + ']');

          if (tiles) {
            for (let tileEl of tiles) {
              let tileId = tileEl.getAttribute(ATTR_TILE_ID);
              let tile = this.findTile(tileId);

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

  public tileIsCollapsed(tile: SkyTileComponent): boolean {
    let tileConfig = this.findTile(getTileId(tile));

    if (tileConfig) {
      console.log('isCollapsed: ' + tileConfig.isCollapsed);
      return tileConfig.isCollapsed;
    }

    return undefined;
  }

  public setTileCollapsed(tile: SkyTileComponent, isCollapsed: boolean) {
    let tileConfig = this.findTile(getTileId(tile));

    if (tileConfig) {
      tileConfig.isCollapsed = isCollapsed;
      this.configChange.emit(this.config);
    }
  }

  private checkReady() {
    if (this.config && this.dragulaService) {
      this.ready.emit(this.config);
    }
  }
}
