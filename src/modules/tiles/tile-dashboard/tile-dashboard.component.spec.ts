import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, EventEmitter, provide } from '@angular/core';
import {
  beforeEach,
  describe,
  expect,
  fakeAsync,
  inject,
  it,
  tick,
  xit
} from '@angular/core/testing';

import {
  SkyTileDashboardConfig,
  SkyTileDashboardConfigTile
} from '../tile-dashboard-config';
import { SkyTileComponent } from '../tile/tile.component';
import { SkyTileDashboardComponent } from './tile-dashboard.component';
import { SkyTileDashboardService } from './tile-dashboard.service';

describe('Tile dashboard component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  xit('should put the tile in the expected column for each breakpoint', () => {
  });

  xit('should remove the media breakpoint listener when destroyed', () => {
  });

  xit('should update tile order when tile moves to another column', () => {
  });

  it('should update tile order when tile moves within a column', fakeAsync(() => {
    let mockTileDashboardService = new MockTileDashboardService();

    return tcb
      .overrideProviders(
        SkyTileDashboardComponent,
        [
          provide(SkyTileDashboardService, {useValue: mockTileDashboardService})
        ]
      )
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let newConfig = {
          tiles: [
            {
              id: 'tile-1',
              component: Tile1Component
            },
            {
              id: 'tile-2',
              component: Tile2Component
            }
          ],
          layout: {
            multiColumn: [
              {
                tiles: [
                  {
                    id: 'tile-2',
                    isCollapsed: false
                  },
                  {
                    id: 'tile-1',
                    isCollapsed: false
                  }
                ]
              }
            ]
          }
        };

        fixture.detectChanges();
        tick();

        mockTileDashboardService.configChange.emit(newConfig);

        fixture.detectChanges();
        tick();

        expect(fixture.componentInstance.dashboardConfig).toEqual(newConfig);
      }
    );
  }));

  it('should not allow a new config to be set by the parent once initialized', fakeAsync(() => {
    let mockTileDashboardService = new MockTileDashboardService();

    return tcb
      .overrideProviders(
        SkyTileDashboardComponent,
        [
          provide(SkyTileDashboardService, {useValue: mockTileDashboardService})
        ]
      )
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp: TestComponent = fixture.componentInstance;
        let initialConfig = cmp.dashboardConfig;
        let newConfig: SkyTileDashboardConfig = {
          tiles: [
            {
              id: 'tile-1',
              component: Tile1Component
            },
            {
              id: 'tile-2',
              component: Tile2Component
            }
          ],
          layout: {
            multiColumn: [
              {
                tiles: [
                  {
                    id: 'tile-2',
                    isCollapsed: false
                  },
                  {
                    id: 'tile-1',
                    isCollapsed: false
                  }
                ]
              }
            ]
          }
        };

        let setConfigSpy = spyOn(mockTileDashboardService, 'setConfig');

        fixture.detectChanges();
        tick();

        expect(setConfigSpy).toHaveBeenCalledWith(initialConfig);

        setConfigSpy.calls.reset();

        cmp.dashboardConfig = newConfig;

        fixture.detectChanges();
        tick();

        expect(setConfigSpy).not.toHaveBeenCalled();
      }
    );
  }));

  xit('should update the tile collapsed state when the tile is collapsed', () => {
  });

  xit(
    'should update the tile collapsed small state when the tile is collapsed on a small screen',
    () => {
    }
  );

  xit(
    'should update the all-collapsed state when a tile\'s collapsed state changes',
    () => {
    }
  );

  xit(
    'should update the tile collapsed state when the tile all-collapsed attribute changes',
    () => {
    }
  );

  xit(
    `should not update tile state when display mode changed but the tile collapse state is not
      changed by tile dashboard`,
    () => {
    }
  );

  xit(
    `should not update tile state when display mode changed but the tile collapse state is not
      changed by tile dashboard and tile intialization occurs after dashboard initialization`,
    () => {
    }
  );

  xit(
    `should update the tile collapsed small state when the tile all-collapsed attribute
    changes`,
    () => {
    }
  );
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyTileDashboardComponent],
  template: `
    <sky-tile-dashboard [(config)]="dashboardConfig"></sky-tile-dashboard>
  `
})
class TestComponent {
  public dashboardConfig: SkyTileDashboardConfig = {
    tiles: [
      {
        id: 'tile-1',
        component: Tile1Component
      },
      {
        id: 'tile-2',
        component: Tile2Component
      }
    ],
    layout: {
      multiColumn: [
        {
          tiles: [
            {
              id: 'tile-1',
              isCollapsed: false
            },
            {
              id: 'tile-2',
              isCollapsed: false
            }
          ]
        }
      ]
    }
  };
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

class MockTileDashboardService {
  public bagId = 'id-1';

  public ready = new EventEmitter<SkyTileDashboardConfig>();

  public config: SkyTileDashboardConfig;

  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  public setConfig(config: SkyTileDashboardConfig) {
    this.config = config;
  }

  public addTileComponent() {
  }

  public tileIsCollapsed() {
  }

  public getTileComponent(tile: SkyTileDashboardConfigTile) {
    switch (tile.id) {
    case 'tile-1':
      return Tile1Component;
    case 'tile-2':
      return Tile2Component;
    default:
      return undefined;
    }
  }
}
