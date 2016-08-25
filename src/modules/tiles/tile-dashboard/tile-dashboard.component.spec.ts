import { QueryList } from '@angular/core';
import {
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { SkyTileDashboardColumnComponent } from '../tile-dashboard-column';
import { SkyTileDashboardComponent } from './tile-dashboard.component';
import { SkyTileDashboardConfig } from '../tile-dashboard-config';
import { SkyTileDashboardService } from './tile-dashboard.service';

import {
  MockTileDashboardService,
  SkyTileDashboardFixturesModule,
  Tile1TestComponent,
  Tile2TestComponent,
  TileDashboardTestComponent
} from './fixtures';

// TODO: Revisit after RC6.
xdescribe('Tile dashboard component', () => {
  let mockTileDashboardService: MockTileDashboardService;

  beforeEach(() => {
    mockTileDashboardService = new MockTileDashboardService();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: SkyTileDashboardService,
          useValue: mockTileDashboardService
        }
      ],
      imports: [
        SkyTileDashboardFixturesModule
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
    // TODO: This should work but doesn't.  Revisit for Angular 2 RC6.
    // https://github.com/angular/angular/issues/10854
    let fixture = TestBed
      .overrideComponent(
        SkyTileDashboardComponent,
        {
          add: {
            providers: [
              {
                provide: SkyTileDashboardService,
                useValue: mockTileDashboardService
              }
            ]
          }
        }
      )
      .createComponent(TileDashboardTestComponent);

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
    let fixture = TestBed.createComponent(TileDashboardTestComponent);
    let cmp = fixture.componentInstance;
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

    expect(initSpy).toHaveBeenCalledWith(
      initialConfig,
      jasmine.any(QueryList),
      jasmine.any(SkyTileDashboardColumnComponent)
    );

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
      let fixture = TestBed.createComponent(TileDashboardTestComponent);
      let destroySpy = spyOn(mockTileDashboardService, 'destroy');

      fixture.destroy();

      expect(destroySpy).toHaveBeenCalled();
    }
  );

  it(
    `should display columns with equal widths despite a tile's contents`,
    fakeAsync(() => {
      let fixture = TestBed.createComponent(TileDashboardTestComponent);

      fixture.detectChanges();
      tick();

      let el = fixture.elementRef.nativeElement;

      let firstTileContentEl = el.querySelectorAll('sky-tile-content')[0];
      let wideEl = document.createElement('div');

      // Force the first tile's contents to be wider than the second tile's.
      wideEl.style.width = window.innerWidth + 'px';

      firstTileContentEl.appendChild(wideEl);

      let tileEls = el.querySelectorAll('.sky-tile-dashboard-column');

      expect(tileEls[0].offsetWidth).toEqual(tileEls[1].offsetWidth);
    })
  );
});
