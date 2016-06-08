import {
  ComponentRef,
  DynamicComponentLoader,
  EventEmitter,
  Injectable,
  QueryList,
  Type
} from '@angular/core';
import { DragulaService} from 'ng2-dragula/ng2-dragula';

import { SkyMediaQueryListenerArgs, SkyMediaQueryService } from '../../media-queries';
import { SkyTileComponent } from '../tile/tile.component';
import { SkyTileDashboardColumnComponent } from '../tile-dashboard-column';
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

  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  private tileComponents: ComponentRef<SkyTileComponent>[];

  private config: SkyTileDashboardConfig;

  private columns: QueryList<SkyTileDashboardColumnComponent>;

  private singleColumn: SkyTileDashboardColumnComponent;

  constructor(
    private dragulaService: DragulaService,
    private mediaQuery: SkyMediaQueryService,
    private dcl: DynamicComponentLoader
  ) {
    this.bagId = 'sky-tile-dashboard-bag-' + (++bagIdIndex);

    this.initMediaQueries();
    this.initDragula();
  }

  public init(config: SkyTileDashboardConfig) {
    this.config = config;
    this.checkReady();
  }

  public setColumns(
    columns: QueryList<SkyTileDashboardColumnComponent>,
    singleColumn: SkyTileDashboardColumnComponent
  ) {
    this.columns = columns;
    this.singleColumn = singleColumn;

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

  public getTileComponentType(layoutTile: SkyTileDashboardConfigLayoutTile): Type {
    if (layoutTile) {
      for (let tile of this.config.tiles) {
        if (tile.id === layoutTile.id) {
          return tile.componentType;
        }
      }
    }

    return undefined;
  }

  public changeColumnMode(isSingleColumn: boolean) {
    /*istanbul ignore else */
    if (this.config) {
      if (isSingleColumn) {
        this.moveTilesToSingleColumn();
      } else {
        this.moveTilesToMultiColumn();
      }
    }
  }

  public destroy() {
    /*istanbul ignore else */
    if (this.mediaQuery) {
      this.mediaQuery.destroy();
    }
  }

  private checkReady() {
    if (this.config && this.columns) {
      this.loadTiles();
    }
  }

  private loadTiles() {
    let layout = this.config.layout;

    if (this.mediaQuery.matches) {
      for (let tile of layout.singleColumn.tiles) {
        this.loadTileIntoColumn(this.singleColumn, tile);
      }
    } else {
      let columns = this.columns.toArray();

      for (let i = 0, n = layout.multiColumn.length; i < n; i++) {
        let column = columns[i];

        for (let tile of layout.multiColumn[i].tiles) {
          this.loadTileIntoColumn(column, tile);
        }
      }
    }
  }

  private loadTileIntoColumn(
    column: SkyTileDashboardColumnComponent, tile: SkyTileDashboardConfigLayoutTile
  ) {
    let component = this.getTileComponentType(tile);
    this.dcl.loadNextToLocation(component, column.content)
      .then((componentRef: ComponentRef<any>) => {
        this.addTileComponent(tile, componentRef);
      });
  }

  private moveTilesToSingleColumn() {
    this.moveTilesToColumn(this.singleColumn, this.config.layout.singleColumn.tiles);
  }

  private moveTilesToMultiColumn() {
    let layoutColumns = this.config.layout.multiColumn;
    let columns = this.columns.toArray();

    for (let i = 0, n = layoutColumns.length; i < n; i++) {
      this.moveTilesToColumn(columns[i], layoutColumns[i].tiles);
    }
  }

  private moveTilesToColumn(
    column: SkyTileDashboardColumnComponent,
    layoutTiles: SkyTileDashboardConfigLayoutTile[]
  ) {
    let columnEl = this.getColumnEl(column);

    for (let layoutTile of layoutTiles) {
      let tileComponentInstance = this.getTileComponent(layoutTile.id);

      if (tileComponentInstance) {
        columnEl.appendChild(
          tileComponentInstance.location.nativeElement
        );
      }
    }
  }

  private getTileComponent(tileId: string): ComponentRef<SkyTileComponent> {
    for (let tileComponent of this.tileComponents) {
      if (tileComponent.location.nativeElement.getAttribute(ATTR_TILE_ID) === tileId) {
        return tileComponent;
      }
    }

    /*istanbul ignore next */
    return undefined;
  }

  private getConfigForUIState(): SkyTileDashboardConfig {
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

      this.config = {
        tiles: this.config.tiles,
        layout: {
          singleColumn: this.getSingleColumnLayoutForUIState(bag),
          multiColumn: this.getMultiColumnLayoutForUIState(bag)
        }
      };
    }

    return this.config;
  }

  private getSingleColumnLayoutForUIState(bag: any): SkyTileDashboardConfigLayoutColumn {
    if (this.mediaQuery.matches) {
      return {
        tiles: this.getTilesInEl(this.getColumnEl(this.singleColumn))
      };
    }

    return this.config.layout.singleColumn;
  }

  private getMultiColumnLayoutForUIState(bag: any): SkyTileDashboardConfigLayoutColumn[] {
    if (!this.mediaQuery.matches) {
      let containers: any[] = bag.drake.containers;
      let layoutColumns: SkyTileDashboardConfigLayoutColumn[] = [];

      for (let container of containers) {
        let layoutColumn: SkyTileDashboardConfigLayoutColumn = {
          tiles: this.getTilesInEl(container)
        };

        layoutColumns.push(layoutColumn);
      }

      return layoutColumns;
    }

    return this.config.layout.multiColumn;
  }

  private getTilesInEl(el: Element): SkyTileDashboardConfigLayoutTile[] {
    let tileEls: any = el.querySelectorAll('[' + ATTR_TILE_ID + ']');
    let layoutTiles: SkyTileDashboardConfigLayoutTile[] = [];

        /*istanbul ignore else */
    if (tileEls) {
      for (let i = 0, n = tileEls.length; i < n; i++) {
        let tileEl = tileEls[i];
        let tileId = tileEl.getAttribute(ATTR_TILE_ID);
        let tile = this.findTile(tileId);

        /*istanbul ignore else */
        if (tile) {
          layoutTiles.push(tile);
        }
      }
    }

    return layoutTiles;
  }

  private initMediaQueries() {
    this.mediaQuery.init(
      SkyMediaQueryService.sm,
      (args: SkyMediaQueryListenerArgs) => {
        this.changeColumnMode(this.mediaQuery.matches);
      }
    );
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

  private getColumnEl(column: SkyTileDashboardColumnComponent): Element {
    return column.content.element.nativeElement.parentNode;
  }

  private findTile(tileId: string): SkyTileDashboardConfigLayoutTile {
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
}
