import {
  beforeEach,
  ComponentFixture,
  describe,
  expect,
  it,
  inject,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, EventEmitter, Output} from 'angular2/core';
import {CheckboxComponent} from './checkbox.component';

describe('Checkbox component', () => {
    'use strict';

    describe('bindings', () => {
      let tcb: TestComponentBuilder;

      beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
        tcb = _tcb;
      }));

      it(
        'should emit the selectedChange event when the user clicks the checkbox',
        (done: Function) => {
          let html = `
            <sky-checkbox [selected]="selected" (selectedChange)="updateSelected($event)">
              <sky-checkbox-label>Checkbox</sky-checkbox-label>
            </sky-checkbox>
            {{selected}}
          `;

          tcb.overrideTemplate(TestComponent, html)
            .createAsync(TestComponent)
            .then((fixture: ComponentFixture) => {
              let cmp = fixture.componentInstance as TestComponent,
                el = fixture.nativeElement;

              fixture.detectChanges();

              cmp.selectedChange.subscribe((selected: boolean) => {
                expect(selected).toBe(true);
                done();
              });

              el.querySelector('.sky-checkbox-wrapper').click();

              fixture.detectChanges();
            });
        }
      );
    });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [CheckboxComponent],
  template: ''
})
class TestComponent {
  public selected = false;

  @Output()
  public selectedChange = new EventEmitter();

  public updateSelected($event: boolean) {
    this.selected = $event;
    this.selectedChange.emit($event);
  }
}
