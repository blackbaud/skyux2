import {
  TestBed
} from '@angular/core/testing';

import { SkyChevronComponent } from './chevron.component';
import { SkyChevronModule } from './chevron.module';

describe('Chevron component', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyChevronModule
        ]
      });
    });

  it('should change direction when the user clicks the chevron', () => {
    let fixture = TestBed.createComponent(SkyChevronComponent);
    let cmp = fixture.componentInstance as SkyChevronComponent;
    let el = fixture.nativeElement;
    let expectedDirection: string;

    function validateDirection() {
      let chevronEl = el.querySelector('.sky-chevron');

      fixture.detectChanges();

      expect(cmp.direction).toBe(expectedDirection);
      expect(chevronEl.classList.contains('sky-chevron-' + expectedDirection)).toBe(true);
    }

    function clickChevron() {
      el.querySelector('.sky-chevron').click();
    }

    fixture.detectChanges();

    expectedDirection = 'up';
    validateDirection();

    cmp.directionChange.subscribe((direction: string) => {
      validateDirection();
    });

    expectedDirection = 'down';
    clickChevron();
  });
});
