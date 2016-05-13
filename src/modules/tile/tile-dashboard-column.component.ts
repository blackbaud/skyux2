import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentResolver,
  Input,
  ViewChild
} from '@angular/core';
import { Dragula } from 'ng2-dragula/ng2-dragula';

import { SkyTileDashboardColumnContentComponent } from './tile-dashboard-column-content.component';
import { SkyTileDashboardConfigTile } from './tile-dashboard-config-tile';
import { SkyTileDashboardService } from './tile-dashboard.service';

let columnIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula, SkyTileDashboardColumnContentComponent]
})
export class SkyTileDashboardColumnComponent implements AfterViewInit {
  public bagId: string;

  public columnId: string;

  @Input()
  public set tiles(value: SkyTileDashboardConfigTile[]) {
    this._tiles = value;
    this.updateTiles();
  }

  @ViewChild('content')
  private content: SkyTileDashboardColumnContentComponent;

  private _tiles: SkyTileDashboardConfigTile[];

  private viewInitialized = false;

  constructor(
    private dashboardService: SkyTileDashboardService,
    private cmpResolver: ComponentResolver
  ) {
    columnIdIndex++;

    this.columnId = 'tile-dashboard-column-' + columnIdIndex;

    this.bagId = dashboardService.bagId;
  }

  public updateTiles() {
    if (this.viewInitialized && this._tiles) {
      for (let tile of this._tiles) {
        this.cmpResolver.resolveComponent(tile.component)
          .then((factory: ComponentFactory<any>) => {
            let componentRef = this.content.viewContainer.createComponent(factory);

            this.dashboardService.addTileComponent(tile, componentRef);
          });
      }
    }
  }

  public ngAfterViewInit() {
    this.viewInitialized = true;
    this.updateTiles();
  }
}
