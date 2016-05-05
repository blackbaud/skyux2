import {
  beforeEach,
  ComponentFixture,
  describe,
  expect,
  it,
  inject,
  TestComponentBuilder
} from 'angular2/testing';

import {ChevronComponent} from './chevron.component';

describe('Chevron component', () => {
    let tcb: TestComponentBuilder;

    beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
      tcb = _tcb;
    }));

    it('should change direction when the user clicks the chevron', (done: Function) => {
      tcb.createAsync(ChevronComponent)
        .then((fixture: ComponentFixture) => {
          let clickAgain = true,
            cmp = fixture.componentInstance as ChevronComponent,
            el = fixture.nativeElement,
            expectedDirection: string;

          function validateDirection() {
            let chevronEl = el.querySelector('.sky-chevron');

            expect(cmp.direction).toBe(expectedDirection);
            expect(chevronEl).toHaveCssClass('sky-chevron-' + expectedDirection);
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
