import { Component } from '@angular/core';
import {
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { SkyTileDashboardModule } from './tile-dashboard.module';

import { SkyTileDashboardConfig } from '../tile-dashboard-config';
import { SkyTileDashboardService } from './tile-dashboard.service';
import { MockTileDashboardService, Tile1TestComponent, Tile2TestComponent } from './fixtures';

describe('Tile dashboard component', () => {
  let mockTileDashboardService: MockTileDashboardService;

  beforeEach(() => {
    mockTileDashboardService = new MockTileDashboardService();

    TestBed.configureTestingModule({
      declarations: [
        Tile1TestComponent,
        Tile2TestComponent,
        TestComponent
      ],
      providers: [
        {
          provide: SkyTileDashboardService,
          useValue: mockTileDashboardService
        }
      ],
      imports: [
        BrowserModule,
        SkyTileDashboardModule
      ]
    });
  });

  xit('should put the tile in the expected column for each breakpoint', () => {
  });

  xit('should remove the media breakpoint listener when destroyed', () => {
  });

  xit('should update tile order when tile moves to another column', () => {
  });

  it('should update tile order when tile moves within a column', fakeAsync(() => {
    let fixture = TestBed.createComponent(TestComponent);
    let newConfig: SkyTileDashboardConfig = {
      tiles: [
        {
          id: 'tile-1',
          componentType: Tile1TestComponent
        },
        {
          id: 'tile-2',
          componentType: Tile2TestComponent
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
  }));

  it('should not allow a new config to be set by the parent once initialized', fakeAsync(() => {
    let fixture = TestBed.createComponent(TestComponent);
    let cmp: TestComponent = fixture.componentInstance;
    let initialConfig = cmp.dashboardConfig;
    let newConfig: SkyTileDashboardConfig = {
      tiles: [
        {
          id: 'tile-1',
          componentType: Tile1TestComponent
        },
        {
          id: 'tile-2',
          componentType: Tile2TestComponent
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
    () => {
      let fixture = TestBed.createComponent(TestComponent);
      let destroySpy = spyOn(mockTileDashboardService, 'destroy');

      fixture.destroy();

      expect(destroySpy).toHaveBeenCalled();
    }
  );
});

@Component({
  selector: 'sky-test-cmp',
  template: `
    <sky-tile-dashboard [(config)]="dashboardConfig"></sky-tile-dashboard>
  `
})
class TestComponent {
  public dashboardConfig: SkyTileDashboardConfig = {
    tiles: [
      {
        id: 'tile-1',
        componentType: Tile1TestComponent
      },
      {
        id: 'tile-2',
        componentType: Tile2TestComponent
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
