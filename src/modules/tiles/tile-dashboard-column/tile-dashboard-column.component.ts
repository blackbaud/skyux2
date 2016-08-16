import {
  Component,
  ComponentResolver,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { SkyTileDashboardService } from '../tile-dashboard/tile-dashboard.service';

let columnIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html')
})
export class SkyTileDashboardColumnComponent {
  public bagId: string;

  public columnId: string;

  @ViewChild('content', {read: ViewContainerRef})
  public content: ViewContainerRef;

  constructor(
    public resolver: ComponentResolver,
    public injector: Injector,
    private dashboardService: SkyTileDashboardService
  ) {
    columnIdIndex++;

    this.columnId = 'tile-dashboard-column-' + columnIdIndex;

    this.bagId = dashboardService.bagId;
  }
}
