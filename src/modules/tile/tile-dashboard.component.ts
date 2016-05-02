import {Component, EventEmitter, Output, Query, QueryList} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileComponent} from './tile.component';
import {SkyTileDashboardColumnComponent} from './tile-dashboard-column.component';

let _bagIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard',
  styles: [require('./tile-dashboard.component.scss')],
  template: require('./tile-dashboard.component.html'),
  providers: [DragulaService]
})
export class SkyTileDashboardComponent {
  bagId: string;

  @Output()
  dashboardChanged = new EventEmitter<any>();

  constructor(
    private _dragulaService: DragulaService,
    @Query(SkyTileComponent, {descendants: true}) private _tileOrder: QueryList<SkyTileComponent>
  ) {
    let self = this;

    _bagIdIndex++;

    this.bagId = 'sky-tile-dashboard-bag-' + _bagIdIndex;

    _dragulaService.setOptions(this.bagId, {
      moves: (el: HTMLElement, container: HTMLElement, handle: HTMLElement) => {
        return handle.matches('.sky-tile-grab-handle');
      }
    });

    self._tileOrder.changes.subscribe(_ => console.dir(self._tileOrder));

    _dragulaService.drop.subscribe((value: Array<any>) => {
      let bag = _dragulaService.find(self.bagId);

      if (bag) {
        let containers: any[] = bag.drake.containers;
        let dashboardConfig: any = {
          columns: []
        };

        for (let container of containers) {
          let column: any = {tiles: []},
            tiles = container.querySelectorAll('sky-tile');

          if (tiles) {
            for (let tile of tiles) {
              column.tiles.push({
                id: tile.getAttribute('skyTileId')
              })
            }
          }

          dashboardConfig.columns.push(column);
        }

        this.dashboardChanged.emit(dashboardConfig);
      }
    });
  }
}
