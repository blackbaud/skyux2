import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import {
  beforeEach,
  describe,
  expect,
  fakeAsync,
  inject,
  it,
  tick
} from '@angular/core/testing';

import { SkyCheckboxComponent } from './checkbox.component';

describe('Checkbox component', () => {
    'use strict';

    describe('bindings', () => {
      let tcb: TestComponentBuilder;

      beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
        tcb = _tcb;
      }));

      it(
        'should emit the selectedChange event when the user clicks the checkbox',
        fakeAsync(() => {
          let html = `
            <sky-checkbox [(selected)]="selected">
              <sky-checkbox-label>Checkbox</sky-checkbox-label>
            </sky-checkbox>
            {{selected}}
          `;

          tcb.overrideTemplate(TestComponent, html)
            .createAsync(TestComponent)
            .then((fixture: ComponentFixture<TestComponent>) => {
              let cmp = fixture.componentInstance as TestComponent,
                el = fixture.nativeElement;

              fixture.detectChanges();

              el.querySelector('.sky-checkbox-wrapper').click();

              fixture.detectChanges();
              tick();

              expect(cmp.selected).toBe(true);
            });
        }
      ));
    });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyCheckboxComponent],
  template: ''
})
class TestComponent {
  public selected = false;
}
