import {
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Dragula } from 'ng2-dragula/ng2-dragula';

import { SkyTileDashboardService } from '../tile-dashboard/tile-dashboard.service';

let columnIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula]
})
export class SkyTileDashboardColumnComponent {
  public bagId: string;

  public columnId: string;

  @ViewChild('content', {read: ViewContainerRef})
  public content: ViewContainerRef;

  constructor(
    private dashboardService: SkyTileDashboardService
  ) {
    columnIdIndex++;

    this.columnId = 'tile-dashboard-column-' + columnIdIndex;

    this.bagId = dashboardService.bagId;
  }
}
