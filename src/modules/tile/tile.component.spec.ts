import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, EventEmitter } from '@angular/core';
import {
  beforeEach,
  describe,
  expect,
  inject,
  it,
  provide
} from '@angular/core/testing';

import { SkyTileComponent } from './tile.component';
import { SkyTileDashboardService } from './tile-dashboard.service';
import { TestUtility } from '../testing/testutility';

class MockDashboardService extends SkyTileDashboardService {
  public setTileCollapsed(tile: SkyTileComponent, isCollapsed: boolean) {
  }
}

describe('Tile component', () => {

  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should render the header text in the expected element', () => {
    let html = `
      <sky-tile>
        <sky-tile-title>Title</sky-tile-title>
        <sky-tile-content>Content</sky-tile-content>
      </sky-tile>
    `;

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('.sky-tile-title sky-tile-title')).toHaveText('Title');
      }
    );
  });

  it('should collapse/expand when the header is clicked', () => {
    let html = `
      <sky-tile>
        <sky-tile-title>Title</sky-tile-title>
        <sky-tile-content>Content</sky-tile-content>
      </sky-tile>
    `;

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
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
    let html = `
      <sky-tile>
        <sky-tile-title>Title</sky-tile-title>
        <sky-tile-content>Content</sky-tile-content>
      </sky-tile>
    `;

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
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

  it('should collapse/expand when the bb-tile-collapsed value changes', () => {
    let html = `
      <sky-tile [isCollapsed]="tileIsCollapsed">
        <sky-tile-title>Title</sky-tile-title>
        <sky-tile-content>Content</sky-tile-content>
      </sky-tile>
    `;

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
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

  xit('should notify the tile dashboard when the tile is collapsed', (done: Function) => {
    let html = `
      <sky-tile>
        <sky-tile-title>Title</sky-tile-title>
        <sky-tile-content>Content</sky-tile-content>
      </sky-tile>
    `;

    let mockDashboardService = new MockDashboardService();

    return TestUtility.testComponentWithProviders(
      tcb,
      TestComponent,
      html,
      SkyTileComponent,
      [
        provide(
          SkyTileDashboardService,
          {
            useValue: mockDashboardService
          }
        )
      ],
      (fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;
        let dashboardSpy = spyOn(mockDashboardService, 'setTileCollapsed');

        fixture.detectChanges();

        let chevronEl = el.querySelector('.sky-chevron');

        chevronEl.click();
        fixture.detectChanges();

        //  TODO: This is a nasty workaround.  We need to revisit this to see if change detection
        // has improved in the Angular 2 RC.
        setTimeout(function() {
          expect(dashboardSpy).toHaveBeenCalledWith(jasmine.any(SkyTileComponent), true);
          done();
        }, 100);
      }
    );
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

      return TestUtility.testComponent(
        tcb,
        TestComponent,
        html,
        (fixture: ComponentFixture<TestComponent>) => {
          let el = fixture.nativeElement;

          fixture.detectChanges();

          expect(el.querySelector('.sky-tile-settings')).toBeNull();
        }
      );
    });

    it('should be present if a callback is provided', () => {
      let html = `
        <sky-tile [isCollapsed]="tileIsCollapsed" (settingsClick)="tileSettingsClick()">
          <sky-tile-title>Title</sky-tile-title>
          <sky-tile-content>Content</sky-tile-content>
        </sky-tile>
      `;

      return TestUtility.testComponent(
        tcb,
        TestComponent,
        html,
        (fixture: ComponentFixture<TestComponent>) => {
          let el = fixture.nativeElement;

          fixture.detectChanges();

          expect(el.querySelector('.sky-tile-settings')).not.toBeNull();
        }
      );
    });

    it('should call the specified callback when clicked', (done: Function) => {
      let html = `
        <sky-tile [isCollapsed]="tileIsCollapsed" (settingsClick)="tileSettingsClick()">
          <sky-tile-title>Title</sky-tile-title>
          <sky-tile-content>Content</sky-tile-content>
        </sky-tile>
      `;

      return TestUtility.testComponent(
        tcb,
        TestComponent,
        html,
        (fixture: ComponentFixture<TestComponent>) => {
          let el = fixture.nativeElement;
          let cmp = fixture.componentInstance as TestComponent;

          fixture.detectChanges();

          cmp.tileSettingsClicked.subscribe(() => {
            done();
          });

          el.querySelector('.sky-tile-settings').click();
          fixture.detectChanges();
        }
      );
    });

    it('should not collapse the tile when clicked', () => {
      let html = `
        <sky-tile [isCollapsed]="tileIsCollapsed" (settingsClick)="tileSettingsClick()">
          <sky-tile-title>Title</sky-tile-title>
          <sky-tile-content>Content</sky-tile-content>
        </sky-tile>
      `;

      return TestUtility.testComponent(
        tcb,
        TestComponent,
        html,
        (fixture: ComponentFixture<TestComponent>) => {
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

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyTileComponent],
  template: ''
})
class TestComponent {
  public tileIsCollapsed = false;

  public tileSettingsClicked = new EventEmitter();

  public tileSettingsClick() {
    this.tileSettingsClicked.emit(undefined);
  }
}
