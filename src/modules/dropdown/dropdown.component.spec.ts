import {
  async,
  TestBed
} from '@angular/core/testing';

import { DropdownTestComponent } from './fixtures/dropdown.component.fixture';
import { SkyDropdownFixturesModule } from './fixtures/dropdown-fixtures.module';

import { TestUtility } from '../testing/testutility';
import { expect } from '../testing';

describe('Dropdown component', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyDropdownFixturesModule
        ]
      });
    });

    function getDropdownBtnEl(el: Element) {
      return <HTMLElement>el.querySelector('.sky-dropdown-button');
    }

    it('should have a default button type of "select"', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: Element = fixture.nativeElement;

      fixture.detectChanges();

      expect(getDropdownBtnEl(el)).toHaveCssClass('sky-dropdown-button-type-select');
    });

    it('should set the correct button type CSS class', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let cmp: DropdownTestComponent = fixture.componentInstance;
      let el: Element = fixture.nativeElement;

      cmp.buttonType = 'context-menu';

      fixture.detectChanges();

      expect(getDropdownBtnEl(el)).toHaveCssClass('sky-dropdown-button-type-context-menu');
    });

    it('should open the dropdown menu when clicking the dropdown button', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let cmp: DropdownTestComponent = fixture.componentInstance;
      let el = fixture.nativeElement;

      cmp.buttonType = 'context-menu';

      fixture.detectChanges();

      let dropdownBtnEl = getDropdownBtnEl(el);

      dropdownBtnEl.click();

      expect(el.querySelector('.sky-dropdown-menu')).not.toBeNull();
    });

    it(
      `should close the dropdown menu when clicking outside it`,
      async(() => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp: DropdownTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);

        dropdownBtnEl.click();

        fixture.whenStable().then(() => {
          let dropdownEl = el.querySelector('.sky-dropdown-menu');
          expect(dropdownEl).toBeVisible();

          TestUtility.fireDomEvent(document, 'click');

          fixture.detectChanges();

          fixture.whenStable().then(() => {
            expect(dropdownEl).not.toBeVisible();
          });
        });
      })
    );

    it(
      `should close the dropdown menu when clicking the button a second time`,
      async(() => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp: DropdownTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);

        dropdownBtnEl.click();

        fixture.whenStable().then(() => {
          let dropdownEl = el.querySelector('.sky-dropdown-menu');
          expect(dropdownEl).toBeVisible();

          dropdownBtnEl.click();

          fixture.detectChanges();

          fixture.whenStable().then(() => {
            expect(dropdownEl).not.toBeVisible();
          });
        });
      })
    );

    describe('of type "select"', () => {
      it('should display an ellipsis instead of the specified button content', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);

        expect(dropdownBtnEl.innerText.trim()).toBe('Show dropdown');
        expect(dropdownBtnEl.querySelector('.sky-dropdown-caret')).not.toBeNull();
      });
    });

    describe('of type "context-menu"', () => {
      it('should display an ellipsis instead of the specified button content', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp: DropdownTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);

        expect(dropdownBtnEl).toHaveText('');
        expect(dropdownBtnEl.querySelector('.sky-dropdown-caret')).toBeNull();
      });
    });
});
