import {
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

    function getDropdownEl(el: Element) {
      return <HTMLElement>el.querySelector('.sky-dropdown');
    }

    function getDropdownBtnEl(el: Element) {
      return <HTMLElement>el.querySelector('.sky-dropdown-button');
    }

    function getDropdownMenuEl(el: Element) {
      return <HTMLElement>el.querySelector('.sky-dropdown-menu');
    }

    it('should have a default button type of "select"', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: Element = fixture.nativeElement;

      fixture.detectChanges();

      expect(getDropdownBtnEl(el)).toHaveCssClass('sky-dropdown-button-type-select');
    });

    it('should set the correct button type CSS class', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let cmp = fixture.componentInstance;
      let el: Element = fixture.nativeElement;

      cmp.buttonType = 'context-menu';

      fixture.detectChanges();

      expect(getDropdownBtnEl(el)).toHaveCssClass('sky-dropdown-button-type-context-menu');
    });

    it('should set the correct title when specified', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let cmp = fixture.componentInstance;
      let el: Element = fixture.nativeElement;

      cmp.myTitle = 'dropdown title';

      fixture.detectChanges();

      expect(getDropdownBtnEl(el).getAttribute('title')).toBe('dropdown title');
    });

    describe('with trigger type "click"', () => {
      it('should open the dropdown menu when clicking the dropdown button', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);

        dropdownBtnEl.click();

        expect(getDropdownMenuEl(el)).toBeVisible();
      });

      it('should close the dropdown menu when clicking outside it', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);

        dropdownBtnEl.click();

        let dropdownMenuEl = getDropdownMenuEl(el);
        expect(dropdownMenuEl).toBeVisible();

        TestUtility.fireDomEvent(document, 'click');

        fixture.detectChanges();

        expect(dropdownMenuEl).not.toBeVisible();
      });

      it('should close the dropdown menu when clicking the button a second time', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);
        dropdownBtnEl.click();

        let dropdownMenuEl = getDropdownMenuEl(el);
        expect(dropdownMenuEl).toBeVisible();

        dropdownBtnEl.click();

        fixture.detectChanges();

        expect(dropdownMenuEl).not.toBeVisible();
      });

      it('should not open the dropdown menu when the mouse enters the dropdown button', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownEl = getDropdownEl(el);
        TestUtility.fireDomEvent(dropdownEl, 'mouseenter');

        fixture.detectChanges();

        expect(getDropdownMenuEl(el)).not.toBeVisible();
      });

      it('should close the dropdown menu when moving the mouse outside the menu', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);
        dropdownBtnEl.click();

        let dropdownMenuEl = getDropdownMenuEl(el);
        expect(dropdownMenuEl).toBeVisible();

        let dropdownEl = getDropdownEl(el);
        TestUtility.fireDomEvent(dropdownEl, 'mouseleave');

        fixture.detectChanges();

        expect(dropdownMenuEl).toBeVisible();
      });
    });

    describe('with trigger type "hover"', () => {
      it('should open the dropdown menu when the mouse enters the dropdown button', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';
        cmp.trigger = 'hover';

        fixture.detectChanges();

        let dropdownEl = getDropdownEl(el);
        TestUtility.fireDomEvent(dropdownEl, 'mouseenter');

        fixture.detectChanges();

        expect(getDropdownMenuEl(el)).toBeVisible();
      });

      it('should close the dropdown menu when moving the mouse outside the menu', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';
        cmp.trigger = 'hover';

        fixture.detectChanges();

        let dropdownEl = getDropdownEl(el);
        TestUtility.fireDomEvent(dropdownEl, 'mouseenter');

        let dropdownMenuEl = getDropdownMenuEl(el);
        expect(dropdownMenuEl).toBeVisible();

        TestUtility.fireDomEvent(dropdownEl, 'mouseleave');

        fixture.detectChanges();

        expect(dropdownMenuEl).not.toBeVisible();
      });

      it('should close the dropdown menu when clicking the button', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';
        cmp.trigger = 'hover';

        fixture.detectChanges();

        let dropdownEl = getDropdownEl(el);

        TestUtility.fireDomEvent(dropdownEl, 'mouseenter');

        let dropdownMenuEl = getDropdownMenuEl(el);
        expect(dropdownMenuEl).toBeVisible();

        let dropdownBtnEl = getDropdownBtnEl(el);
        dropdownBtnEl.click();

        fixture.detectChanges();

        expect(dropdownMenuEl).not.toBeVisible();
      });
    });

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
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);

        expect(dropdownBtnEl).toHaveText('');
        expect(dropdownBtnEl.querySelector('.sky-dropdown-caret')).toBeNull();
      });
    });

    describe('of other types', () => {
      it('should display an filter icon when that type is specified', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'filter';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);

        expect(dropdownBtnEl).toHaveText('');
        expect(dropdownBtnEl.querySelector('.fa-filter')).not.toBeNull();
      });
    });
});
