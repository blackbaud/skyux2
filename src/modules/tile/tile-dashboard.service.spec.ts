import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide, ViewChild } from '@angular/core';
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
import { SkyTileDashboardService } from './tile-dashboard.service';
import { SkyTileComponent } from './tile.component';

describe('Tile dashboard service', () => {
  let tcb: TestComponentBuilder;
  let dashboardService: SkyTileDashboardService;
  let dashboardConfig: SkyTileDashboardConfig;
  let mockDragulaService: DragulaService;

  class MockDragulaService extends DragulaService {
    public add() {

    }

    public setOptions() {

    }

    public find() {
      return {
        drake: {
          containers: [
            {
              querySelectorAll: () => {
                return [
                  {
                    getAttribute: () => {
                      return 'tile-2';
                    }
                  }
                ] as any[];
              }
            },
            {
              querySelectorAll: () => {
                return [
                  {
                    getAttribute: () => {
                      return 'tile-1';
                    }
                  }
                ] as any[];
              }
            }
          ] as any[]
        }
      };
    }
  }

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;

    dashboardConfig = {
      columns: [
        {
          tiles: [
            {
              id: 'tile-1',
              component: undefined
            }
          ]
        },
        {
          tiles: [
            {
              id: 'tile-2',
              component: undefined
            }
          ]
        }
      ]
    };

    mockDragulaService = new MockDragulaService();
    dashboardService = new SkyTileDashboardService(mockDragulaService);

    dashboardService.setConfig(dashboardConfig);
  }));

  it('should emit the config change event when a tile is moved', fakeAsync(() => {
    let configChanged = false;

    dashboardService.configChange.subscribe((config: SkyTileDashboardConfig) => {
      configChanged = true;

      expect(config).toEqual({
        columns: [
          {
            tiles: [
              {
                id: 'tile-2',
                component: undefined
              }
            ]
          },
          {
            tiles: [
              {
                id: 'tile-1',
                component: undefined
              }
            ]
          }
        ]
      });
    });

    mockDragulaService.drop.emit({});
    tick();

    expect(configChanged).toBe(true);
  }));

  it('should set the tile\'s grab handle as the drag handle', fakeAsync(() => {
    let setOptionsSpy = spyOn(mockDragulaService, 'setOptions').and.callFake(
      (bagId: any, options: any) => {
        let result = options.moves(
          undefined,
          undefined,
          {
            matches: (cls: string) => {
              return cls === '.sky-tile-grab-handle';
            }
          }
        );

        expect(result).toBe(true);
      }
    );

    /* tslint:disable-next-line:no-unused-variable */
    let testDashboardService = new SkyTileDashboardService(mockDragulaService);

    expect(setOptionsSpy).toHaveBeenCalled();
  }));

  it('should raise a config change even when a tile is collapsed', fakeAsync(() => {
    let configChanged = false;

    dashboardService.configChange.subscribe((config: SkyTileDashboardConfig) => {
      configChanged = true;

      expect(config.columns[0].tiles[0].isCollapsed).toBe(true);
    });

    return tcb
      .overrideProviders(
        SkyTileComponent,
        [
          provide(SkyTileDashboardService, {useValue: dashboardService})
        ]
      )
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp: TestComponent = fixture.componentInstance;

        fixture.detectChanges();

        dashboardService.addTileComponent(
          {
            id: 'tile-1',
            component: TestComponent
          },
          fixture.componentRef
        );

        dashboardService.setTileCollapsed(
          cmp.tile,
          true
        );

        tick();

        expect(configChanged).toBe(true);
      });
  }));
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyTileComponent],
  template: `
    <sky-tile>
      <sky-tile-title>Title</sky-tile-title>
      <sky-tile-content>Content</sky-tile-content>
    </sky-tile>
  `
})
class TestComponent {
  @ViewChild(SkyTileComponent)
  public tile: SkyTileComponent;
}
