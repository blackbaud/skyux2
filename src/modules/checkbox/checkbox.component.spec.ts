import {
  beforeEach,
  ComponentFixture,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, EventEmitter, Output} from 'angular2/core';
import {SkyCheckboxComponent} from './';

describe('Checkbox component', () => {
    'use strict';

    function testComponent(html: string, callback: Function) {
      return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, html)
          .createAsync(TestComponent)
          .then((fixture: ComponentFixture) => {
            fixture.detectChanges();
            callback(fixture, fixture.nativeElement);
          });
      });
    }

    describe('bindings', () => {
      let tcb: TestComponentBuilder;

      beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
        tcb = _tcb;
      }));

      it('should emit the selectedChange event when the user clicks the checkbox', (done: Function) => {
        let html = `
          <sky-checkbox [selected]="selected" (selectedChange)="updateSelected($event)">
            <sky-checkbox-label>Checkbox</sky-checkbox-label>
          </sky-checkbox>
          {{selected}}
        `;

        tcb.overrideTemplate(TestComponent, html)
          .createAsync(TestComponent)
          .then((fixture: ComponentFixture) => {
            let cmp = fixture.componentInstance as SkyCheckboxComponent,
              el = fixture.nativeElement;

            fixture.detectChanges();

            cmp.selectedChange.subscribe((selected: boolean) => {
              expect(selected).toBe(true);
              done();
            });

            el.querySelector('.sky-checkbox-wrapper').click();

            fixture.detectChanges();
          });
      });
    });
});

@Component({
  selector: 'test-cmp',
  directives: [SkyCheckboxComponent],
  template: ''
})
class TestComponent {
  selected = false;

  @Output()
  selectedChange = new EventEmitter();

  updateSelected($event: boolean) {
    this.selected = $event;
    this.selectedChange.emit($event);
  }
}
