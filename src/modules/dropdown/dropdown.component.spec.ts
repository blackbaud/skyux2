import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect
} from '../testing';

import {
  SkyDropdownMessageType
} from './types';

import { SkyDropdownFixturesModule } from './fixtures/dropdown-fixtures.module';
import { DropdownTestComponent } from './fixtures/dropdown.component.fixture';

describe('Dropdown component', () => {
  const activeItemClass = 'sky-dropdown-item-active';
  let fixture: ComponentFixture<DropdownTestComponent>;

  const beforeEachCallback = () => {
    TestBed.configureTestingModule({
      imports: [
        SkyDropdownFixturesModule
      ]
    });

    fixture = TestBed.createComponent(DropdownTestComponent);
    fixture.detectChanges();
  };

  function dispatchKeyboardEvent(elem: HTMLElement, eventName: string, key: string) {
    const keyboardEvent: any = document.createEvent('CustomEvent');
    keyboardEvent.key = key;
    keyboardEvent.initEvent(eventName, true, true);
    elem.dispatchEvent(keyboardEvent);
  }

  // Simulates a click event on a button (which also registers the Enter key).
  function dispatchKeyboardButtonClickEvent(elem: HTMLElement) {
    dispatchKeyboardEvent(elem, 'keydown', 'enter');
    elem.click();
  }

  function verifyMenuVisibility(isVisible = true) {
    const popoverElem = getPopoverContainerElement();
    expect(isElementVisible(popoverElem)).toEqual(isVisible);
    expect(fixture.componentInstance.dropdown['isOpen']).toEqual(isVisible);
  }

  function verifyActiveMenuItemByIndex(index: number) {
    const menuItems = fixture.componentInstance.dropdown['menuComponent']['menuItems'].toArray();
    menuItems.forEach((item: any, i: number) => {
      if (i === index) {
        expect(menuItems[i].isActive).toEqual(true);
        expect(menuItems[i]['elementRef'].nativeElement.querySelector('.sky-dropdown-item'))
          .toHaveCssClass(activeItemClass);
      } else {
        expect(menuItems[i].isActive).toEqual(false);
        expect(menuItems[i]['elementRef'].nativeElement.querySelector('.sky-dropdown-item'))
          .not.toHaveCssClass(activeItemClass);
      }
    });
  }

  function verifyFocusedMenuItemByIndex(index: number, isFocused = true) {
    const menuItems = getDropdownItemElements();
    // expect(menuItems.item(index).classList.contains('sky-dropdown-item-focused')).toEqual(isFocused);
    expect(isElementFocused(menuItems.item(index).querySelector('button'))).toEqual(isFocused);
  }

  function verifyTriggerButtonHasFocus(hasFocus = true) {
    const buttonElem = getDropdownButtonElement();
    const buttonHasFocus = isElementFocused(buttonElem);
    expect(buttonHasFocus).toEqual(hasFocus);
  }

  // function getDropdownHostElement(elem: HTMLElement): HTMLElement {
  //   return elem.querySelector('sky-dropdown') as HTMLElement;
  // }

  function getDropdownButtonElement(): HTMLElement {
    return fixture.nativeElement.querySelector('.sky-dropdown-button') as HTMLElement;
  }

  function getPopoverContainerElement(): HTMLElement {
    return fixture.nativeElement.querySelector('.sky-popover-container') as HTMLElement;
  }

  function getDropdownItemElements(): NodeListOf<Element> {
    return getPopoverContainerElement().querySelectorAll('.sky-dropdown-item');
  }

  function isElementFocused(elem: Element): boolean {
    return (elem === document.activeElement);
  }

  function isElementVisible(elem: HTMLElement): boolean {
    return (getComputedStyle(elem).visibility !== 'hidden');
  }

  describe('basic setup', () => {
    beforeEach(() => beforeEachCallback());

    it('should have a default button type of "select"', () => {
      const buttonElem = getDropdownButtonElement();
      expect(buttonElem).toHaveCssClass('sky-dropdown-button-type-select');
      expect(buttonElem.innerText.trim()).toBe('Show dropdown');
      expect(buttonElem.querySelector('.sky-dropdown-caret')).not.toBeNull();
    });

    it('should set the correct button type CSS class', () => {
      const buttonElem = getDropdownButtonElement();
      fixture.componentInstance.buttonType = 'foobar';
      fixture.detectChanges();
      expect(buttonElem).toHaveCssClass('sky-dropdown-button-type-foobar');
      expect(buttonElem.innerText.trim()).toBe('');
      expect(buttonElem.querySelector('.sky-dropdown-caret')).toBeNull();
      expect(buttonElem.querySelector('.fa-foobar')).not.toBeNull();
    });

    it('should accept button type of "context-menu"', () => {
      fixture.componentInstance.buttonType = 'context-menu';
      fixture.detectChanges();
      const buttonElem = getDropdownButtonElement();
      expect(buttonElem).toHaveCssClass('sky-dropdown-button-type-context-menu');
      expect(buttonElem.innerText.trim()).toBe('');
      expect(buttonElem.querySelector('.sky-dropdown-caret')).toBeNull();
    });

    it('should have a default button background of "sky-btn-default"', () => {
      const buttonElem = getDropdownButtonElement();
      fixture.detectChanges();
      expect(buttonElem).toHaveCssClass('sky-btn-default');
    });

    it('should set the CSS class based on buttonStyle changes', () => {
      const buttonElem = getDropdownButtonElement();
      fixture.componentInstance.buttonStyle = 'primary';
      fixture.detectChanges();
      expect(buttonElem).toHaveCssClass('sky-btn-primary');
    });

    it('should set the correct title when specified', () => {
      const buttonElem = getDropdownButtonElement();
      fixture.componentInstance.title = 'Dropdown title';
      fixture.detectChanges();
      expect(buttonElem.getAttribute('title')).toBe('Dropdown title');
    });

    it('should display default label when label not set', () => {
      const buttonElem = getDropdownButtonElement();
      const label = buttonElem.getAttribute('aria-label');
      expect(label).toBe('Context menu');
    });

    it('should display label when label is set', () => {
      const buttonElem = getDropdownButtonElement();
      fixture.componentInstance.label = 'test label';
      fixture.detectChanges();
      const label = buttonElem.getAttribute('aria-label');
      expect(label).toBe('test label');
    });

    it('should map the trigger type to the popover trigger type', () => {
      fixture.componentInstance.trigger = 'hover';
      fixture.detectChanges();
      const popoverTriggerType = fixture.componentInstance.dropdown.getPopoverTriggerType();
      expect(popoverTriggerType).toEqual('mouseenter');
    });
  });

  describe('click interactions', () => {
    beforeEach(() => beforeEachCallback());

    it('should open the menu when clicking the trigger button', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();

      verifyMenuVisibility(false);

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();
    }));

    // it('should ignore subsequent calls to open if menu already open', fakeAsync(() => {
    //   const buttonElem = getDropdownButtonElement();
    //   const spy = spyOn(fixture.componentInstance.dropdown['popover'], 'positionNextTo').and.callThrough();

    //   verifyMenuVisibility(false);

    //   buttonElem.click();
    //   tick();
    //   fixture.detectChanges();
    //   tick();

    //   verifyMenuVisibility();
    //   expect(spy.calls.count()).toEqual(1);

    //   spy.calls.reset();
    //   fixture.componentInstance.dropdown.resetDropdownPosition();

    //   tick();
    //   fixture.detectChanges();
    //   tick();

    //   verifyMenuVisibility();
    //   expect(spy.calls.count()).toEqual(0);
    // }));

    it('should close the menu when clicked', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();
      const popoverElem = getPopoverContainerElement();

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      popoverElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(false);
    }));
  });

  describe('keyboard interactions', () => {
    beforeEach(() => beforeEachCallback());

    it('should close the dropdown and focus the trigger button after user presses the esc key', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();

      verifyMenuVisibility(false);

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      dispatchKeyboardEvent(buttonElem, 'keydown', 'escape');
      dispatchKeyboardEvent(buttonElem, 'keyup', 'escape');
      tick();
      fixture.detectChanges();
      tick();

      verifyTriggerButtonHasFocus();
      verifyMenuVisibility(false);
    }));

    it('should close the dropdown after user presses the tab key', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();

      verifyMenuVisibility(false);

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      dispatchKeyboardEvent(buttonElem, 'keydown', 'tab');
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(false);
      verifyTriggerButtonHasFocus(false);
    }));

    it('should navigate menu items with arrow keys', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();

      verifyMenuVisibility(false);

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      dispatchKeyboardEvent(buttonElem, 'keydown', 'arrowdown');
      tick();
      fixture.detectChanges();
      tick();

      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0);

      dispatchKeyboardEvent(buttonElem, 'keydown', 'arrowdown');
      tick();
      fixture.detectChanges();
      tick();

      // The second item is disabled, so it should be skipped!
      verifyActiveMenuItemByIndex(2);
      verifyFocusedMenuItemByIndex(2);

      dispatchKeyboardEvent(buttonElem, 'keydown', 'arrowup');
      tick();
      fixture.detectChanges();
      tick();

      // The second item is disabled, so it should be skipped!
      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0);

      // Navigation should loop from the last item to the first:
      dispatchKeyboardEvent(buttonElem, 'keydown', 'arrowdown');
      dispatchKeyboardEvent(buttonElem, 'keydown', 'arrowdown');
      dispatchKeyboardEvent(buttonElem, 'keydown', 'arrowdown');
      tick();
      fixture.detectChanges();
      tick();

      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0);

      dispatchKeyboardEvent(buttonElem, 'keydown', 'arrowup');
      tick();
      fixture.detectChanges();
      tick();

      verifyActiveMenuItemByIndex(3);
      verifyFocusedMenuItemByIndex(3);
    }));

    it('should focus the first item if opened with enter key', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();
      const spy = spyOn(fixture.componentInstance.dropdown['menuComponent'], 'focusFirstItem').and.callThrough();

      verifyMenuVisibility(false);

      dispatchKeyboardButtonClickEvent(buttonElem);
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      verifyMenuVisibility();
      expect((fixture.componentInstance.dropdown as any)['openedWithKeyboard']).toEqual(true);
      verifyActiveMenuItemByIndex(0);
      expect(spy).toHaveBeenCalled();
    }));

    it('should not focus the first item if it is disabled', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();
      fixture.componentInstance.setItems([
        { name: 'Foo', disabled: true },
        { name: 'Bar', disabled: false }
      ]);
      fixture.detectChanges();

      verifyMenuVisibility(false);

      const firstSpy = spyOn(fixture.componentInstance.dropdown['menuComponent']['menuItems'].first, 'focusElement').and.callThrough();
      const lastSpy = spyOn(fixture.componentInstance.dropdown['menuComponent']['menuItems'].last, 'focusElement').and.callThrough();

      dispatchKeyboardButtonClickEvent(buttonElem);
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      verifyMenuVisibility();
      expect(firstSpy).not.toHaveBeenCalled();
      expect(lastSpy).toHaveBeenCalled();
      verifyFocusedMenuItemByIndex(0, false);
    }));

    it('should handle focusing the first item when all items are disabled', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();
      fixture.componentInstance.setItems([
        { name: 'Foo', disabled: true }
      ]);
      fixture.detectChanges();

      verifyMenuVisibility(false);

      const firstSpy = spyOn(fixture.componentInstance.dropdown['menuComponent']['menuItems'].first, 'focusElement').and.callThrough();

      dispatchKeyboardButtonClickEvent(buttonElem);
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      verifyMenuVisibility();
      expect(firstSpy).not.toHaveBeenCalled();
    }));

    it('should handle focusing when no items are present', () => {
      fixture.componentInstance.setItems([]);
      fixture.detectChanges();
      const spy = spyOn(fixture.componentInstance.dropdown['menuComponent'] as any, 'focusItem').and.callThrough();
      fixture.componentInstance.dropdown['menuComponent']['focusActiveItem']();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should handle focusing when item does not include a button', fakeAsync(() => {
      fixture.componentInstance.setItems([
        { name: 'Foo', disabled: false }
      ]);

      const menuItemComponent = fixture.componentInstance.dropdown['menuComponent']['menuItems'].first;
      spyOn(menuItemComponent['elementRef'].nativeElement, 'querySelector').and.returnValue(undefined);

      fixture.detectChanges();
      menuItemComponent.ngAfterViewInit();
      tick();
      fixture.detectChanges();

      expect(menuItemComponent.isDisabled).toEqual(false);
    }));

    it('should return focus to the trigger button after making a selection with enter key', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();
      const popoverElem = getPopoverContainerElement();

      verifyMenuVisibility(false);

      dispatchKeyboardButtonClickEvent(buttonElem);
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      verifyMenuVisibility();
      verifyActiveMenuItemByIndex(0);

      const menuItemButton = popoverElem.querySelectorAll('button').item(0);
      dispatchKeyboardButtonClickEvent(menuItemButton);
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      verifyMenuVisibility(false);
      verifyTriggerButtonHasFocus();
    }));

    it('should handle other keydown events', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();

      verifyMenuVisibility(false);

      dispatchKeyboardEvent(buttonElem, 'keydown', 'a');
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(false);
    }));

    it('should allow disabling of native focus', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();
      fixture.componentInstance.dropdown['menuComponent'].useNativeFocus = false;
      fixture.detectChanges();

      verifyMenuVisibility(false);

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      const itemComponent = fixture.componentInstance.dropdown['menuComponent']['menuItems'].first;
      const focusSpy = spyOn(itemComponent['buttonElement'], 'focus');

      dispatchKeyboardEvent(buttonElem, 'keydown', 'arrowdown');
      tick();
      fixture.detectChanges();
      tick();

      expect(focusSpy).not.toHaveBeenCalled();
      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0, false);
    }));
  });

  describe('message stream', () => {
    beforeEach(() => beforeEachCallback());

    it('should allow opening and closing the menu', fakeAsync(() => {
      const component = fixture.componentInstance;

      component.sendMessage(SkyDropdownMessageType.Open);
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      component.sendMessage(SkyDropdownMessageType.Close);
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(false);
    }));

    it('should allow navigating the menu', fakeAsync(() => {
      const component = fixture.componentInstance;

      component.sendMessage(SkyDropdownMessageType.Open);
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      component.sendMessage(SkyDropdownMessageType.FocusNextItem);
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0);

      component.sendMessage(SkyDropdownMessageType.FocusPreviousItem);
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      verifyActiveMenuItemByIndex(3);
      verifyFocusedMenuItemByIndex(3);
    }));

    it('should disable navigation if all items are disabled', fakeAsync(() => {
      const component = fixture.componentInstance;

      fixture.componentInstance.setItems([
        { name: 'Foo', disabled: true }
      ]);
      fixture.detectChanges();

      component.sendMessage(SkyDropdownMessageType.Open);
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      component.sendMessage(SkyDropdownMessageType.FocusNextItem);
      tick();
      fixture.detectChanges();
      tick();

      verifyFocusedMenuItemByIndex(0, false);

      component.sendMessage(SkyDropdownMessageType.FocusPreviousItem);
      tick();
      fixture.detectChanges();
      tick();

      verifyFocusedMenuItemByIndex(0, false);
    }));

    it('should allow focusing trigger button', fakeAsync(() => {
      fixture.componentInstance.sendMessage(SkyDropdownMessageType.FocusTriggerButton);

      tick();
      fixture.detectChanges();
      tick();

      verifyTriggerButtonHasFocus();
    }));

    it('should handle undefined stream', fakeAsync(() => {
      const spy = spyOn(fixture.componentInstance.dropdownController, 'takeUntil').and.callThrough();
      fixture.componentInstance.dropdownController = undefined;
      fixture.detectChanges();
      fixture.componentInstance.dropdown.ngOnInit();
      expect(spy).not.toHaveBeenCalled();
    }));
  });

  describe('menu changes', () => {
    beforeEach(() => beforeEachCallback());

    it('should reposition the menu when number of menu items change', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();
      const spy = spyOn(fixture.componentInstance.dropdown, 'resetDropdownPosition').and.callThrough();

      verifyMenuVisibility(false);

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();
      expect(getDropdownItemElements().length).toEqual(4);

      fixture.componentInstance.changeItems();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(getDropdownItemElements().length).toEqual(3);
      expect(spy).toHaveBeenCalled();
    }));
  });
});
