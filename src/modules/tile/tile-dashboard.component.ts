import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sky-tile-dashboard',
  styles: [require('./tile-dashboard.component.scss')],
  template: require('./tile-dashboard.component.html'),
  directives: [Dragula],
  viewProviders: [DragulaService]
})
export class SkyTileDashboardComponent {
  constructor(private _dragulaService: DragulaService) {
    let bagId = 'sky-dashboard-column-drag-container';

    _dragulaService.setOptions(bagId, {
      moves: (el: HTMLElement, container: HTMLElement, handle: HTMLElement) => {
        return handle.matches('.sky-tile-grab-handle');
      }
    });
  }
}
