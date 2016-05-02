import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentResolver,
  Input,
  OnChanges,
  SimpleChange,
  ViewChild
} from 'angular2/core';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileDashboardComponent} from './tile-dashboard.component';
import {SkyTileDashboardColumnContentComponent} from './tile-dashboard-column-content.component';

let columnIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula, SkyTileDashboardColumnContentComponent]
})
export class SkyTileDashboardColumnComponent implements OnChanges, AfterViewInit {
  bagId: string;

  columnId: string;

  @Input()
  tiles: any[];

  @ViewChild('content')
  private _content: SkyTileDashboardColumnContentComponent

  private _viewInitialized = false;

  constructor(
    private _tileDashboard: SkyTileDashboardComponent,
    private _cmpResolver: ComponentResolver
  ) {
    columnIdIndex++;

    this.columnId = 'tile-dashboard-column-' + columnIdIndex;

    this.bagId = _tileDashboard.bagId;
  }

  updateTiles() {
    if (this._viewInitialized && this.tiles instanceof Array) {
      for (let tile of this.tiles) {
        this._cmpResolver.resolveComponent(tile)
          .then((factory: ComponentFactory) => {
            this._content.viewContainer.createComponent(factory);
          });
      }
    }
  }

  ngAfterViewInit() {
    this._viewInitialized = true;
    this.updateTiles();
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    var tilesChange = changes['tiles'];

    if (tilesChange && tilesChange.currentValue) {
      this.updateTiles();
    }
  }
}
