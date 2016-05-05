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
import {Dragula} from 'ng2-dragula/ng2-dragula';
import {TileDashboardColumnContentComponent} from './tile-dashboard-column-content.component';
import {TileDashboardConfigTile} from './tile-dashboard-config-tile';
import {TileDashboardService} from './tile-dashboard.service';

let columnIdIndex = 0;

@Component({
  selector: 'sky-tile-dashboard-column',
  styles: [require('./tile-dashboard-column.component.scss')],
  template: require('./tile-dashboard-column.component.html'),
  directives: [Dragula, TileDashboardColumnContentComponent]
})
export class TileDashboardColumnComponent implements OnChanges, AfterViewInit {
  public bagId: string;

  public columnId: string;

  @Input()
  public tiles: TileDashboardConfigTile[];

  @ViewChild('content')
  private content: TileDashboardColumnContentComponent;

  private viewInitialized = false;

  constructor(
    private dashboardService: TileDashboardService,
    private cmpResolver: ComponentResolver
  ) {
    columnIdIndex++;

    this.columnId = 'tile-dashboard-column-' + columnIdIndex;

    this.bagId = dashboardService.bagId;
  }

  public updateTiles() {
    if (this.viewInitialized && this.tiles) {
      for (let tile of this.tiles) {
        this.cmpResolver.resolveComponent(tile.component)
          .then((factory: ComponentFactory) => {
            let componentRef = this.content.viewContainer.createComponent(factory);
            componentRef.instance.tileId = tile.id;
          });
      }
    }
  }

  public ngAfterViewInit() {
    this.viewInitialized = true;
    this.updateTiles();
  }

  public ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    let tilesChange = changes['tiles'];

    if (tilesChange && tilesChange.currentValue) {
      this.updateTiles();
    }
  }
}
