import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
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

import { SkyTileDashboardConfig } from '../tile-dashboard-config';
import { SkyTileDashboardComponent } from './tile-dashboard.component';
import { SkyTileDashboardService } from './tile-dashboard.service';
import { MockTileDashboardService, Test1Component, Test2Component } from './fixtures';

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
        let newConfig: SkyTileDashboardConfig = {
          tiles: [
            {
              id: 'tile-1',
              componentType: Test1Component
            },
            {
              id: 'tile-2',
              componentType: Test2Component
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
            ],
            singleColumn: {
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
              componentType: Test1Component
            },
            {
              id: 'tile-2',
              componentType: Test2Component
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
            ],
            singleColumn: {
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
          }
        };

        let initSpy = spyOn(mockTileDashboardService, 'init');

        fixture.detectChanges();
        tick();

        expect(initSpy).toHaveBeenCalledWith(initialConfig);

        initSpy.calls.reset();

        cmp.dashboardConfig = newConfig;

        fixture.detectChanges();
        tick();

        expect(initSpy).not.toHaveBeenCalled();
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

  it(
    `should release resources when the component is destroyed`,
    fakeAsync(() => {
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
          let destroySpy = spyOn(mockTileDashboardService, 'destroy');

          fixture.destroy();

          expect(destroySpy).toHaveBeenCalled();
        }
      );
    })
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
        componentType: Test1Component
      },
      {
        id: 'tile-2',
        componentType: Test2Component
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
      ],
      singleColumn: {
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
    }
  };
}
