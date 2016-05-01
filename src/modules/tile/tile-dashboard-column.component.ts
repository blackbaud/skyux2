import {Component, EventEmitter, Host, Input, Output} from 'angular2/core';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileDashboardComponent} from './tile-dashboard.component';

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula]
})
export class SkyTileDashboardColumnComponent {
  bagId: string;

  constructor(private _tileDashboard: SkyTileDashboardComponent) {
    this.bagId = _tileDashboard.bagId;
    console.log(this.bagId);
  }
}
