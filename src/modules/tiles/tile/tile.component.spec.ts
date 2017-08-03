import {
  async,
  TestBed
} from '@angular/core/testing';

import { expect } from '../../testing';

import {
  MockSkyTileDashboardService,
  TileTestComponent
} from './fixtures';
import { SkyTileComponent } from './tile.component';
import { SkyTilesModule } from '../tiles.module';
import { SkyTileDashboardService } from '../tile-dashboard/tile-dashboard.service';

describe('Tile component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TileTestComponent
      ],
      imports: [
        SkyTilesModule
      ]
    });
  });

  it('should render the header text in the expected element', async(() => {
    let fixture = TestBed.createComponent(TileTestComponent);
    let el = fixture.nativeElement;

    fixture.whenStable().then(() => {
      expect(el.querySelector('.sky-tile-title sky-tile-title')).toHaveText('Title');
    });
  }));

  it('should collapse/expand when the header is clicked', async(() => {
    let fixture = TestBed.createComponent(TileTestComponent);
    let el = fixture.nativeElement;

    fixture.whenStable().then(() => {
      let titleEl = el.querySelector('.sky-tile-title');

      titleEl.click();
      fixture.detectChanges();

      let contentAttrs = el.querySelector('.sky-tile-content').attributes;

      expect(contentAttrs['hidden']).not.toBeNull();

      titleEl.click();

      fixture.whenStable().then(() => {
        expect(contentAttrs['hidden']).toBe(undefined);
      });
    });
  }));

  it('should output state when collapsed/expanded', async(() => {
    let fixture = TestBed.createComponent(TileTestComponent);
    let el = fixture.nativeElement;

    fixture.whenStable().then(() => {
      let titleEl = el.querySelector('.sky-tile-title');

      titleEl.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.componentInstance.collapsedOutputCalled).toBe(false);

        let contentAttrs = el.querySelector('.sky-tile-content').attributes;

        expect(contentAttrs['hidden']).not.toBeNull();

        titleEl.click();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(contentAttrs['hidden']).toBe(undefined);
          expect(fixture.componentInstance.collapsedOutputCalled).toBe(true);
        });
      });
    });
  }));

  it('should collapse/expand when the chevron is clicked', () => {
    let fixture = TestBed.createComponent(TileTestComponent);
    let el = fixture.nativeElement;

    fixture.detectChanges();

    let chevronEl = el.querySelector('.sky-chevron');

    chevronEl.click();
    fixture.detectChanges();

    let contentAttrs = el.querySelector('.sky-tile-content').attributes;

    expect(contentAttrs['hidden']).not.toBeNull();

    fixture.detectChanges();

    chevronEl.click();
    fixture.detectChanges();

    expect(contentAttrs['hidden']).toBe(undefined);
  });

  it('should collapse/expand when the isCollapsed value changes', () => {
    let fixture = TestBed.createComponent(TileTestComponent);
    let el = fixture.nativeElement;

    fixture.detectChanges();

    let contentAttrs = el.querySelector('.sky-tile-content').attributes;

    expect(contentAttrs['hidden']).toBe(undefined);

    fixture.componentInstance.tileIsCollapsed = true;
    fixture.detectChanges();

    expect(contentAttrs['hidden']).not.toBeNull();
  });

  xit('should update the tile state when the tile dashboard is initialized', () => {
    expect(false).toBe(true);
  });

  it('should notify the tile dashboard when the tile is collapsed',
    () => {
      let mockTileDashboardService = new MockSkyTileDashboardService();

      let fixture = TestBed
        .overrideComponent(
          TileTestComponent,
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
        .createComponent(TileTestComponent);

      let el = fixture.nativeElement;
      let dashboardSpy = spyOn(mockTileDashboardService, 'setTileCollapsed').and.callThrough();

      fixture.detectChanges();

      let chevronEl = el.querySelector('.sky-chevron');

      chevronEl.click();

      fixture.detectChanges();

      expect(dashboardSpy).toHaveBeenCalledWith(jasmine.any(SkyTileComponent), true);
    }
  );

  xit('should notify the tile that repaint is required when the tile is expanded', () => {
    expect(false).toBe(true);
  });

  xit('should react when tile display mode changes', () => {
    expect(false).toBe(true);
  });

  xit(
    `should not update tile state when display mode changed but the tile have not
    been initialized by the tile dashboard`,
    () => {
      expect(false).toBe(true);
    }
  );

  xit(
    `should not update tile state when display mode changed but the tile have not
    been initialized by the tile dashboard`,
    () => {
      expect(false).toBe(true);
    }
  );

  describe('settings button', () => {
    it('should be absent if a callback is not provided', () => {
      let html = `
        <sky-tile [isCollapsed]="tileIsCollapsed">
          <sky-tile-title>Title</sky-tile-title>
          <sky-tile-content>Content</sky-tile-content>
        </sky-tile>
      `;

      let fixture = TestBed
        .overrideComponent(
          TileTestComponent,
          {
            set: {
              template: html
            }
          }
        )
        .createComponent(TileTestComponent);

      let el = fixture.nativeElement;

      fixture.detectChanges();

      expect(el.querySelector('.sky-tile-settings')).toBeNull();
    });

    it('should be present if a callback is provided', () => {
      let fixture = TestBed.createComponent(TileTestComponent);
      let el = fixture.nativeElement;

      fixture.detectChanges();

      expect(el.querySelector('.sky-tile-settings')).not.toBeNull();
    });

    it('should call the specified callback when clicked', () => {
      let fixture = TestBed.createComponent(TileTestComponent);
      let el = fixture.nativeElement;
      let cmp = fixture.componentInstance as TileTestComponent;
      let tileSettingsClickSpy = spyOn(cmp, 'tileSettingsClick');

      fixture.detectChanges();

      el.querySelector('.sky-tile-settings').click();

      expect(tileSettingsClickSpy).toHaveBeenCalled();
    });

    it('should not collapse the tile when clicked', () => {
      let fixture = TestBed.createComponent(TileTestComponent);
      let el = fixture.nativeElement;

      fixture.detectChanges();

      el.querySelector('.sky-tile-settings').click();
      fixture.detectChanges();

      let contentAttrs = el.querySelector('.sky-tile-content').attributes;

      expect(contentAttrs['hidden']).toBe(undefined);
    });
  });
});
