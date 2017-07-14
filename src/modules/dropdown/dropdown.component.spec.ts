import {
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { DropdownTestComponent } from './fixtures/dropdown.component.fixture';
import { DropdownParentTestComponent } from './fixtures/dropdown-parent.component.fixture';
import { SkyDropdownFixturesModule } from './fixtures/dropdown-fixtures.module';

import { TestUtility } from '../testing/testutility';
import { expect } from '../testing';

import { SkyWindowRefService } from '../window';

describe('Dropdown component', () => {

  function getDropdownEl(el: Element) {
    return <HTMLElement>el.querySelector('.sky-dropdown');
  }

  function getDropdownBtnEl(el: Element) {
    return <HTMLElement>el.querySelector('.sky-dropdown-button');
  }

  function getDropdownMenuEl(el: Element) {
    return <HTMLElement>el.querySelector('.sky-dropdown-menu');
  }

  describe('parent element tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyDropdownFixturesModule
        ]
      });
    });

    it('should close dropdown on scroll events', () => {

      let fixture = TestBed.createComponent(DropdownParentTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      fixture.detectChanges();

      let parent1El = fixture.debugElement.query(By.css('#parent-1'));

      let dropdown1BtnEl = el.querySelector('#dropdown-1 .sky-dropdown-button') as HTMLElement;

      dropdown1BtnEl.click();

      fixture.detectChanges();

      parent1El.triggerEventHandler('scroll', {});
      let dropdownMenu1 = el.querySelector('#dropdown-1 .sky-dropdown-menu') as HTMLElement;

      expect(dropdownMenu1).not.toBeVisible();
    });

    it('should close dropdown on window scroll', () => {

      let fixture = TestBed.createComponent(DropdownParentTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      fixture.detectChanges();

      let dropdown1BtnEl = el.querySelector('#dropdown-1 .sky-dropdown-button') as HTMLElement;

      dropdown1BtnEl.click();
      fixture.detectChanges();

      let dropdown3BtnEl = el.querySelector('#dropdown-3 .sky-dropdown-button') as HTMLElement;
      dropdown3BtnEl.click();
      fixture.detectChanges();

      let windowScrollEvt = document.createEvent('CustomEvent');
      windowScrollEvt.initEvent('scroll', false, false);

      window.dispatchEvent(windowScrollEvt);

      let dropdownMenu3 = el.querySelector('#dropdown-3 .sky-dropdown-menu') as HTMLElement;

      expect(dropdownMenu3).not.toBeVisible();
    });

     it('should close dropdown on multiple parent scroll', () => {

      let fixture = TestBed.createComponent(DropdownParentTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      fixture.detectChanges();

      let dropdown1BtnEl = el.querySelector('#dropdown-1 .sky-dropdown-button') as HTMLElement;

      dropdown1BtnEl.click();
      fixture.detectChanges();

      let windowScrollEvt = document.createEvent('CustomEvent');
      windowScrollEvt.initEvent('scroll', false, false);

      window.dispatchEvent(windowScrollEvt);

      let dropdownMenu1 = el.querySelector('#dropdown-1 .sky-dropdown-menu') as HTMLElement;

      expect(dropdownMenu1).not.toBeVisible();
    });

     it('should display default label when label not set', () => {

      let fixture = TestBed.createComponent(DropdownParentTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      fixture.detectChanges();

      let button = el.querySelector('#dropdown-1 .sky-dropdown-button') as HTMLButtonElement;
      let label = button.getAttribute('aria-label');

      expect(label).toBe('Context menu');
    });

     it('should display default label when label is set', () => {

      let fixture = TestBed.createComponent(DropdownParentTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      fixture.detectChanges();

      let button = el.querySelector('#dropdown-4 .sky-dropdown-button') as HTMLButtonElement;
      let label = button.getAttribute('aria-label');

      expect(label).toBe('test label');
    });
  });

  describe('postition tests', () => {

    class MockWindowService {

      public innerHeight: number = 100;
      public innerWidth: number = 500;
      public getWindow() {
        return {
          innerHeight: this.innerHeight,
          innerWidth: this.innerWidth,
          getComputedStyle(element: HTMLElement, obj: any) {
            return {
              overflowY: 'auto'
            };
          }
        };
      }
    }
    let mockWindowService = new MockWindowService();

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyDropdownFixturesModule
        ],
        providers: [
          {
            provide: SkyWindowRefService,
            useValue: mockWindowService
          }
        ]
      });
    });

    it('should display dropdown above when necessary', () => {

      mockWindowService.innerHeight = 100;
      mockWindowService.innerWidth = 500;

      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      el.style.position = 'absolute';
      el.style.top = '100px';

      fixture.detectChanges();
      let dropdownBtnEl = getDropdownBtnEl(el);

      dropdownBtnEl.click();

      fixture.detectChanges();

      let menuEl = el.querySelector('.sky-dropdown-menu') as HTMLElement;
      let topValue = menuEl.style.top;

      expect(parseInt(topValue, 10) < 100).toBe(true);
    });

    it('should display dropdown center when necessary', () => {

      mockWindowService.innerHeight = 40;
      mockWindowService.innerWidth = 100;

      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      el.style.position = 'absolute';
      el.style.top = '10px';
      el.style.left = '50px';
      let menuEl = el.querySelector('.sky-dropdown-menu') as HTMLElement;

      menuEl.style.width = '98px';

      fixture.detectChanges();
      let dropdownBtnEl = getDropdownBtnEl(el);

      dropdownBtnEl.click();

      fixture.detectChanges();

      let leftValue = menuEl.style.left;

      expect(parseInt(leftValue, 10) < 50).toBe(true);
    });

    it('should try the opposite alignment', () => {
      mockWindowService.innerHeight = 40;
      mockWindowService.innerWidth = 100;

      let fixture = TestBed.createComponent(DropdownTestComponent);
      fixture.componentInstance.alignment = 'right';
      let el: HTMLElement = fixture.nativeElement;

      el.style.position = 'absolute';
      el.style.top = '10px';
      el.style.left = '0px';
      el.style.width = '50px';
      let menuEl = el.querySelector('.sky-dropdown-menu') as HTMLElement;

      menuEl.style.width = '98px';

      fixture.detectChanges();
      let dropdownBtnEl = getDropdownBtnEl(el);

      dropdownBtnEl.click();

      fixture.detectChanges();

      let leftValue = menuEl.style.left;

      expect(leftValue).toBe('0px');
    });

    it('should fallback to position 10, 10 and take screen width when nothing else works', () => {
      mockWindowService.innerHeight = 30;
      mockWindowService.innerWidth = 100;

      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      el.style.position = 'absolute';
      el.style.top = '10px';
      el.style.left = '50px';

      let menuEl = el.querySelector('.sky-dropdown-menu') as HTMLElement;

      menuEl.style.width = '101px';

      fixture.detectChanges();
      let dropdownBtnEl = getDropdownBtnEl(el);

      dropdownBtnEl.click();

      fixture.detectChanges();

      let leftValue = menuEl.style.left;
      let topValue = menuEl.style.top;
      let width = menuEl.style.width;
      let height = menuEl.style.height;
      let maxWidth = menuEl.style.maxWidth;
      let maxHeight = menuEl.style.maxHeight;
      let overflowY = menuEl.style.overflowY;
      let overflowX = menuEl.style.overflowX;

      expect(parseInt(leftValue, 10)).toBe(10);
      expect(parseInt(topValue, 10)).toBe(10);
      expect(parseInt(width, 10)).toBe(80);
      expect(parseInt(height, 10)).toBe(10);
      expect(parseInt(maxWidth, 10)).toBe(80);
      expect(parseInt(maxHeight, 10)).toBe(10);
      expect(overflowY).toBe('auto');
      expect(overflowX).toBe('auto');

      expect(document.body).toHaveCssClass('sky-dropdown-no-scroll');
    });
  });

  describe('vanilla setup', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyDropdownFixturesModule
        ]
      });
    });

    it('should handle right alignment when width of menu is larger than trigger', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      fixture.componentInstance.alignment = 'right';
      el.style.position = 'absolute';
      el.style.left = '100px';

      fixture.detectChanges();

      let dropdownButton = getDropdownBtnEl(el);
      dropdownButton.click();
      fixture.detectChanges();

      let menuEl = getDropdownMenuEl(el);

      expect(parseInt(menuEl.style.left, 10) < 100).toBe(true);
    });

    it('should handle right alignment when width of menu is smaller than trigger', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      fixture.componentInstance.alignment = 'right';
      el.style.position = 'absolute';
      el.style.left = '100px';

      fixture.detectChanges();

      let dropdownButton = getDropdownBtnEl(el);

      dropdownButton.style.minWidth = '300px';
      dropdownButton.click();
      fixture.detectChanges();

      let menuEl = getDropdownMenuEl(el);

      expect(parseInt(menuEl.style.left, 10) > 100).toBe(true);
    });

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

   it('should have a default button background of "sky-btn-default"', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: Element = fixture.nativeElement;

      fixture.detectChanges();

      expect(getDropdownBtnEl(el)).toHaveCssClass('sky-btn-default');
    });

    it('should set the CSS class based on buttonStyle changes', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let cmp = fixture.componentInstance;
      let el: Element = fixture.nativeElement;

      cmp.buttonStyle = 'primary';

      fixture.detectChanges();

      expect(getDropdownBtnEl(el)).toHaveCssClass('sky-btn-primary');
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
});
