import {
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {
  MockDragulaService,
  Tile1TestComponent,
  Tile2TestComponent,
  TileDashboardTestComponent,
  TileTestContext
} from './fixtures';
import { SkyMediaQueryService, SkyMediaBreakpoints } from '../../media-queries';
import { SkyTileDashboardConfig } from '../tile-dashboard-config';
import { SkyTileDashboardComponent } from './tile-dashboard.component';
import { SkyTileDashboardService } from './tile-dashboard.service';
import { SkyTilesModule } from '../tiles.module';
import { SkyTileDashboardFixturesModule } from './fixtures/tile-dashboard-fixtures.module';
import { MockSkyMediaQueryService } from '../../testing/mocks';

describe('Tile dashboard service', () => {
  let dashboardConfig: SkyTileDashboardConfig;
  let mockDragulaService: DragulaService;
  let mockMediaQueryService: MockSkyMediaQueryService;

  function createDashboardTestComponent() {
    return TestBed
      .overrideComponent(SkyTileDashboardComponent, {
        add: {
          providers: [
            {provide: SkyMediaQueryService, useValue: mockMediaQueryService}
          ]
        }
      })
      .createComponent(TileDashboardTestComponent);
  }

  beforeEach(() => {
    mockDragulaService = new MockDragulaService();
    mockMediaQueryService = new MockSkyMediaQueryService();

    TestBed.configureTestingModule({
      imports: [
        SkyTileDashboardFixturesModule,
        SkyTilesModule
      ],
      providers: [
        {provide: DragulaService, useValue: mockDragulaService},
        {provide: SkyMediaQueryService, useValue: mockMediaQueryService},
        SkyTileDashboardService
      ]
    });

    dashboardConfig = {
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
              }
            ]
          },
          {
            tiles: [
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
              isCollapsed: true
            },
            {
              id: 'tile-1',
              isCollapsed: true
            }
          ]
        }
      }
    };
  });

  it('should emit the config change event when a tile is moved',
    fakeAsync(
      () => {
        let fixture = createDashboardTestComponent();
        let dashboardService = fixture.componentInstance.dashboardComponent.dashboardService;
        let configChanged = false;

        dashboardService.configChange.subscribe(
          (config: SkyTileDashboardConfig) => {
            configChanged = true;

            let expectedConfig: SkyTileDashboardConfig = {
              tiles: [
                {
                  id: 'sky-test-tile-1',
                  componentType: Tile1TestComponent
                },
                {
                  id: 'sky-test-tile-2',
                  componentType: Tile2TestComponent,
                  providers: [
                    {
                      provide: TileTestContext,
                      useValue: {
                        id: 3
                      }
                    }
                  ]
                }
              ],
              layout: {
                singleColumn: {
                  tiles: [
                    {
                      id: 'sky-test-tile-2',
                      isCollapsed: false
                    },
                    {
                      id: 'sky-test-tile-1',
                      isCollapsed: true
                    }
                  ]
                },
                multiColumn: [
                  {
                    tiles: []
                  },
                  {
                    tiles: [
                      {
                        id: 'sky-test-tile-2',
                        isCollapsed: false
                      },
                      {
                        id: 'sky-test-tile-1',
                        isCollapsed: true
                      }
                    ]
                  }
                ]
              }
            };

            expect(config).toEqual(expectedConfig);
          }
        );

        fixture.detectChanges();
        tick();

        let el = fixture.nativeElement;

        let columnEls = el.querySelectorAll('.sky-tile-dashboard-column');

        columnEls[1].appendChild(columnEls[0].querySelector('div.sky-test-tile-1'));

        mockDragulaService.drop.emit({});
        tick();

        expect(configChanged).toBe(true);
      })
  );

  it('should set the tile\'s grab handle as the drag handle', () => {
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

    (function () {
      return new SkyTileDashboardService(
        mockDragulaService,
        mockMediaQueryService
      );
    }());

    expect(setOptionsSpy).toHaveBeenCalled();
  });

  it(
    'should raise a config change event when a tile is collapsed',
    inject(
      [SkyTileDashboardService],
      (dashboardService: SkyTileDashboardService) => {
        let configChanged = false;

        dashboardService.configChange.subscribe((config: SkyTileDashboardConfig) => {
          configChanged = true;

          expect(config.layout.multiColumn[0].tiles[0].isCollapsed).toBe(true);
        });

        dashboardService.init(dashboardConfig);

        let fixture = TestBed.createComponent(Tile1TestComponent);

        let cmp: Tile1TestComponent = fixture.componentInstance;

        fixture.detectChanges();

        dashboardService.addTileComponent(
          {
            id: 'tile-1',
            isCollapsed: false
          },
          fixture.componentRef
        );

        dashboardService.setTileCollapsed(
          cmp.tile,
          true
        );

        expect(configChanged).toBe(true);
      }
    )
  );

  it(
    'should provide a way for a tile to know whether it is collapsed',
    inject(
      [SkyTileDashboardService],
      (dashboardService: SkyTileDashboardService) => {
        dashboardService.init(dashboardConfig);

        let fixture = TestBed.createComponent(Tile1TestComponent);

        let cmp: Tile1TestComponent = fixture.componentInstance;

        fixture.detectChanges();

        dashboardService.addTileComponent(
          {
            id: 'tile-1',
            isCollapsed: false
          },
          fixture.componentRef
        );

        expect(dashboardService.tileIsCollapsed(cmp.tile)).toBe(false);

        dashboardService.setTileCollapsed(
          cmp.tile,
          true
        );

        expect(dashboardService.tileIsCollapsed(cmp.tile)).toBe(true);
      }
    )
  );

  it(
    'should provide a way to retrieve the component for the associated layout tile',
    inject([SkyTileDashboardService], (dashboardService: SkyTileDashboardService) => {
      dashboardService.init(dashboardConfig);

      let multiColumn = dashboardConfig.layout.multiColumn;
      let column1 = multiColumn[0];
      let column2 = multiColumn[1];

      expect(dashboardService.getTileComponentType(column1.tiles[0])).toBe(Tile1TestComponent);
      expect(dashboardService.getTileComponentType(column2.tiles[0])).toBe(Tile2TestComponent);

      expect(dashboardService.getTileComponentType(undefined)).toBe(undefined);
    })
  );

  it(
    'should initialize tiles in the appropriate columns for the current screen size',
    fakeAsync(() => {
      function getTileCount(columnEl: Element): number {
        return columnEl.querySelectorAll('sky-tile').length;
      }

      let fixture = createDashboardTestComponent();

      mockMediaQueryService.current = SkyMediaBreakpoints.sm;

      let el = fixture.nativeElement;

      fixture.detectChanges();
      tick();

      let multiColumnEls = el.querySelectorAll('.sky-tile-dashboard-layout-multi');
      let singleColumnEl = el.querySelector('.sky-tile-dashboard-layout-single');

      expect(getTileCount(multiColumnEls[0])).toBe(0);
      expect(getTileCount(multiColumnEls[1])).toBe(0);
      expect(getTileCount(singleColumnEl)).toBe(2);
    })
  );

  it(
    'should move tiles to the appropriate columns when the screen size changes',
    fakeAsync(() => {
      function getTileCount(columnEl: Element): number {
        return columnEl.querySelectorAll('sky-tile').length;
      }

      let fixture = createDashboardTestComponent();

      let el = fixture.nativeElement;

      fixture.detectChanges();
      tick();

      let multiColumnEls = el.querySelectorAll('.sky-tile-dashboard-layout-multi');
      let singleColumnEl = el.querySelector('.sky-tile-dashboard-layout-single');

      expect(getTileCount(multiColumnEls[0])).toBe(1);
      expect(getTileCount(multiColumnEls[1])).toBe(1);
      expect(getTileCount(singleColumnEl)).toBe(0);

      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);

      fixture.detectChanges();

      expect(getTileCount(multiColumnEls[0])).toBe(0);
      expect(getTileCount(multiColumnEls[1])).toBe(0);
      expect(getTileCount(singleColumnEl)).toBe(2);

      mockMediaQueryService.fire(SkyMediaBreakpoints.md);

      fixture.detectChanges();

      expect(getTileCount(multiColumnEls[0])).toBe(1);
      expect(getTileCount(multiColumnEls[1])).toBe(1);
      expect(getTileCount(singleColumnEl)).toBe(0);
    })
  );

  it(
    'should return the expected config regardless of which column mode is active',
    fakeAsync(() => {
      let fixture = createDashboardTestComponent();

      let cmp = fixture.componentInstance;

      let expectedDashboardConfig = cmp.dashboardConfig;

      fixture.detectChanges();
      tick();

      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);

      mockDragulaService.drop.emit({});

      fixture.detectChanges();
      tick();

      expect(cmp.dashboardConfig).toEqual(expectedDashboardConfig);

      mockMediaQueryService.fire(SkyMediaBreakpoints.lg);

      mockDragulaService.drop.emit({});

      fixture.detectChanges();
      tick();

      expect(cmp.dashboardConfig).toEqual(expectedDashboardConfig);
    })
  );

  it(
    'should sanity check for invalid tile when setting a tile to be collapsed',
    inject([SkyTileDashboardService], (dashboardService: SkyTileDashboardService) => {
      dashboardService.setTileCollapsed(undefined, true);
    })
  );

  it(
    'should release resources when destroyed',
    inject([SkyTileDashboardService], (dashboardService: SkyTileDashboardService) => {
      dashboardService.destroy();

      expect(mockMediaQueryService.currentMockSubject.observers.length).toBe(0);
    })
  );
});
