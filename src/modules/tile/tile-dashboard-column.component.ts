import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula],
  viewProviders: [DragulaService]
})
export class SkyTileDashboardColumnComponent {
  constructor() {
    
  }
}
