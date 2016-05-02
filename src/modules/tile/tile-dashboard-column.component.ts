import {
  Component,
  DynamicComponentLoader,
  ElementRef,
  EventEmitter,
  Host,
  Injector,
  Input,
  OnChanges,
  Output,
  SimpleChange
} from 'angular2/core';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileDashboardComponent} from './tile-dashboard.component';

let columnIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula]
})
export class SkyTileDashboardColumnComponent implements OnChanges {
  bagId: string;

  columnId: string;

  @Input()
  tiles: any[];

  constructor(
    private _tileDashboard: SkyTileDashboardComponent,
    private _dcl: DynamicComponentLoader,
    private _injector: Injector,
    private _elementRef: ElementRef
  ) {
    columnIdIndex++;

    this.columnId = 'tile-dashboard-column-' + columnIdIndex;

    this.bagId = _tileDashboard.bagId;
    console.log(this.bagId);
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    var tilesChange = changes['tiles'];

    if (tilesChange && tilesChange.currentValue) {
      for (let tile of tilesChange.currentValue) {
        this._dcl.loadIntoLocation(
          tile,
          this._elementRef,
          'column'
        );
      }
    }
  }
}
