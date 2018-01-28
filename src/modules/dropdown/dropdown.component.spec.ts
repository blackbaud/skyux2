import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect,
  TestUtility
} from '../testing';

import {
  SkyDropdownMessageType
} from './types';

import { SkyDropdownFixturesModule } from './fixtures/dropdown-fixtures.module';
import { DropdownTestComponent } from './fixtures/dropdown.component.fixture';

describe('Dropdown component', () => {
  const activeItemClass = 'sky-dropdown-item-active';
  let fixture: ComponentFixture<DropdownTestComponent>;
  let component: DropdownTestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyDropdownFixturesModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTestComponent);
    component = fixture.componentInstance;
  });

  function openPopoverWithButtonClick() {
    tick();
    fixture.detectChanges();

    const buttonElem = getDropdownButtonElement();

    verifyMenuVisibility(false);

    buttonElem.click();
    tick();
    fixture.detectChanges();
    tick();

    verifyMenuVisibility();
  }

  // Simulates a click event on a button (which also registers the Enter key).
  function dispatchKeyboardButtonClickEvent(elem: HTMLElement) {
    TestUtility.fireKeyboardEvent(elem, 'keydown', { key: 'Enter' });
    elem.click();
  }

  function verifyMenuVisibility(isVisible = true) {
    const popoverElem = getPopoverContainerElement();
    expect(isElementVisible(popoverElem)).toEqual(isVisible);
    expect(component.dropdown['isOpen']).toEqual(isVisible);
  }

  function verifyActiveMenuItemByIndex(index: number) {
    const menuItems = component.dropdown['menuComponent']['menuItems'].toArray();

    menuItems.forEach((item: any, i: number) => {
      if (i === index) {
        expect(menuItems[i].isActive).toEqual(true);
        expect(menuItems[i].elementRef.nativeElement.querySelector('.sky-dropdown-item'))
          .toHaveCssClass(activeItemClass);
      } else {
        expect(menuItems[i].isActive).toEqual(false);
        expect(menuItems[i].elementRef.nativeElement.querySelector('.sky-dropdown-item'))
          .not.toHaveCssClass(activeItemClass);
      }
    });
  }

  function verifyFocusedMenuItemByIndex(index: number, isFocused = true) {
    const menuItems = getDropdownItemElements();
    expect(isElementFocused(menuItems.item(index).querySelector('button'))).toEqual(isFocused);
  }

  function verifyTriggerButtonHasFocus(hasFocus = true) {
    const buttonElem = getDropdownButtonElement();
    const buttonHasFocus = isElementFocused(buttonElem);
    expect(buttonHasFocus).toEqual(hasFocus);
  }

  function getDropdownHostElement(): HTMLElement {
    return fixture.nativeElement.querySelector('sky-dropdown') as HTMLElement;
  }

  function getDropdownMenuHostElement(): HTMLElement {
    return fixture.nativeElement.querySelector('sky-dropdown-menu') as HTMLElement;
  }

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
    it('should have a default button type of "select"', () => {
      fixture.detectChanges();
      const buttonElem = getDropdownButtonElement();
      expect(buttonElem).toHaveCssClass('sky-dropdown-button-type-select');
      expect(buttonElem.innerText.trim()).toBe('Show dropdown');
      expect(buttonElem.querySelector('.sky-dropdown-caret')).not.toBeNull();
    });

    it('should set the correct button type CSS class', () => {
      const buttonElem = getDropdownButtonElement();
      component.buttonType = 'foobar';
      fixture.detectChanges();
      expect(buttonElem).toHaveCssClass('sky-dropdown-button-type-foobar');
      expect(buttonElem.innerText.trim()).toBe('');
      expect(buttonElem.querySelector('.sky-dropdown-caret')).toBeNull();
      expect(buttonElem.querySelector('.fa-foobar')).not.toBeNull();
    });

    it('should accept button type of "context-menu"', () => {
      component.buttonType = 'context-menu';
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
      component.buttonStyle = 'primary';
      fixture.detectChanges();
      expect(buttonElem).toHaveCssClass('sky-btn-primary');
    });

    it('should set the correct title when specified', () => {
      const buttonElem = getDropdownButtonElement();
      component.title = 'Dropdown title';
      fixture.detectChanges();
      expect(buttonElem.getAttribute('title')).toBe('Dropdown title');
    });

    it('should display default label when label not set', () => {
      fixture.detectChanges();
      const buttonElem = getDropdownButtonElement();
      const label = buttonElem.getAttribute('aria-label');
      expect(label).toBe('Context menu');
    });

    it('should display label when label is set', () => {
      const buttonElem = getDropdownButtonElement();
      component.label = 'test label';
      fixture.detectChanges();
      const label = buttonElem.getAttribute('aria-label');
      expect(label).toBe('test label');
    });

    it('should map the trigger type to the popover trigger type', () => {
      component.trigger = 'hover';
      fixture.detectChanges();
      const popoverTriggerType = component.dropdown.getPopoverTriggerType();
      expect(popoverTriggerType).toEqual('mouseenter');
    });
  });

  describe('click interactions', () => {
    it('should open the menu when clicking the trigger button', fakeAsync(() => {
      openPopoverWithButtonClick();
    }));
  });

  describe('keyboard interactions', () => {
    it('should close the dropdown and focus the trigger button after user presses the esc key', fakeAsync(() => {
      openPopoverWithButtonClick();

      const popoverElem = getPopoverContainerElement();

      TestUtility.fireKeyboardEvent(popoverElem, 'keydown', { key: 'Escape' });
      TestUtility.fireKeyboardEvent(popoverElem, 'keyup', { key: 'Escape' });
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(false);
      verifyTriggerButtonHasFocus();
    }));

    it('should close the dropdown after menu loses focus', fakeAsync(() => {
      openPopoverWithButtonClick();

      const dropdownHost = getDropdownHostElement();
      const dropdownItems = dropdownHost.querySelectorAll('.sky-dropdown-item');
      const firstItem = dropdownItems.item(0);

      // Should not close the dropdown if focus remains in dropdown.
      TestUtility.fireKeyboardEvent(firstItem.querySelector('button'), 'focusin');
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(true);

      TestUtility.fireKeyboardEvent(component.outsideButton.nativeElement, 'focusin');
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(false);
      verifyTriggerButtonHasFocus(false);
    }));

    it('should open menu if arrow down is pressed', fakeAsync(() => {
      tick();
      fixture.detectChanges();

      const hostElem = getDropdownHostElement();

      verifyMenuVisibility(false);

      TestUtility.fireKeyboardEvent(hostElem, 'keydown', { key: 'arrowdown' });
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();
    }));

    it('should navigate menu items with arrow keys', fakeAsync(() => {
      openPopoverWithButtonClick();

      const hostElem = getDropdownMenuHostElement();

      TestUtility.fireKeyboardEvent(hostElem, 'keydown', { key: 'arrowdown' });
      tick();
      fixture.detectChanges();
      tick();

      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0);

      TestUtility.fireKeyboardEvent(hostElem, 'keydown', { key: 'arrowdown' });
      tick();
      fixture.detectChanges();
      tick();

      // The second item is disabled, so it should be skipped!
      verifyActiveMenuItemByIndex(2);
      verifyFocusedMenuItemByIndex(2);

      TestUtility.fireKeyboardEvent(hostElem, 'keydown', { key: 'arrowup' });
      tick();
      fixture.detectChanges();
      tick();

      // The second item is disabled, so it should be skipped!
      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0);

      // Navigation should loop from the last item to the first:
      TestUtility.fireKeyboardEvent(hostElem, 'keydown', { key: 'arrowdown' });
      TestUtility.fireKeyboardEvent(hostElem, 'keydown', { key: 'arrowdown' });
      TestUtility.fireKeyboardEvent(hostElem, 'keydown', { key: 'arrowdown' });
      tick();
      fixture.detectChanges();
      tick();

      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0);

      TestUtility.fireKeyboardEvent(hostElem, 'keydown', { key: 'arrowup' });
      tick();
      fixture.detectChanges();
      tick();

      verifyActiveMenuItemByIndex(3);
      verifyFocusedMenuItemByIndex(3);
    }));

    it('should focus the first item if opened with enter key', fakeAsync(() => {
      tick();
      fixture.detectChanges();

      const buttonElem = getDropdownButtonElement();
      const spy = spyOn(component.dropdown['menuComponent'], 'focusFirstItem').and.callThrough();

      verifyMenuVisibility(false);

      dispatchKeyboardButtonClickEvent(buttonElem);
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      verifyMenuVisibility();
      verifyActiveMenuItemByIndex(0);
      expect(spy).toHaveBeenCalled();
    }));

    it('should not focus the first item if it is disabled', fakeAsync(() => {
      tick();
      fixture.detectChanges();

      const buttonElem = getDropdownButtonElement();
      component.setItems([
        { name: 'Foo', disabled: true },
        { name: 'Bar', disabled: false }
      ]);
      fixture.detectChanges();

      verifyMenuVisibility(false);

      const firstSpy = spyOn(component.dropdown['menuComponent']['menuItems'].first, 'focusElement').and.callThrough();
      const lastSpy = spyOn(component.dropdown['menuComponent']['menuItems'].last, 'focusElement').and.callThrough();

      dispatchKeyboardButtonClickEvent(buttonElem);
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();
      expect(firstSpy).not.toHaveBeenCalled();
      expect(lastSpy).toHaveBeenCalled();
      verifyFocusedMenuItemByIndex(0, false);
    }));

    it('should handle focusing the first item when all items are disabled', fakeAsync(() => {
      const buttonElem = getDropdownButtonElement();
      component.setItems([
        { name: 'Foo', disabled: true }
      ]);
      fixture.detectChanges();

      verifyMenuVisibility(false);

      const firstSpy = spyOn(component.dropdown['menuComponent']['menuItems'].first, 'focusElement').and.callThrough();

      dispatchKeyboardButtonClickEvent(buttonElem);
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();
      expect(firstSpy).not.toHaveBeenCalled();
    }));

    it('should handle focusing when item does not include a button', fakeAsync(() => {
      component.setItems([
        { name: 'Foo', disabled: false }
      ]);

      const menuItemComponent = component.dropdown['menuComponent']['menuItems'].first;
      spyOn(menuItemComponent.elementRef.nativeElement, 'querySelector').and.returnValue(undefined);

      fixture.detectChanges();
      menuItemComponent.ngAfterViewInit();
      tick();
      fixture.detectChanges();

      expect(menuItemComponent.isDisabled).toEqual(true);
    }));

    it('should return focus to the trigger button after making a selection with enter key', fakeAsync(() => {
      tick();
      fixture.detectChanges();

      const buttonElem = getDropdownButtonElement();
      const popoverElem = getPopoverContainerElement();

      verifyMenuVisibility(false);

      dispatchKeyboardButtonClickEvent(buttonElem);
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      const menuItemButton = popoverElem.querySelectorAll('button').item(0);
      dispatchKeyboardButtonClickEvent(menuItemButton);
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(false);
      verifyTriggerButtonHasFocus();
    }));

    it('should handle other keydown events', fakeAsync(() => {
      tick();
      fixture.detectChanges();

      const buttonElem = getDropdownButtonElement();

      verifyMenuVisibility(false);

      TestUtility.fireKeyboardEvent(buttonElem, 'keydown', { key: 'a' });
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility(false);
    }));

    it('should allow disabling of native focus', fakeAsync(() => {
      tick();
      fixture.detectChanges();

      const buttonElem = getDropdownButtonElement();
      component.dropdown['menuComponent'].useNativeFocus = false;
      fixture.detectChanges();

      verifyMenuVisibility(false);

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();

      const itemComponent = component.dropdown['menuComponent']['menuItems'].first;
      const focusSpy = spyOn(itemComponent['buttonElement'], 'focus');

      TestUtility.fireKeyboardEvent(buttonElem, 'keydown', { key: 'arrowdown' });
      tick();
      fixture.detectChanges();
      tick();

      expect(focusSpy).not.toHaveBeenCalled();
      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0, false);
    }));
  });

  describe('message stream', () => {
    it('should allow opening and closing the menu', fakeAsync(() => {
      tick();
      fixture.detectChanges();

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
      tick();
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

      verifyActiveMenuItemByIndex(0);
      verifyFocusedMenuItemByIndex(0);

      component.sendMessage(SkyDropdownMessageType.FocusPreviousItem);
      tick();
      fixture.detectChanges();
      tick();

      verifyActiveMenuItemByIndex(3);
      verifyFocusedMenuItemByIndex(3);
    }));

    it('should disable navigation if all items are disabled', fakeAsync(() => {
      component.setItems([
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
      tick();
      fixture.detectChanges();

      component.sendMessage(SkyDropdownMessageType.FocusTriggerButton);

      tick();
      fixture.detectChanges();
      tick();

      verifyTriggerButtonHasFocus();
    }));
  });

  describe('menu changes', () => {
    it('should reposition the menu when number of menu items change', fakeAsync(() => {
      tick();
      fixture.detectChanges();

      const buttonElem = getDropdownButtonElement();
      const spy = spyOn(component.dropdown.messageStream, 'next').and.callThrough();

      verifyMenuVisibility(false);

      buttonElem.click();
      tick();
      fixture.detectChanges();
      tick();

      verifyMenuVisibility();
      expect(getDropdownItemElements().length).toEqual(4);

      component.changeItems();
      tick();
      fixture.detectChanges();
      tick();

      expect(getDropdownItemElements().length).toEqual(3);
      expect(spy).toHaveBeenCalledWith({
        type: SkyDropdownMessageType.Reposition
      });
    }));
  });
});
