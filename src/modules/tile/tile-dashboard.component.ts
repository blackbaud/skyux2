import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sky-tile-dashboard',
  styles: [require('./tile-dashboard.component.scss')],
  template: require('./tile-dashboard.component.html'),
  providers: [DragulaService]
})
export class SkyTileDashboardComponent {
  private static _bagIdIndex = 0;

  bagId: string;

  constructor(private _dragulaService: DragulaService) {
    SkyTileDashboardComponent._bagIdIndex++;

    this.bagId = 'sky-tile-dashboard-bag-' + SkyTileDashboardComponent._bagIdIndex;

    _dragulaService.setOptions(this.bagId, {
      moves: (el: HTMLElement, container: HTMLElement, handle: HTMLElement) => {
        return handle.matches('.sky-tile-grab-handle');
      }
    });
  }
}
