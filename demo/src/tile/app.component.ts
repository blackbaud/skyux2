import {Component} from 'angular2/core';
import {
  TileComponent,
  TileContentSectionComponent,
  TileDashboardComponent,
  TileDashboardColumnComponent,
  TileDashboardConfig
} from '../../../src/modules/core';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [
    TileComponent,
    TileContentSectionComponent,
    TileDashboardComponent,
    TileDashboardColumnComponent
  ]
})
export class AppComponent {
  public dashboardConfig: TileDashboardConfig;

  public stringify(obj: any) {
    return JSON.stringify(obj);
  }

  constructor() {
    this.dashboardConfig = {
      columns: [
        {
          tiles: [
            {
              id: 'tile1',
              component: Tile1Component
            }
          ]
        },
        {
          tiles: [
            {
              id: 'tile2',
              component: Tile2Component
            }
          ]
        }
      ]
    };
  }
}

@Component({
  selector: 'div.tile-1',
  template: `
    <sky-tile skyTileId="tile1" (settingsClick)="tileSettingsClick()">
      <sky-tile-title>
        Tile 1
      </sky-tile-title>
      <sky-tile-summary>
        $123.4m
      </sky-tile-summary>
      <sky-tile-content>
        <sky-tile-content-section>Section 1</sky-tile-content-section>
        <sky-tile-content-section>Section 2</sky-tile-content-section>
        <sky-tile-content-section>
          asdf asdf asdf sadf sadf asdf asdf sadf asdf asdf asdf asdf asdf asdf
          asdf asdf asdf sadf sadf asdf asdf sadf asdf asdf asdf asdf asdf asdf
          asdf asdf asdf sadf sadf asdf asdf sadf asdf asdf asdf asdf asdf asdf
          asdf asdf asdf sadf sadf asdf asdf sadf asdf asdf asdf asdf asdf asdf
        </sky-tile-content-section>
      </sky-tile-content>
    </sky-tile>
  `,
  directives: [
    TileComponent,
    TileContentSectionComponent
  ]
})
class Tile1Component {
  constructor() {
    console.log('Created tile 1 component');
  }

  public tileSettingsClick() {
    alert('tile settings clicked');
  }
}

@Component({
  selector: 'div.tile-2',
  template: `
    <sky-tile skyTileId="tile2">
      <sky-tile-title>Tile 2</sky-tile-title>
      <sky-tile-content>
        <sky-tile-content-section>Section 1</sky-tile-content-section>
        <sky-tile-content-section>Section 2</sky-tile-content-section>
      </sky-tile-content>
    </sky-tile>
  `,
  directives: [
    TileComponent,
    TileContentSectionComponent
  ]
})
class Tile2Component {

}

Bootstrapper.bootstrap(AppComponent);
