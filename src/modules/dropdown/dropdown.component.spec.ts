import {
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  expect,
  TestUtility
} from '../testing';

import {
  SkyWindowRefService
} from '../window';

import { DropdownTestComponent } from './fixtures/dropdown.component.fixture';
import { DropdownParentTestComponent } from './fixtures/dropdown-parent.component.fixture';
import { SkyDropdownFixturesModule } from './fixtures/dropdown-fixtures.module';
import { SkyDropdownMessageType } from './types';

describe('Dropdown component', () => {
  function getDropdownHostEl(el: Element) {
    return <HTMLElement>el.querySelector('sky-dropdown');
  }

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

      let dropdown3BtnEl = el.querySelector('#dropdown-2 .sky-dropdown-button') as HTMLElement;
      dropdown3BtnEl.click();
      fixture.detectChanges();

      let windowScrollEvt = document.createEvent('CustomEvent');
      windowScrollEvt.initEvent('scroll', false, false);
      window.dispatchEvent(windowScrollEvt);

      let dropdownMenu3 = el.querySelector('#dropdown-2 .sky-dropdown-menu') as HTMLElement;

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

    it('should display label when label is set', () => {
      let fixture = TestBed.createComponent(DropdownParentTestComponent);
      let el: HTMLElement = fixture.nativeElement;

      fixture.detectChanges();

      let button = el.querySelector('#dropdown-3 .sky-dropdown-button') as HTMLButtonElement;
      let label = button.getAttribute('aria-label');

      expect(label).toBe('test label');
    });
  });

  describe('message stream', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyDropdownFixturesModule
        ]
      });
    });

    it('should not call the open method if it is already open', fakeAsync(() => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const component = fixture.componentInstance;
      const el = fixture.nativeElement;

      fixture.detectChanges();

      const menuEl = el.querySelector('#dropdown-4 .sky-dropdown-menu') as HTMLElement;
      const remoteDropdown: any = component.remoteDropdown;
      const spy = spyOn(remoteDropdown['adapterService'], 'showDropdown').and.callThrough();

      component.sendMessage(SkyDropdownMessageType.Open);

      tick();
      fixture.detectChanges();
      expect(menuEl).toBeVisible();

      component.sendMessage(SkyDropdownMessageType.Open);

      tick();
      fixture.detectChanges();
      expect(menuEl).toBeVisible();
      expect(spy.calls.count()).toEqual(1);
    }));

    it('should allow opening and closing the menu', fakeAsync(() => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const component = fixture.componentInstance;
      const el = fixture.nativeElement;

      fixture.detectChanges();

      const menuEl = el.querySelector('#dropdown-4 .sky-dropdown-menu') as HTMLElement;

      component.sendMessage(SkyDropdownMessageType.Open);

      tick();
      fixture.detectChanges();
      expect(menuEl).toBeVisible();

      component.sendMessage(SkyDropdownMessageType.Close);

      tick();
      fixture.detectChanges();
      expect(menuEl).not.toBeVisible();
    }));

    it('should allow navigating the menu', fakeAsync(() => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const component = fixture.componentInstance;
      const el = fixture.nativeElement;

      fixture.detectChanges();

      const menuEl = el.querySelector('#dropdown-4 .sky-dropdown-menu') as HTMLElement;
      const menuItems = menuEl.querySelectorAll('.sky-dropdown-item');

      component.sendMessage(SkyDropdownMessageType.Open);

      tick();
      fixture.detectChanges();
      expect(menuEl).toBeVisible();

      component.sendMessage(SkyDropdownMessageType.FocusNextItem);

      tick();
      fixture.detectChanges();
      expect(menuItems[0]).toHaveCssClass('sky-dropdown-item-active');

      component.sendMessage(SkyDropdownMessageType.FocusPreviousItem);

      tick();
      fixture.detectChanges();
      expect(menuItems[2]).toHaveCssClass('sky-dropdown-item-active');
    }));

    it('should allow focusing trigger button', fakeAsync(() => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const component = fixture.componentInstance;
      const el = fixture.nativeElement;

      fixture.detectChanges();

      const buttonEl = el.querySelector('#dropdown-4 .sky-dropdown-button') as HTMLElement;

      component.sendMessage(SkyDropdownMessageType.FocusTriggerButton);

      tick();
      fixture.detectChanges();
      expect(buttonEl).toHaveCssClass('sky-btn-focus');
    }));
  });

  describe('position tests', () => {
    class MockWindowService {
      public innerHeight = 100;
      public innerWidth = 500;
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

    let mockWindowService: MockWindowService;

    beforeEach(() => {
      mockWindowService = new MockWindowService();

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

      it('should not close the dropdown menu when clicking inside menu', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownEl = getDropdownHostEl(el);
        TestUtility.fireDomEvent(dropdownEl, 'mouseenter');

        let dropdownBtnEl = getDropdownBtnEl(el);

        dropdownBtnEl.click();

        let dropdownMenuEl = getDropdownMenuEl(el);
        expect(dropdownMenuEl).toBeVisible();

        TestUtility.fireDomEvent(document, 'click');
        TestUtility.fireDomEvent(dropdownEl, 'mouseleave');

        fixture.detectChanges();

        expect(dropdownMenuEl).toBeVisible();
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

      it('should close the dropdown menu when clicking the menu', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownBtnEl = getDropdownBtnEl(el);
        dropdownBtnEl.click();

        let dropdownMenuEl = getDropdownMenuEl(el);
        expect(dropdownMenuEl).toBeVisible();

        dropdownMenuEl.click();

        fixture.detectChanges();

        expect(dropdownMenuEl).not.toBeVisible();
      });

      it('should not open the dropdown menu when the mouse enters the dropdown button', () => {
        let fixture = TestBed.createComponent(DropdownTestComponent);
        let cmp = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.buttonType = 'context-menu';

        fixture.detectChanges();

        let dropdownEl = getDropdownHostEl(el);
        TestUtility.fireDomEvent(dropdownEl, 'mouseenter');

        fixture.detectChanges();

        expect(getDropdownMenuEl(el)).not.toBeVisible();
      });

      it('should not close the dropdown menu when moving the mouse outside the menu', () => {
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

        let dropdownEl = getDropdownHostEl(el);
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

        let dropdownEl = getDropdownHostEl(el);
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

        let dropdownEl = getDropdownHostEl(el);

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

  describe('keyboard interactions', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyDropdownFixturesModule
        ]
      });
    });

    it('should add a focus css class to the trigger button when focused', () => {
      let fixture = TestBed.createComponent(DropdownParentTestComponent);
      let el = fixture.nativeElement.querySelector('#dropdown-4');

      fixture.detectChanges();

      let dropdownBtnEl = getDropdownBtnEl(el);
      TestUtility.fireDomEvent(dropdownBtnEl, 'focus');
      fixture.detectChanges();
      expect(dropdownBtnEl).toHaveCssClass('sky-btn-focus');
      TestUtility.fireDomEvent(dropdownBtnEl, 'blur');
    });

    it('should close the dropdown and focus the trigger button after user presses the esc key', () => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const el = fixture.nativeElement.querySelector('#dropdown-4');

      fixture.detectChanges();

      const hostEl = getDropdownHostEl(el);
      const dropdownBtnEl = getDropdownBtnEl(el);
      const dropdownMenuEl = getDropdownMenuEl(el);

      dropdownBtnEl.click();
      expect(dropdownMenuEl).toBeVisible();

      const keyboardEvent: any = document.createEvent('CustomEvent');
      keyboardEvent.key = 'escape';
      keyboardEvent.initEvent('keydown', true, true);
      hostEl.dispatchEvent(keyboardEvent);

      fixture.detectChanges();

      expect(dropdownMenuEl).not.toBeVisible();
      expect(dropdownBtnEl).toHaveCssClass('sky-btn-focus');
    });

    it('should close the dropdown after user presses the tab key', () => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const el = fixture.nativeElement.querySelector('#dropdown-4');

      fixture.detectChanges();

      const hostEl = getDropdownHostEl(el);
      const dropdownBtnEl = getDropdownBtnEl(el);
      const dropdownMenuEl = getDropdownMenuEl(el);

      dropdownBtnEl.click();
      expect(dropdownMenuEl).toBeVisible();

      const keyboardEvent: any = document.createEvent('CustomEvent');
      keyboardEvent.key = 'tab';
      keyboardEvent.initEvent('keydown', true, true);
      hostEl.dispatchEvent(keyboardEvent);

      fixture.detectChanges();

      expect(dropdownMenuEl).not.toBeVisible();
      expect(dropdownBtnEl).not.toHaveCssClass('sky-btn-focus');
    });

    it('should toggle the dropdown with the enter key', fakeAsync(() => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const el = fixture.nativeElement.querySelector('#dropdown-4');

      fixture.detectChanges();

      let keyboardEvent: any = document.createEvent('CustomEvent');
      keyboardEvent.key = 'enter';
      keyboardEvent.initEvent('keydown', true, true);

      const hostEl = getDropdownHostEl(el);
      const dropdownBtnEl = getDropdownBtnEl(el);
      const dropdownMenuEl = getDropdownMenuEl(el);

      hostEl.dispatchEvent(keyboardEvent);
      fixture.detectChanges();

      expect(dropdownMenuEl).toBeVisible();

      dropdownMenuEl.dispatchEvent(keyboardEvent);
      dropdownMenuEl.click();

      tick();
      fixture.detectChanges();

      expect(dropdownMenuEl).not.toBeVisible();
      expect(dropdownBtnEl).toHaveCssClass('sky-btn-focus');
    }));

    it('should navigate items with arrow keys', () => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const el = fixture.nativeElement.querySelector('#dropdown-4');

      fixture.detectChanges();

      const hostEl = getDropdownHostEl(el);
      const dropdownBtnEl = getDropdownBtnEl(el);
      const dropdownMenuEl = getDropdownMenuEl(el);

      dropdownBtnEl.click();
      expect(dropdownMenuEl).toBeVisible();

      const keyboardEvent: any = document.createEvent('CustomEvent');
      keyboardEvent.key = 'arrowdown';
      keyboardEvent.initEvent('keydown', true, true);
      hostEl.dispatchEvent(keyboardEvent);
      fixture.detectChanges();

      const menuItems = dropdownMenuEl.querySelectorAll('.sky-dropdown-item');

      expect(menuItems[0]).toHaveCssClass('sky-dropdown-item-active');

      keyboardEvent.key = 'arrowup';
      hostEl.dispatchEvent(keyboardEvent);
      fixture.detectChanges();

      expect(menuItems[2]).toHaveCssClass('sky-dropdown-item-active');

      hostEl.dispatchEvent(keyboardEvent);
      fixture.detectChanges();

      expect(menuItems[1]).toHaveCssClass('sky-dropdown-item-active');

      keyboardEvent.key = 'arrowdown';
      hostEl.dispatchEvent(keyboardEvent);
      hostEl.dispatchEvent(keyboardEvent);
      fixture.detectChanges();

      expect(menuItems[0]).toHaveCssClass('sky-dropdown-item-active');
    });

    it('should handle all other key presses', () => {
      const fixture = TestBed.createComponent(DropdownParentTestComponent);
      const el = fixture.nativeElement.querySelector('#dropdown-4');

      fixture.detectChanges();

      const hostEl = getDropdownHostEl(el);
      const dropdownBtnEl = getDropdownBtnEl(el);
      const dropdownMenuEl = getDropdownMenuEl(el);

      const keyboardEvent: any = document.createEvent('CustomEvent');
      keyboardEvent.key = 'shift';
      keyboardEvent.initEvent('keydown', true, true);
      hostEl.dispatchEvent(keyboardEvent);

      fixture.detectChanges();

      // Nothing should happen if the dropdown isn't open:
      expect(dropdownMenuEl).not.toBeVisible();
      expect(dropdownBtnEl).not.toHaveCssClass('sky-btn-focus');

      dropdownBtnEl.click();
      fixture.detectChanges();
      expect(dropdownMenuEl).toBeVisible();

      // Now that the dropdown is open, unhandled keypresses shouldn't close it:
      hostEl.dispatchEvent(keyboardEvent);
      fixture.detectChanges();
      expect(dropdownMenuEl).toBeVisible();
    });
  });
});
