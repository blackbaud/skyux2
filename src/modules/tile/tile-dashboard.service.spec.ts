import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, EventEmitter, provide } from '@angular/core';
import {
  beforeEach,
  describe,
  expect,
  fakeAsync,
  inject,
  it,
  tick
} from '@angular/core/testing';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { SkyTileDashboardConfig } from './tile-dashboard-config';
import { SkyTileComponent } from './tile.component';
import { SkyTileDashboardComponent } from './tile-dashboard.component';

describe('Tile dashboard service', () => {
  let tcb: TestComponentBuilder;

  class MockDragulaService extends DragulaService {

  }

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should emit the config change event when a tile is moved', fakeAsync(() => {
    let mockDragulaService = new MockDragulaService();

    return tcb
      .overrideProviders(
        SkyTileDashboardComponent,
        [
          provide(DragulaService, {useValue: mockDragulaService})
        ]
      )
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp: TestComponent = fixture.componentInstance;
        let config = {
          columns: [] as any[]
        };

        fixture.detectChanges();

        let configChangeSpy = spyOn(cmp, 'configChange');

        mockDragulaService.drop.emit({});

        fixture.detectChanges();
        tick();

        expect(configChangeSpy).toHaveBeenCalled();
      });
    })
  );
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyTileDashboardComponent],
  template: `
    <sky-tile-dashboard
        [config]="dashboardConfig"
        (configChange)="configChange()">
    </sky-tile-dashboard>
  `
})
class TestComponent {
  public dashboardConfig: SkyTileDashboardConfig = {
    columns: [
      {
        tiles: [
          {
            id: 'tile-1',
            component: Tile1Component
          },
          {
            id: 'tile-2',
            component: Tile2Component
          }
        ]
      }
    ]
  };

  public configChange() {

  }
}

@Component({
  selector: 'sky-test-tile-1',
  template: `
    <sky-tile (settingsClick)="tileSettingsClick()">
      <sky-tile-title>
        Tile 1
      </sky-tile-title>
      <sky-tile-content>
        Content 1
      </sky-tile-content>
    </sky-tile>
  `,
  directives: [
    SkyTileComponent
  ]
})
class Tile1Component {
  public tileSettingsClick() {

  }
}

@Component({
  selector: 'sky-test-tile-2',
  template: `
    <sky-tile (settingsClick)="tileSettingsClick()">
      <sky-tile-title>
        Tile 2
      </sky-tile-title>
      <sky-tile-content>
        Content 2
      </sky-tile-content>
    </sky-tile>
  `,
  directives: [
    SkyTileComponent
  ]
})
class Tile2Component {
  public tileSettingsClick() {

  }
}
