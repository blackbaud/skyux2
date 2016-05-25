import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide, ViewChild } from '@angular/core';
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
import { SkyLogService } from '../log/log.service';
import { TestUtility } from '../testing/testutility';

describe('Repeater item component', () => {
  let tcb: TestComponentBuilder;

  class MockLogService {
    public warn(message: any) {
      console.error('hi');
    }
  }

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

          cmp.expandMode = 'single';
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

          cmp.expandMode = 'multiple';

          fixture.detectChanges();
          tick();

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
    it('should not allow items to be collapsed', fakeAsync(() => {
        let mockLogService = new MockLogService();

        return TestUtility.testComponentWithProviders(
          tcb,
          TestComponent,
          undefined,
          SkyRepeaterItemComponent,
          [
            provide(SkyLogService, {useValue: mockLogService})
          ],
          (fixture: ComponentFixture<TestComponent>) => {
            let cmp: TestComponent = fixture.componentInstance;

            cmp.expandMode = 'none';

            fixture.detectChanges();
            tick();

            let item = cmp.repeater.items.first;

            expect(item.isExpanded).toBe(true);

            let warnSpy = spyOn(mockLogService, 'warn');

            item.isExpanded = false;

            fixture.detectChanges();
            tick();

            item = cmp.repeater.items.first;

            expect(warnSpy).toHaveBeenCalled();

            expect(item.isExpanded).toBe(true);
          }
        );
      })
    );

    it('should hide each item\'s chevron button', fakeAsync(() => {
        return TestUtility.testComponent(
          tcb,
          TestComponent,
          undefined,
          (fixture: ComponentFixture<TestComponent>) => {
            let cmp: TestComponent = fixture.componentInstance;
            let el = fixture.nativeElement as Element;

            cmp.expandMode = 'none';
            fixture.detectChanges();

            tick();

            let chevronEls = el.querySelectorAll('.sky-repeater-item-chevron');

            expect(chevronEls.length).toBe(3);

            for (let i = 0, n = chevronEls.length; i < n; i++) {
              let chevronEl = chevronEls.item(i);
              expect(getComputedStyle(chevronEl).getPropertyValue('display')).toBe('none');
            }
          }
        );
      })
    );

    it(
      'should expand all items when mode was previously set to "single" or "multiple"',
      fakeAsync(() => {
        let mockLogService = new MockLogService();

        return TestUtility.testComponentWithProviders(
          tcb,
          TestComponent,
          undefined,
          SkyRepeaterItemComponent,
          [
            provide(SkyLogService, {useValue: mockLogService})
          ],
          (fixture: ComponentFixture<TestComponent>) => {
            let cmp: TestComponent = fixture.componentInstance;

            cmp.expandMode = 'multiple';

            fixture.detectChanges();
            tick();

            let repeaterItems = cmp.repeater.items.toArray();

            for (let repeaterItem of repeaterItems) {
              repeaterItem.isExpanded = false;
            }

            fixture.detectChanges();
            tick();

            cmp.expandMode = 'none';

            fixture.detectChanges();
            tick();

            repeaterItems = cmp.repeater.items.toArray();

            for (let repeaterItem of repeaterItems) {
              expect(repeaterItem.isExpanded).toBe(true);
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
