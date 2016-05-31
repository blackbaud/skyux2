import { TestComponentBuilder } from '@angular/compiler/testing';
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

describe('Tile dashboard service', () => {
  let tcb: TestComponentBuilder;

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
  }));

  it('should emit the config change event when a tile is moved', fakeAsync(() => {
    let mockDragulaService = new MockDragulaService();
    let dashboardService = new SkyTileDashboardService(mockDragulaService);

    dashboardService.setConfig({
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
    });

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
});
