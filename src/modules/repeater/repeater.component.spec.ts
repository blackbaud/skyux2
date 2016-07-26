import { Component, provide, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  tick,
  TestComponentBuilder
} from '@angular/core/testing';

import { SkyRepeaterComponent } from './repeater.component';
import { SkyRepeaterItemComponent } from './repeater-item.component';
import { SkyLogService } from '../log/log.service';

describe('Repeater item component', () => {
  let tcb: TestComponentBuilder;

  class MockLogService {
    public warn(message: any) {
    }
  }

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it(
    'should default expand mode to "none" when no expand mode is specified',
    fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;
          cmp.expandMode = undefined;

          fixture.detectChanges();

          tick();

          expect(cmp.repeater.expandMode).toBe('none');
        });
    })
  );

  describe('with expand mode of "single"', () => {
    it('should collapse other items when an item is expanded', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;

          cmp.expandMode = 'single';
          fixture.detectChanges();

          tick();

          let repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);
          expect(repeaterItems[1].isExpanded).toBeFalsy();
          expect(repeaterItems[2].isExpanded).toBeFalsy();

          repeaterItems[1].isExpanded = true;

          fixture.detectChanges();

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBeFalsy();
          expect(repeaterItems[1].isExpanded).toBe(true);
          expect(repeaterItems[2].isExpanded).toBeFalsy();
        });
    }));

    it('should collapse other items when a new expanded item is added', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;

          cmp.expandMode = 'single';
          cmp.removeLastItem = true;

          fixture.detectChanges();

          tick();

          let repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);
          expect(repeaterItems[1].isExpanded).toBe(false);

          cmp.removeLastItem = false;
          cmp.lastItemExpanded = true;

          fixture.detectChanges();

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(false);
          expect(repeaterItems[1].isExpanded).toBe(false);
          expect(repeaterItems[2].isExpanded).toBe(true);
        });
    }));

    it('should toggle its collapsed state when an item\'s header is clicked', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;
          let el = fixture.nativeElement;

          cmp.expandMode = 'single';

          fixture.detectChanges();

          tick();

          let repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);

          el.querySelectorAll('.sky-repeater-item-title').item(0).click();

          fixture.detectChanges();

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(false);
        });
    }));

    it('should toggle its collapsed state when an item\'s chevron is clicked', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;
          let el = fixture.nativeElement;

          cmp.expandMode = 'single';

          fixture.detectChanges();

          tick();

          let repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);

          el.querySelectorAll('.sky-chevron').item(0).click();

          fixture.detectChanges();

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(false);
        });
    }));
  });

  describe('with expand mode of "multiple"', () => {
    it('should not collapse other items when an item is expanded', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
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
        });
    }));

    it('should toggle its collapsed state when an item\'s header is clicked', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;
          let el = fixture.nativeElement;

          cmp.expandMode = 'multiple';

          fixture.detectChanges();

          tick();

          let repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);

          el.querySelectorAll('.sky-repeater-item-title').item(0).click();

          fixture.detectChanges();

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(false);
        });
    }));

    it('should toggle its collapsed state when an item\'s chevron is clicked', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;
          let el = fixture.nativeElement;

          cmp.expandMode = 'multiple';

          fixture.detectChanges();

          tick();

          let repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);

          el.querySelectorAll('.sky-chevron').item(0).click();

          fixture.detectChanges();

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(false);
        });
    }));
  });

  describe('with expand mode of "none"', () => {
    it('should not allow items to be collapsed', fakeAsync(() => {
        let mockLogService = new MockLogService();

      return tcb
        .overrideProviders(
          SkyRepeaterItemComponent,
          [
            provide(SkyLogService, {useValue: mockLogService})
          ]
        )
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
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
          });
      })
    );

    it('should hide each item\'s chevron button', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
            let cmp: TestComponent = fixture.componentInstance;
            let el = fixture.nativeElement as Element;

            fixture.detectChanges();

            cmp.expandMode = 'none';
            fixture.detectChanges();

            tick();

            let chevronEls = el.querySelectorAll('.sky-repeater-item-chevron');

            expect(chevronEls.length).toBe(3);

            for (let i = 0, n = chevronEls.length; i < n; i++) {
              let chevronEl = chevronEls.item(i);
              expect(getComputedStyle(chevronEl).getPropertyValue('display')).toBe('none');
            }
          });
      })
    );

    it(
      'should expand all items when mode was previously set to "single" or "multiple"',
      fakeAsync(() => {
        let mockLogService = new MockLogService();

        return tcb
          .overrideProviders(
            SkyRepeaterItemComponent,
            [
              provide(SkyLogService, {useValue: mockLogService})
            ]
          )
          .createAsync(TestComponent)
          .then((fixture: ComponentFixture<TestComponent>) => {
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

    it('should not toggle its collapsed state when an item\'s header is clicked', fakeAsync(() => {
      return tcb
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          let cmp: TestComponent = fixture.componentInstance;
          let el = fixture.nativeElement;

          cmp.expandMode = 'none';

          fixture.detectChanges();

          tick();

          let repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);

          el.querySelectorAll('.sky-repeater-item-title').item(0).click();

          fixture.detectChanges();

          tick();

          repeaterItems = cmp.repeater.items.toArray();

          expect(repeaterItems[0].isExpanded).toBe(true);
        }
      );
    }));
  });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyRepeaterComponent, SkyRepeaterItemComponent],
  template:
`<sky-repeater [expandMode]="expandMode">
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
  <sky-repeater-item *ngIf="!removeLastItem" [isExpanded]="lastItemExpanded">
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
  public expandMode = 'single';
  public lastItemExpanded: boolean;
}
