import { provide } from '@angular/core';
import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';

import { TestComponent } from './fixtures';
import { SkyTileComponent } from './tile.component';
import { SkyTileDashboardService } from '../tile-dashboard/tile-dashboard.service';
import { MockSkyTileDashboardService } from './fixtures';

describe('Tile component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should render the header text in the expected element', () => {
    let fixture = tcb.createSync(TestComponent);
    let el = fixture.nativeElement;

    fixture.detectChanges();

    expect(el.querySelector('.sky-tile-title sky-tile-title').innerText).toBe('Title');
  });

  it('should collapse/expand when the header is clicked', () => {
    let fixture = tcb.createSync(TestComponent);
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
  });

  it('should collapse/expand when the chevron is clicked', () => {
    let fixture = tcb.createSync(TestComponent);
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
    let fixture = tcb.createSync(TestComponent);
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

  it('should notify the tile dashboard when the tile is collapsed', () => {
    let mockDashboardService = new MockSkyTileDashboardService();

    let fixture = tcb
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
      .createSync(TestComponent);

    let el = fixture.nativeElement;
    let dashboardSpy = spyOn(mockDashboardService, 'setTileCollapsed');

    fixture.detectChanges();

    let chevronEl = el.querySelector('.sky-chevron');

    chevronEl.click();

    fixture.detectChanges();

    expect(dashboardSpy).toHaveBeenCalledWith(jasmine.any(SkyTileComponent), true);
  });

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

      let fixture = tcb
        .overrideTemplate(TestComponent, html)
        .createSync(TestComponent);

      let el = fixture.nativeElement;

      fixture.detectChanges();

      expect(el.querySelector('.sky-tile-settings')).toBeNull();
    });

    it('should be present if a callback is provided', () => {
      let fixture = tcb.createSync(TestComponent);
      let el = fixture.nativeElement;

      fixture.detectChanges();

      expect(el.querySelector('.sky-tile-settings')).not.toBeNull();
    });

    it('should call the specified callback when clicked', () => {
      let fixture = tcb.createSync(TestComponent);
      let el = fixture.nativeElement;
      let cmp = fixture.componentInstance as TestComponent;
      let tileSettingsClickSpy = spyOn(cmp, 'tileSettingsClick');

      fixture.detectChanges();

      el.querySelector('.sky-tile-settings').click();

      expect(tileSettingsClickSpy).toHaveBeenCalled();
    });

    it('should not collapse the tile when clicked', () => {
      let fixture = tcb.createSync(TestComponent);
      let el = fixture.nativeElement;

      fixture.detectChanges();

      el.querySelector('.sky-tile-settings').click();
      fixture.detectChanges();

      let contentAttrs = el.querySelector('.sky-tile-content').attributes;

      expect(contentAttrs['hidden']).toBe(undefined);
    });
  });
});
