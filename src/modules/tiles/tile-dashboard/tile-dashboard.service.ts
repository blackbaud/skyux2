import {
  ComponentRef,
  EventEmitter,
  Injectable,
  Type
} from '@angular/core';
import { DragulaService} from 'ng2-dragula/ng2-dragula';

import { SkyTileComponent } from '../tile/tile.component';
import {
  SkyTileDashboardConfig,
  SkyTileDashboardConfigLayoutColumn,
  SkyTileDashboardConfigLayoutTile
} from '../tile-dashboard-config';

const ATTR_TILE_ID = '_sky-tile-dashboard-tile-id';

let bagIdIndex = 0;

function getTileId(tile: SkyTileComponent): string {
  if (tile) {
    let el = tile.elementRef.nativeElement;
    let tileId: string;

    while (el) {
      tileId = el.getAttribute(ATTR_TILE_ID);

      if (tileId) {
        return tileId;
      }

      el = el.parentElement;
    }
  }

  return undefined;
}

@Injectable()
export class SkyTileDashboardService {
  public bagId: string;

  public ready = new EventEmitter<SkyTileDashboardConfig>();

  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  private tileComponents: ComponentRef<SkyTileComponent>[];

  private config: SkyTileDashboardConfig;

  constructor(private dragulaService: DragulaService) {
    this.bagId = 'sky-tile-dashboard-bag-' + (++bagIdIndex);

    this.initDragula();
    this.checkReady();
  }

  public findTile(tileId: string): SkyTileDashboardConfigLayoutTile {
    /*istanbul ignore else */
    if (this.config && this.config.layout.multiColumn) {
      for (let column of this.config.layout.multiColumn) {
        /*istanbul ignore else */
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

  public addTileComponent(
    tile: SkyTileDashboardConfigLayoutTile,
    component: ComponentRef<any>
  ) {
    this.tileComponents = this.tileComponents || [];

    this.tileComponents.push(component);

    component.location.nativeElement.setAttribute(ATTR_TILE_ID, tile.id);
  }

  public tileIsCollapsed(tile: SkyTileComponent): boolean {
    let tileConfig = this.findTile(getTileId(tile));

    if (tileConfig) {
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

  public getTileComponent(layoutTile: SkyTileDashboardConfigLayoutTile): Type {
    if (layoutTile) {
      for (let tile of this.config.tiles) {
        if (tile.id === layoutTile.id) {
          return tile.component;
        }
      }
    }

    return undefined;
  }

  private getConfigForUIState(): SkyTileDashboardConfig {
    let config: SkyTileDashboardConfig;
    let bag = this.dragulaService.find(this.bagId);

    /*istanbul ignore else */
    if (bag) {
      let containers: any[] = bag.drake.containers;
      let columns: SkyTileDashboardConfigLayoutColumn[] = [];

      for (let container of containers) {
        let column: SkyTileDashboardConfigLayoutColumn = {tiles: []},
          tiles = container.querySelectorAll('[' + ATTR_TILE_ID + ']');

        /*istanbul ignore else */
        if (tiles) {
          for (let tileEl of tiles) {
            let tileId = tileEl.getAttribute(ATTR_TILE_ID);
            let tile = this.findTile(tileId);

            /*istanbul ignore else */
            if (tile) {
              column.tiles.push(tile);
            }
          }
        }

        columns.push(column);
      }

      config = {
        tiles: this.config.tiles,
        layout: {
          multiColumn: columns
        }
      };
    }

    return config;
  }

  private initDragula() {
    this.dragulaService.setOptions(this.bagId, {
      moves: (el: HTMLElement, container: HTMLElement, handle: HTMLElement) => {
        return handle.matches('.sky-tile-grab-handle');
      }
    });

    this.dragulaService.drop.subscribe((value: any[]) => {
      let config = this.getConfigForUIState();

      /*istanbul ignore else */
      if (config) {
        this.configChange.emit(config);
      }
    });
  }

  private checkReady() {
    if (this.config && this.dragulaService) {
      this.ready.emit(this.config);
    }
  }
}
