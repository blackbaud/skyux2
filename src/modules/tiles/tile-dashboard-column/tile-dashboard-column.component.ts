import {
  AfterViewInit,
  Component,
  ComponentRef,
  DynamicComponentLoader,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Dragula } from 'ng2-dragula/ng2-dragula';

import { SkyTileDashboardConfigLayoutTile } from '../tile-dashboard-config';
import { SkyTileDashboardService } from '../tile-dashboard';

let columnIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula]
})
export class SkyTileDashboardColumnComponent implements AfterViewInit {
  public bagId: string;

  public columnId: string;

  @Input()
  public set tiles(value: SkyTileDashboardConfigLayoutTile[]) {
    this._tiles = value;
    this.updateTiles();
  }

  @ViewChild('content', {read: ViewContainerRef})
  private content: ViewContainerRef;

  private _tiles: SkyTileDashboardConfigLayoutTile[];

  private viewInitialized = false;

  constructor(
    private dashboardService: SkyTileDashboardService,
    private dcl: DynamicComponentLoader
  ) {
    columnIdIndex++;

    this.columnId = 'tile-dashboard-column-' + columnIdIndex;

    this.bagId = dashboardService.bagId;
  }

  public updateTiles() {
    if (this.viewInitialized && this._tiles) {
      for (let tile of this._tiles) {
        let component = this.dashboardService.getTileComponent(tile);
        this.dcl.loadNextToLocation(component, this.content)
          .then((componentRef: ComponentRef<any>) => {
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
