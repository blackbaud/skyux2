import {
  ComponentRef,
  EventEmitter,
  Injectable,
  QueryList,
  ReflectiveInjector
} from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { Subscription } from 'rxjs/Subscription';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '../../media-queries';

import { SkyTileComponent } from '../tile/tile.component';
import { SkyTileDashboardColumnComponent } from '../tile-dashboard-column';
import {
  SkyTileDashboardConfig,
  SkyTileDashboardConfigLayoutColumn,
  SkyTileDashboardConfigLayoutTile,
  SkyTileDashboardConfigTile
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

  private mediaSubscription: Subscription;

  constructor(
    private dragulaService: DragulaService,
    private mediaQuery: SkyMediaQueryService
  ) {
    this.bagId = 'sky-tile-dashboard-bag-' + (++bagIdIndex);

    this.initMediaQueries();
    this.initDragula();
  }

  public init(
    config: SkyTileDashboardConfig,
    columns?: QueryList<SkyTileDashboardColumnComponent>,
    singleColumn?: SkyTileDashboardColumnComponent
  ) {
    this.config = config;
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
    const tileConfig = this.findTile(getTileId(tile));

    if (tileConfig) {
      return tileConfig.isCollapsed;
    }

    return undefined;
  }

  public setTileCollapsed(tile: SkyTileComponent, isCollapsed: boolean) {
    const tileConfig = this.findTile(getTileId(tile));

    if (tileConfig) {
      tileConfig.isCollapsed = isCollapsed;
      this.configChange.emit(this.config);
    }
  }

  public getTileComponentType(layoutTile: SkyTileDashboardConfigLayoutTile): any {
    if (layoutTile) {
      for (const tile of this.config.tiles) {
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

  public getTileComponent(tileId: string): ComponentRef<any> {
    for (const tileComponent of this.tileComponents) {
      if (tileComponent.location.nativeElement.getAttribute(ATTR_TILE_ID) === tileId) {
        return tileComponent;
      }
    }

    /*istanbul ignore next */
    return undefined;
  }

  public destroy() {
    /*istanbul ignore else */
    if (this.mediaSubscription) {
      this.mediaSubscription.unsubscribe();
    }
  }

  private getTile(layoutTile: SkyTileDashboardConfigLayoutTile): SkyTileDashboardConfigTile {
    /*istanbul ignore else */
    if (layoutTile) {
      for (const tile of this.config.tiles) {
        if (tile.id === layoutTile.id) {
          return tile;
        }
      }
    }

    /*istanbul ignore next */
    return undefined;
  }

  private checkReady() {
    // The columns list is determined by the config options, so make sure that the columns
    // and config are synced up before loading the tiles by waiting until change detection
    // completes.
    // setTimeout(() => {
      if (this.config && this.columns) {
        this.loadTiles();
      }
    // }, 0);
  }

  private loadTiles() {
    const layout = this.config.layout;

    if (
        this.mediaQuery.current === SkyMediaBreakpoints.xs
        || this.mediaQuery.current === SkyMediaBreakpoints.sm) {
      for (const tile of layout.singleColumn.tiles) {
        this.loadTileIntoColumn(this.singleColumn, tile);
      }
    } else {
      const columns = this.columns.toArray();

      for (let i = 0, n = layout.multiColumn.length; i < n; i++) {
        const column = columns[i];

        for (const tile of layout.multiColumn[i].tiles) {
          this.loadTileIntoColumn(column, tile);
        }
      }
    }
  }

  private loadTileIntoColumn(
    column: SkyTileDashboardColumnComponent,
    layoutTile: SkyTileDashboardConfigLayoutTile
  ) {
    const tile = this.getTile(layoutTile);

    const componentType = tile.componentType;
    const providers = tile.providers /* istanbul ignore next */ || [];

    const resolvedProviders = ReflectiveInjector.resolve(providers);

    const injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, column.injector);

    const factory = column.resolver.resolveComponentFactory(componentType);
    const componentRef = column.content.createComponent(factory, undefined, injector);

    this.addTileComponent(layoutTile, componentRef);

    // Make sure the component is marked for changes in case the parent component uses
    // the OnPush change detection strategy.
    componentRef.changeDetectorRef.markForCheck();
  }

  private moveTilesToSingleColumn() {
    this.moveTilesToColumn(this.singleColumn, this.config.layout.singleColumn.tiles);
  }

  private moveTilesToMultiColumn() {
    const layoutColumns = this.config.layout.multiColumn;
    const columns = this.columns.toArray();

    for (let i = 0, n = layoutColumns.length; i < n; i++) {
      this.moveTilesToColumn(columns[i], layoutColumns[i].tiles);
    }
  }

  private moveTilesToColumn(
    column: SkyTileDashboardColumnComponent,
    layoutTiles: SkyTileDashboardConfigLayoutTile[]
  ) {
    const columnEl = this.getColumnEl(column);

    for (const layoutTile of layoutTiles) {
      const tileComponentInstance = this.getTileComponent(layoutTile.id);

      /*istanbul ignore else */
      if (tileComponentInstance) {
        columnEl.appendChild(
          tileComponentInstance.location.nativeElement
        );
      }
    }
  }

  private getConfigForUIState(): SkyTileDashboardConfig {
    /*istanbul ignore else */
    if (this.config) {
      this.config = {
        tiles: this.config.tiles,
        layout: {
          singleColumn: this.getSingleColumnLayoutForUIState(),
          multiColumn: this.getMultiColumnLayoutForUIState()
        }
      };
    }

    return this.config;
  }

  private getSingleColumnLayoutForUIState(): SkyTileDashboardConfigLayoutColumn {
    if (this.mediaQuery.current === SkyMediaBreakpoints.xs
        || this.mediaQuery.current === SkyMediaBreakpoints.sm) {
      return {
        tiles: this.getTilesInEl(this.getColumnEl(this.singleColumn))
      };
    }

    return this.config.layout.singleColumn;
  }

  private getMultiColumnLayoutForUIState(): SkyTileDashboardConfigLayoutColumn[] {
    if (!(this.mediaQuery.current === SkyMediaBreakpoints.xs
    || this.mediaQuery.current === SkyMediaBreakpoints.sm)) {
      const layoutColumns: SkyTileDashboardConfigLayoutColumn[] = [];
      const columns = this.columns.toArray();

      for (const column of columns) {
        if (column !== this.singleColumn) {
          const layoutColumn: SkyTileDashboardConfigLayoutColumn = {
            tiles: this.getTilesInEl(this.getColumnEl(column))
          };

          layoutColumns.push(layoutColumn);
        }
      }

      return layoutColumns;
    }

    return this.config.layout.multiColumn;
  }

  private getTilesInEl(el: Element): SkyTileDashboardConfigLayoutTile[] {
    const tileEls: any = el.querySelectorAll('[' + ATTR_TILE_ID + ']');
    const layoutTiles: SkyTileDashboardConfigLayoutTile[] = [];

        /*istanbul ignore else */
    if (tileEls) {
      for (let i = 0, n = tileEls.length; i < n; i++) {
        const tileEl = tileEls[i];
        const tileId = tileEl.getAttribute(ATTR_TILE_ID);
        const tile = this.findTile(tileId);

        /*istanbul ignore else */
        if (tile) {
          layoutTiles.push(tile);
        }
      }
    }

    return layoutTiles;
  }

  private initMediaQueries() {
    this.mediaSubscription = this.mediaQuery.subscribe(
      (args: SkyMediaBreakpoints) => {
        this.changeColumnMode(args === SkyMediaBreakpoints.xs || args === SkyMediaBreakpoints.sm);
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
      const config = this.getConfigForUIState();

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
      for (const column of this.config.layout.multiColumn) {
        /*istanbul ignore else */
        if (column.tiles) {
          for (const tile of column.tiles) {
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
