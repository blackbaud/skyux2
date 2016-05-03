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
import {SkyChevronComponent} from './';

describe('Chevron component', () => {
    let tcb: TestComponentBuilder;

    beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
      tcb = _tcb;
    }))

    it('should change direction when the user clicks the chevron', (done: Function) => {
      tcb.createAsync(SkyChevronComponent)
        .then((fixture: ComponentFixture) => {
          let clickAgain = true,
            cmp = fixture.componentInstance as SkyChevronComponent,
            el = fixture.nativeElement,
            expectedDirection: string;

          function validateDirection() {
            expect(cmp.direction).toBe(expectedDirection);
            expect(el.querySelector('.sky-chevron')).toHaveCssClass('sky-chevron-' + expectedDirection);
          }

          function clickChevron() {
            el.querySelector('.sky-chevron').click();
            fixture.detectChanges();
          }

          fixture.detectChanges();

          expectedDirection = 'up';
          validateDirection();

          cmp.directionChange.subscribe((direction: string) => {
            validateDirection();

            if (clickAgain) {
              expectedDirection = 'up';
              clickChevron();

              clickAgain = false;
            } else {
              done();
            }
          });

          expectedDirection = 'down';
          clickChevron();
        });
    });
});
