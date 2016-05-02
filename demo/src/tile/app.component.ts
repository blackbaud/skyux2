import {Component} from 'angular2/core';
import {
  SkyTileComponent,
  SkyTileContentSectionComponent,
  SkyTileDashboardComponent,
  SkyTileDashboardColumnComponent
} from '../../../src/modules/core';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [
    SkyTileComponent,
    SkyTileContentSectionComponent,
    SkyTileDashboardComponent,
    SkyTileDashboardColumnComponent
  ]
})
export class AppComponent {
  column1Tiles: any[];

  column2Tiles: any[];

  constructor() {
    this.column1Tiles = [Tile1Component];
    this.column2Tiles = [Tile2Component];
  }
}

@Component({
  template: `
    <sky-tile>
      <sky-tile-title>Tile 1</sky-tile-title>
      <sky-tile-content>
        <sky-tile-content-section>Section 1</sky-tile-content-section>
        <sky-tile-content-section>Section 2</sky-tile-content-section>
      </sky-tile-content>
    </sky-tile>
  `,
  directives: [
    SkyTileComponent,
    SkyTileContentSectionComponent
  ]
})
class Tile1Component {

}

@Component({
  template: `
    <sky-tile>
      <sky-tile-title>Tile 2</sky-tile-title>
      <sky-tile-content>
        <sky-tile-content-section>Section 1</sky-tile-content-section>
        <sky-tile-content-section>Section 2</sky-tile-content-section>
      </sky-tile-content>
    </sky-tile>
  `,
  directives: [
    SkyTileComponent,
    SkyTileContentSectionComponent
  ]
})
class Tile2Component {

}

Bootstrapper.bootstrap(AppComponent);
