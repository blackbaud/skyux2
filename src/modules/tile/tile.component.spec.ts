import {
  beforeEach,
  ComponentFixture,
  describe,
  expect,
  inject,
  it,
  TestComponentBuilder
} from 'angular2/testing';

import {Component} from 'angular2/core';
import {SkyTileComponent} from './tile.component';
import {TestUtility} from '../testing/testutility';

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

    return TestUtility.testComponent(tcb, TestComponent, html, (fixture: ComponentFixture) => {
      let el = fixture.nativeElement;

      fixture.detectChanges();

      expect(el.querySelector('.sky-tile-title sky-tile-title')).toHaveText('Title');
    });
  });

  it('should collapse/expand when the header is clicked', () => {
    let html = `
      <sky-tile>
        <sky-tile-title>Title</sky-tile-title>
        <sky-tile-content>Content</sky-tile-content>
      </sky-tile>
    `;

    return TestUtility.testComponent(tcb, TestComponent, html, (fixture: ComponentFixture) => {
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
  });

  it('should collapse/expand when the chevron is clicked', () => {
    let html = `
      <sky-tile>
        <sky-tile-title>Title</sky-tile-title>
        <sky-tile-content>Content</sky-tile-content>
      </sky-tile>
    `;

    return TestUtility.testComponent(tcb, TestComponent, html, (fixture: ComponentFixture) => {
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
  });

  it('should collapse/expand when the bb-tile-collapsed value changes', () => {
    let html = `
      <sky-tile [isCollapsed]="tileIsCollapsed">
        <sky-tile-title>Title</sky-tile-title>
        <sky-tile-content>Content</sky-tile-content>
      </sky-tile>
    `;

    return TestUtility.testComponent(tcb, TestComponent, html, (fixture: ComponentFixture) => {
      let el = fixture.nativeElement;

      fixture.detectChanges();

      let contentAttrs = el.querySelector('.sky-tile-content').attributes;

      expect(contentAttrs['hidden']).toBe(undefined);

      fixture.componentInstance.tileIsCollapsed = true;
      fixture.detectChanges();

      expect(contentAttrs['hidden']).not.toBeNull();
    });
  });

  it('should update the tile state when the tile dashboard is initialized', () => {
    expect(false).toBe(true);
  });

  it('should notify the tile dashboard when the tile is collapsed', () => {
    expect(false).toBe(true);
  });

  it('should notify the tile that repaint is required when the tile is expanded', () => {
    expect(false).toBe(true);
  });

  it('should react when tile display mode changes', () => {
    expect(false).toBe(true);
  });

  it(
    `should not update tile state when display mode changed but the tile have not
    been initialized by the tile dashboard`,
    () => {
      expect(false).toBe(true);
    }
  );

  it(
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

      return TestUtility.testComponent(tcb, TestComponent, html, (fixture: ComponentFixture) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('.sky-tile-settings')).toBeNull();
      });
    });

    it('should be present if a callback is provided', () => {
      let html = `
        <sky-tile [isCollapsed]="tileIsCollapsed" (settingsClick)="tileSettingsClick()">
          <sky-tile-title>Title</sky-tile-title>
          <sky-tile-content>Content</sky-tile-content>
        </sky-tile>
      `;

      return TestUtility.testComponent(tcb, TestComponent, html, (fixture: ComponentFixture) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('.sky-tile-settings')).not.toBeNull();
      });
    });

    it('should call the specified callback when clicked', () => {
      let html = `
        <sky-tile [isCollapsed]="tileIsCollapsed" (settingsClick)="tileSettingsClick()">
          <sky-tile-title>Title</sky-tile-title>
          <sky-tile-content>Content</sky-tile-content>
        </sky-tile>
      `;

      return TestUtility.testComponent(tcb, TestComponent, html, (fixture: ComponentFixture) => {
        let el = fixture.nativeElement;
        let cmp = fixture.componentInstance as TestComponent;

        fixture.detectChanges();

        expect(cmp.tileSettingsClicked).toBe(false);

        el.querySelector('.sky-tile-settings').click();
        fixture.detectChanges();

        expect(cmp.tileSettingsClicked).toBe(true);
      });
    });

    it('should not collapse the tile when clicked', () => {
      let html = `
        <sky-tile [isCollapsed]="tileIsCollapsed" (settingsClick)="tileSettingsClick()">
          <sky-tile-title>Title</sky-tile-title>
          <sky-tile-content>Content</sky-tile-content>
        </sky-tile>
      `;

      return TestUtility.testComponent(tcb, TestComponent, html, (fixture: ComponentFixture) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        el.querySelector('.sky-tile-settings').click();
        fixture.detectChanges();

        let contentAttrs = el.querySelector('.sky-tile-content').attributes;

        expect(contentAttrs['hidden']).toBe(undefined);
      });
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

  public tileSettingsClicked = false;

  public tileSettingsClick() {
    this.tileSettingsClicked = true;
  }
}
