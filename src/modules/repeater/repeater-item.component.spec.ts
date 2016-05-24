import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, ViewChild } from '@angular/core';
import {
  beforeEach,
  describe,
  expect,
  fakeAsync,
  inject,
  it,
  tick
} from '@angular/core/testing';

import { SkyRepeaterComponent } from './repeater.component';
import { SkyRepeaterItemComponent } from './repeater-item.component';
import { TestUtility } from '../testing/testutility';

describe('Repeater item component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  xit('should remove the corresponding item from DOM when item is removed', () => {
  });

  xit('should add the appropriate class to an item when a context menu is present', () => {
  });

  xit('should enable expand/collapse animation only after an item is initially rendered', () => {
  });

  describe('with expand mode of "single"', () => {
    it('should collapse other items when an item is expanded', fakeAsync(() => {
      return TestUtility.testComponent(
        tcb,
        TestComponent,
        undefined,
        (fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;

          fixture.componentInstance.expandMode = 'single';
          fixture.detectChanges();

          tick();

          let repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);
          expect(repeaterItems[1].isExpanded).toBe(false);
          expect(repeaterItems[2].isExpanded).toBe(false);

          repeaterItems[1].isExpanded = true;

          fixture.detectChanges();

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(false);
          expect(repeaterItems[1].isExpanded).toBe(true);
          expect(repeaterItems[2].isExpanded).toBe(false);
        }
      );
    }));
  });

  describe('with expand mode of "multiple"', () => {
    it('should not collapse other items when an item is expanded', fakeAsync(() => {
      return TestUtility.testComponent(
        tcb,
        TestComponent,
        undefined,
        (fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;

          fixture.componentInstance.expandMode = 'multiple';
          fixture.detectChanges();

          let repeaterItems = cmp.repeater.items.toArray();

          repeaterItems[0].isExpanded = true;
          repeaterItems[1].isExpanded = false;
          repeaterItems[2].isExpanded = false;

          fixture.detectChanges();

          repeaterItems[1].isExpanded = true;

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);
          expect(repeaterItems[1].isExpanded).toBe(true);
          expect(repeaterItems[2].isExpanded).toBe(false);
        }
      );
    }));
  });

  describe('with expand mode of "none"', () => {
    xit('should not allow items to be collapsed', () => {
    });

    xit('should hide each item\'s chevron button', () => {
    });

    it(
      'should expand all items when mode was previously set to "single" or "multiple"',
      fakeAsync(() => {
        return TestUtility.testComponent(
          tcb,
          TestComponent,
          undefined,
          (fixture: ComponentFixture<TestComponent>) => {
            let cmp: TestComponent = fixture.componentInstance;

            fixture.componentInstance.expandMode = 'single';
            fixture.detectChanges();

            tick();

            let repeaterItems = cmp.repeater.items.toArray();

            expect(repeaterItems[0].isExpanded).toBe(true);
            expect(repeaterItems[1].isExpanded).toBe(false);
            expect(repeaterItems[2].isExpanded).toBe(false);

            cmp.expandMode = 'none';

            fixture.detectChanges();

            tick();

            repeaterItems = cmp.repeater.items.toArray();

            for (let repeaterItem of repeaterItems) {
              expect(repeaterItem.isExpanded).toBe(true);
              expect(repeaterItem.isCollapsible).toBe(false);
            }
          }
        );
      })
    );
  });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyRepeaterComponent, SkyRepeaterItemComponent],
  template: `
<sky-repeater [expandMode]="expandMode">
  <sky-repeater-item>
    <sky-repeater-item-context-menu *ngIf="showContextMenu">
      <sky-context-menu>
      </sky-context-menu>
    </sky-repeater-item-context-menu>
    <sky-repeater-item-title>Title 1</sky-repeater-item-title>
    <sky-repeater-item-content>Content 1</sky-repeater-item-content>
  </sky-repeater-item>
  <sky-repeater-item>
    <sky-repeater-item-context-menu *ngIf="showContextMenu">
      <sky-context-menu>
      </sky-context-menu>
    </sky-repeater-item-context-menu>
    <sky-repeater-item-title>Title 2</sky-repeater-item-title>
    <sky-repeater-item-content>Content 2</sky-repeater-item-content>
  </sky-repeater-item>
  <sky-repeater-item *ngIf="!removeLastItem">
    <sky-repeater-item-context-menu *ngIf="showContextMenu">
      <sky-context-menu>
      </sky-context-menu>
    </sky-repeater-item-context-menu>
    <sky-repeater-item-title>Title 3</sky-repeater-item-title>
    <sky-repeater-item-content>Content 3</sky-repeater-item-content>
  </sky-repeater-item>
</sky-repeater>`
})
class TestComponent {
  @ViewChild(SkyRepeaterComponent)
  public repeater: SkyRepeaterComponent;
  public showContextMenu: boolean;
  public removeLastItem: boolean;
  public expandMode: string;
}
