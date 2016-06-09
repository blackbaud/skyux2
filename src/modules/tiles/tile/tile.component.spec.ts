import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { provide } from '@angular/core';
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

import { TestComponent } from './fixtures';
import { SkySlideService } from '../../animation/slide.service';
import { SkyTileComponent } from './tile.component';
import { SkyTileDashboardService } from '../tile-dashboard/tile-dashboard.service';
import { MockSkyTileDashboardService } from './fixtures';

describe('Tile component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should render the header text in the expected element', () => {
    return tcb
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('.sky-tile-title sky-tile-title')).toHaveText('Title');
      }
    );
  });

  it('should collapse/expand when the header is clicked', () => {
    return tcb
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let titleEl = el.querySelector('.sky-tile-title');

        titleEl.click();
        fixture.detectChanges();

        let contentAttrs = el.querySelector('.sky-tile-content').attributes;

        expect(contentAttrs['hidden']).not.toBeNull();

        titleEl.click();
        fixture.detectChanges();

        expect(contentAttrs['hidden']).toBe(undefined);
      }
    );
  });

  it('should collapse/expand when the chevron is clicked', () => {
    return tcb
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
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
      }
    );
  });

  it('should collapse without animation when initialized with isCollapsed = true', () => {
    let mockSlideService = {
      slide() {

      }
    };

    let slideSpy = spyOn(mockSlideService, 'slide');

    return tcb
      .overrideViewProviders(
        SkyTileComponent,
        [
          provide(SkySlideService, {useValue: mockSlideService})
        ]
      )
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        fixture.componentInstance.tileIsCollapsed = true;

        fixture.detectChanges();

        expect(slideSpy).toHaveBeenCalledWith(
          jasmine.any(Object),
          '.sky-tile-content',
          'up',
          false
        );
      }
    );
  });

  it('should collapse/expand when the isCollapsed value changes', () => {
    return tcb
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let contentAttrs = el.querySelector('.sky-tile-content').attributes;

        expect(contentAttrs['hidden']).toBe(undefined);

        fixture.componentInstance.tileIsCollapsed = true;
        fixture.detectChanges();

        expect(contentAttrs['hidden']).not.toBeNull();
      }
    );
  });

  xit('should update the tile state when the tile dashboard is initialized', () => {
    expect(false).toBe(true);
  });

  it('should notify the tile dashboard when the tile is collapsed', fakeAsync(() => {
    let mockDashboardService = new MockSkyTileDashboardService();

    return tcb
      .overrideProviders(
        SkyTileComponent,
        [
          provide(
            SkyTileDashboardService,
            {
              useValue: mockDashboardService
            }
          )
        ]
      )
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;
        let dashboardSpy = spyOn(mockDashboardService, 'setTileCollapsed');

        fixture.detectChanges();

        let chevronEl = el.querySelector('.sky-chevron');

        chevronEl.click();

        fixture.detectChanges();
        tick();

        expect(dashboardSpy).toHaveBeenCalledWith(jasmine.any(SkyTileComponent), true);
      }
    );
  }));

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

      return tcb
        .overrideTemplate(TestComponent, html)
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let el = fixture.nativeElement;

          fixture.detectChanges();

          expect(el.querySelector('.sky-tile-settings')).toBeNull();
        }
      );
    });

    it('should be present if a callback is provided', () => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let el = fixture.nativeElement;

          fixture.detectChanges();

          expect(el.querySelector('.sky-tile-settings')).not.toBeNull();
        }
      );
    });

    it('should call the specified callback when clicked', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let el = fixture.nativeElement;
          let cmp = fixture.componentInstance as TestComponent;
          let tileSettingsClickSpy = spyOn(cmp, 'tileSettingsClick');

          fixture.detectChanges();

          el.querySelector('.sky-tile-settings').click();

          fixture.detectChanges();
          tick();

          expect(tileSettingsClickSpy).toHaveBeenCalled();
        }
      );
    }));

    it('should not collapse the tile when clicked', () => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let el = fixture.nativeElement;

          fixture.detectChanges();

          el.querySelector('.sky-tile-settings').click();
          fixture.detectChanges();

          let contentAttrs = el.querySelector('.sky-tile-content').attributes;

          expect(contentAttrs['hidden']).toBe(undefined);
        }
      );
    });
  });

});
