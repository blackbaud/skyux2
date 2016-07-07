import { DynamicComponentLoader, provide } from '@angular/core';
import {
  addProviders,
  ComponentFixture,
  fakeAsync,
  inject,
  TestComponentBuilder,
  tick
} from '@angular/core/testing';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {
  MockDragulaService,
  MockSkyMediaQueryService,
  Test1Component,
  Test2Component,
  TileDashboardTestComponent
} from './fixtures';
import { SkyMediaQueryService } from '../../media-queries';
import { SkyTileDashboardComponent } from './tile-dashboard.component';
import { SkyTileDashboardConfig } from '../tile-dashboard-config';
import { SkyTileDashboardService } from './tile-dashboard.service';
import { SkyTileComponent } from '../tile';

describe('Tile dashboard service', () => {
  let tcb: TestComponentBuilder;
  let dcl: DynamicComponentLoader;
  let dashboardConfig: SkyTileDashboardConfig;
  let mockDragulaService: DragulaService;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {
    mockDragulaService = new MockDragulaService();
    mockMediaQueryService = new MockSkyMediaQueryService();

    addProviders([
      provide(DragulaService, {useValue: mockDragulaService}),
      provide(SkyMediaQueryService, {useValue: mockMediaQueryService}),
      provide(SkyTileDashboardService, {useClass: SkyTileDashboardService})
    ]);
  });

  beforeEach(
    inject(
      [
        TestComponentBuilder,
        DynamicComponentLoader
      ],
      (
        _tcb: TestComponentBuilder,
        _dcl: DynamicComponentLoader
      ) => {
        tcb = _tcb;
        dcl = _dcl;

        dashboardConfig = {
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
      }
    )
  );

  it('should emit the config change event when a tile is moved',
    fakeAsync(
      inject(
        [
          SkyTileDashboardService
        ],
        ((dashboardService: SkyTileDashboardService) => {
          return tcb
            .overrideProviders(
              SkyTileDashboardComponent,
              [
                provide(SkyTileDashboardService, {useValue: dashboardService})
              ]
            )
            .createAsync(TileDashboardTestComponent)
            .then((fixture: ComponentFixture<TileDashboardTestComponent>) => {
              let configChanged = false;

              dashboardService.configChange.subscribe(
                (config: SkyTileDashboardConfig) => {
                  configChanged = true;

                  let expectedConfig: SkyTileDashboardConfig = {
                    tiles: [
                      {
                        id: 'tile1',
                        componentType: Test1Component
                      },
                      {
                        id: 'tile2',
                        componentType: Test2Component
                      }
                    ],
                    layout: {
                      singleColumn: {
                        tiles: [
                          {
                            id: 'tile2',
                            isCollapsed: false
                          },
                          {
                            id: 'tile1',
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
                              id: 'tile2',
                              isCollapsed: false
                            },
                            {
                              id: 'tile1',
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

              columnEls[1].appendChild(columnEls[0].querySelector('sky-test-cmp'));

              mockDragulaService.drop.emit({});
              tick();

              expect(configChanged).toBe(true);
            });
        })
      )
    )
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

    /* tslint:disable-next-line:no-unused-variable */
    let testDashboardService = new SkyTileDashboardService(
      mockDragulaService,
      mockMediaQueryService,
      dcl
    );

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

        return tcb
          .overrideProviders(
            SkyTileComponent,
            [
              provide(SkyTileDashboardService, {useValue: dashboardService})
            ]
          )
          .createAsync(Test1Component)
          .then((fixture: ComponentFixture<Test1Component>) => {
            let cmp: Test1Component = fixture.componentInstance;

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
          });
      }
    )
  );

  it(
    'should provide a way for a tile to know whether it is collapsed',
    inject(
      [SkyTileDashboardService],
      (dashboardService: SkyTileDashboardService) => {
        dashboardService.init(dashboardConfig);

        return tcb
          .overrideProviders(
            SkyTileComponent,
            [
              provide(SkyTileDashboardService, {useValue: dashboardService})
            ]
          )
          .createAsync(Test1Component)
          .then((fixture: ComponentFixture<Test1Component>) => {
            let cmp: Test1Component = fixture.componentInstance;

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
          });
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

      expect(dashboardService.getTileComponentType(column1.tiles[0])).toBe(Test1Component);
      expect(dashboardService.getTileComponentType(column2.tiles[0])).toBe(Test2Component);

      expect(dashboardService.getTileComponentType(undefined)).toBe(undefined);
    })
  );

  it(
    'should initialize tiles in the appropriate columns for the current screen size',
    fakeAsync(() => {
      return tcb
        .overrideProviders(
          SkyTileDashboardComponent,
          [
            provide(SkyMediaQueryService, {useValue: mockMediaQueryService})
          ]
        )
        .createAsync(TileDashboardTestComponent)
        .then((fixture: ComponentFixture<TileDashboardTestComponent>) => {
          function getTileCount(columnEl: Element): number {
            return columnEl.querySelectorAll('sky-tile').length;
          }

          mockMediaQueryService.matches = true;

          let el = fixture.nativeElement;

          fixture.detectChanges();
          tick();

          let multiColumnEls = el.querySelectorAll('.sky-tile-dashboard-layout-multi');
          let singleColumnEl = el.querySelector('.sky-tile-dashboard-layout-single');

          expect(getTileCount(multiColumnEls[0])).toBe(0);
          expect(getTileCount(multiColumnEls[1])).toBe(0);
          expect(getTileCount(singleColumnEl)).toBe(2);
        });
    })
  );

  it(
    'should move tiles to the appropriate columns when the screen size changes',
    fakeAsync(() => {
      return tcb
        .overrideProviders(
          SkyTileDashboardComponent,
          [
            provide(SkyMediaQueryService, {useValue: mockMediaQueryService})
          ]
        )
        .createAsync(TileDashboardTestComponent)
        .then((fixture: ComponentFixture<TileDashboardTestComponent>) => {
          function getTileCount(columnEl: Element): number {
            return columnEl.querySelectorAll('sky-tile').length;
          }

          let el = fixture.nativeElement;

          fixture.detectChanges();
          tick();

          let multiColumnEls = el.querySelectorAll('.sky-tile-dashboard-layout-multi');
          let singleColumnEl = el.querySelector('.sky-tile-dashboard-layout-single');

          expect(getTileCount(multiColumnEls[0])).toBe(1);
          expect(getTileCount(multiColumnEls[1])).toBe(1);
          expect(getTileCount(singleColumnEl)).toBe(0);

          mockMediaQueryService.fire({
            matches: true
          });

          fixture.detectChanges();

          expect(getTileCount(multiColumnEls[0])).toBe(0);
          expect(getTileCount(multiColumnEls[1])).toBe(0);
          expect(getTileCount(singleColumnEl)).toBe(2);

          mockMediaQueryService.fire({
            matches: false
          });

          fixture.detectChanges();

          expect(getTileCount(multiColumnEls[0])).toBe(1);
          expect(getTileCount(multiColumnEls[1])).toBe(1);
          expect(getTileCount(singleColumnEl)).toBe(0);
        });
    })
  );

  it(
    'should return the expected config regardless of which column mode is active',
    fakeAsync(() => {
      let localMockMediaQueryService = new MockSkyMediaQueryService();
      let localMockDragulaService = new MockDragulaService();

      return tcb
        .overrideProviders(
          SkyTileDashboardComponent,
          [
            provide(DragulaService, {useValue: localMockDragulaService}),
            provide(SkyMediaQueryService, {useValue: localMockMediaQueryService})
          ]
        )
        .createAsync(TileDashboardTestComponent)
        .then((fixture: ComponentFixture<TileDashboardTestComponent>) => {
          let cmp = fixture.componentInstance as TileDashboardTestComponent;

          let expectedDashboardConfig = cmp.dashboardConfig;

          fixture.detectChanges();
          tick();

          localMockMediaQueryService.fire({
            matches: true
          });

          localMockDragulaService.drop.emit({});

          fixture.detectChanges();
          tick();

          expect(cmp.dashboardConfig).toEqual(expectedDashboardConfig);

          localMockMediaQueryService.fire({
            matches: false
          });

          localMockDragulaService.drop.emit({});

          fixture.detectChanges();
          tick();

          expect(cmp.dashboardConfig).toEqual(expectedDashboardConfig);
        });
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
      let destroySpy = spyOn(mockMediaQueryService, 'destroy');

      dashboardService.destroy();

      expect(destroySpy).toHaveBeenCalled();
    })
  );
});
