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

  function validateDirection(fixture: any, cmp: SkyChevronComponent, expectedDirection: string) {
    let el = fixture.nativeElement;
    let chevronEl = el.querySelector('.sky-chevron');

    fixture.detectChanges();

    expect(cmp.direction).toBe(expectedDirection);
    expect(chevronEl.classList.contains('sky-chevron-' + expectedDirection)).toBe(true);
  }

  function clickChevron(el: any) {
    el.querySelector('.sky-chevron').click();
  }

  it('should change direction when the user clicks the chevron', () => {
    let fixture = TestBed.createComponent(SkyChevronComponent);
    let cmp = fixture.componentInstance as SkyChevronComponent;
    let el = fixture.nativeElement;
    let expectedDirection: string;

    fixture.detectChanges();

    expectedDirection = 'up';
    validateDirection(fixture, cmp, expectedDirection);

    cmp.directionChange.subscribe((direction: string) => {
      validateDirection(fixture, cmp, expectedDirection);
    });

    expectedDirection = 'down';
    clickChevron(el);
  });

  it('should respect tab index input', () => {
    let fixture = TestBed.createComponent(SkyChevronComponent);
    let el = fixture.nativeElement;

    // set tab index
    fixture.componentInstance.tabIndex = 94;
    fixture.detectChanges();

    // check tab index is 94
    const buttonEl = el.querySelector('.sky-chevron');
    const tabIndex = buttonEl.getAttribute('tabIndex');
    expect(tabIndex).toBe('94');
  });

  it('should set tab index to -1 for disabled chevron', () => {
    let fixture = TestBed.createComponent(SkyChevronComponent);
    let el = fixture.nativeElement;

    // make disabled
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    // check tab index is -1
    const buttonEl = el.querySelector('.sky-chevron');
    const tabIndex = buttonEl.getAttribute('tabIndex');
    expect(tabIndex).toBe('-1');
  });

  it('should not be able to click disabled chevron', () => {
    let fixture = TestBed.createComponent(SkyChevronComponent);
    let cmp = fixture.componentInstance as SkyChevronComponent;
    let el = fixture.nativeElement;

    // make disabled
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    validateDirection(fixture, cmp, 'up');

    clickChevron(el);

    validateDirection(fixture, cmp, 'up');
  });
});
