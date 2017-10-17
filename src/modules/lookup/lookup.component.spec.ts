import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { expect } from '../testing';
import { SkyLookupModule } from './lookup.module';
import { SkyLookupSelectionChange } from './lookup.component';

import { LookupTestComponent } from './fixtures/lookup.component.fixture';
import { LookupMenuTemplateTestComponent } from './fixtures/lookup.menu.template.component.fixture';

enum Key {
  Backspace = 8,
  Enter = 13,
  Escape = 27,
  Up = 38,
  Down = 40
}

function _setInput(element: DebugElement, fixture: ComponentFixture<any>, text: string) {
  let inputEvent = document.createEvent('Event');
  let params = {
    bubbles: false,
    cancelable: false
  };
  inputEvent.initEvent('input', params.bubbles, params.cancelable);

  let changeEvent = document.createEvent('Event');
  changeEvent.initEvent('change', params.bubbles, params.cancelable);
  let inputEl = element.query(By.css('input'));
  inputEl.nativeElement.value = text;

  inputEl.nativeElement.dispatchEvent(inputEvent);
  fixture.detectChanges();

  inputEl.nativeElement.dispatchEvent(changeEvent);
  fixture.detectChanges();
}

describe('Lookup component', () => {
  let fixture: ComponentFixture<LookupTestComponent>;
  let nativeElement: HTMLElement;
  let component: LookupTestComponent;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LookupTestComponent
      ],
      imports: [
        SkyLookupModule
      ]
    });

    fixture = TestBed.createComponent(LookupTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    element = fixture.debugElement as DebugElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  function setInput(text: string) {
    _setInput(element, fixture, text);
  }

  function triggerInputKeyDown(key: Key) {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('keydown', {
      which: key,
      preventDefault: () => {}
    });
    fixture.detectChanges();
  }

  function triggerInputKeyUp(key: Key) {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('keyup', { which: key});
    fixture.detectChanges();
  }

  function triggerClearButton() {
    let clearEl = element.query(By.css('.sky-lookup-btn-clear'));
    clearEl.triggerEventHandler('click', undefined);
    fixture.detectChanges();
  }

  function triggerClickWindow() {
    document.body.click();
    fixture.detectChanges();
  }

  function triggerFocus() {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('focus', {});
    fixture.detectChanges();
  }

  function triggerBlur() {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('blur', {});
    fixture.detectChanges();
  }

  describe('standard lookup', () => {
    beforeEach(() => {
      component.multiple = false;
      component.lastSelectionChange = undefined;
    });

  it('should provide a selection change event object', () => {
    let e = new SkyLookupSelectionChange();
    expect(e.added).toBe(undefined);
    expect(e.removed).toBe(undefined);
    expect(e.result).toBe(undefined);
  });

  it('should override default placeholder text when placeholder text is provided', () => {
    fixture.detectChanges();
    component.placeholderText = 'hey ya';
    fixture.detectChanges();
    expect(element.query(By.css('input')).attributes.placeholder).toBe('hey ya');
  });

  it('should set search text on keyup when it does not match internal tracked state', () => {
    fixture.detectChanges();
    component.lookupComponent.keyup(<KeyboardEvent>{}, 'test');
    expect(component.lookupComponent.searchText).toBe('test');
  });

  it('should ignore remove selected item if the item is not currently selected', () => {
    component.data = [
      { name: 'Red' }
    ];
    component.selectedItems = [component.data[0]];
    fixture.detectChanges();

    component.lookupComponent.removeSelectedItem({});
    expect(component.selectedItems[0]).toBe(component.data[0]);
    expect(component.lastSelectionChange).toBe(undefined);
  });

  it('should apply the correct focus class', () => {
    fixture.detectChanges();
    triggerFocus();
    let css = '.sky-lookup-input-container.sky-input-group'
      + '.sky-dropdown-button.sky-lookup-input-focused';

    let containerEl = element.query(By.css(css));
    expect(containerEl).not.toBeNull();
    triggerBlur();
    containerEl = element.query(By.css(css));
    expect(containerEl).toBeNull();

    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  });

  it('should not perform a search when focus gained or lost when the search field is empty', () => {
    fixture.detectChanges();
    triggerFocus();
    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('');
    triggerBlur();
    expect(inputEl.nativeElement.value).toBe('');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  });

  it('should not perform a search when focus lost when the search field matches selection',
  fakeAsync(() => {
    component.data = [
      { name: 'Ruby' },
      { name: 'Red' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    triggerFocus();
    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('Red');

    triggerBlur();
    tick();

    expect(inputEl.nativeElement.value).toBe('Red');
    expect(component.lastSelectionChange).toBe(undefined);
  }));

  it('should gracefully handle undefined data and selectedItems properties',
  fakeAsync(() => {
    component.data = undefined;
    component.selectedItems = undefined;
    fixture.detectChanges();
    tick();

    setInput('red');
    tick();

    triggerBlur();
    tick();
    expect(element.query(By.css('input')).nativeElement.value).toBe('');
    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  }));

  it('should clear when focus is lost when the search critera matches no item (blur)',
  fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('abc');
    expect(inputEl.nativeElement.value).toBe('abc');
    tick();

    triggerBlur();
    tick();

    expect(inputEl.nativeElement.value).toBe('');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  }));

  it('should not clear when focus is lost to a menu item (blur)',
  fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('abc');
    expect(inputEl.nativeElement.value).toBe('abc');
    tick();

    inputEl.triggerEventHandler('blur', {
      relatedTarget: {
        parentElement: {
          className: 'sky-lookup-menu-item'
        }
      }
    });
    fixture.detectChanges();
    tick();

    expect(inputEl.nativeElement.value).toBe('abc');
  }));

  it('should clear when focus is lost when the search critera matches no item (click window)',
  fakeAsync(() => {
    fixture.detectChanges();
    tick();

    triggerFocus();

    let inputEl = element.query(By.css('input'));
    setInput('abc');
    expect(inputEl.nativeElement.value).toBe('abc');
    tick();

    triggerClickWindow();
    tick();

    expect(inputEl.nativeElement.value).toBe('');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  }));

  it('should clear when when the search critera matches no item (click window, no focus)',
  fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('abc');
    expect(inputEl.nativeElement.value).toBe('abc');
    tick();

    triggerClickWindow();
    tick();

    expect(inputEl.nativeElement.value).toBe('');
    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();

    /* Gracefully handle window clicks when window isn't open */
    triggerClickWindow();
    tick();

    expect(inputEl.nativeElement.value).toBe('');
    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  }));

  it('should search and select an item when the search critera matches a data entry (blur)',
  fakeAsync(() => {
    component.data = [
      { name: 'Red' }
    ];
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('red');
    expect(inputEl.nativeElement.value).toBe('red');
    tick();

    triggerBlur();
    tick();

    expect(inputEl.nativeElement.value).toBe('Red');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).not.toBeNull();
  }));

  it('should search and select an item when the search critera matches a data entry (click window)',
  fakeAsync(() => {
    component.data = [
      { name: 'Red' }
    ];
    fixture.detectChanges();
    tick();

    triggerFocus();

    let inputEl = element.query(By.css('input'));
    setInput('red');
    expect(inputEl.nativeElement.value).toBe('red');
    tick();

    triggerClickWindow();
    tick();

    expect(inputEl.nativeElement.value).toBe('Red');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).not.toBeNull();

    let lastSelectionChange = component.lastSelectionChange;
    expect(lastSelectionChange.added.length).toBe(1);
    expect(lastSelectionChange.added[0].name).toBe('Red');
    expect(lastSelectionChange.added[0]).toBe(component.data[0]);
    expect(lastSelectionChange.removed.length).toBe(0);
    expect(lastSelectionChange.result.length).toBe(1);
    expect(lastSelectionChange.result[0].name).toBe('Red');
    expect(lastSelectionChange.result[0]).toBe(component.data[0]);
    let selectedItems = component.selectedItems;
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBe(component.data[0]);
  }));

  it('should search and select an item when the search critera partially matches a data entry',
  fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' }
    ];
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('b');
    expect(inputEl.nativeElement.value).toBe('b');
    tick();

    triggerBlur();
    tick();

    expect(inputEl.nativeElement.value).toBe('Blue');

    let lastSelectionChange = component.lastSelectionChange;
    expect(lastSelectionChange.added.length).toBe(1);
    expect(lastSelectionChange.added[0].name).toBe('Blue');
    expect(lastSelectionChange.added[0]).toBe(component.data[0]);
    expect(lastSelectionChange.removed.length).toBe(0);
    expect(lastSelectionChange.result.length).toBe(1);
    expect(lastSelectionChange.result[0].name).toBe('Blue');
    expect(lastSelectionChange.result[0]).toBe(component.data[0]);
    let selectedItems = component.selectedItems;
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBe(component.data[0]);

    expect(element.query(By.css('.sky-lookup-btn-clear'))).not.toBeNull();
  }));

  it('should respect default selection', fakeAsync(() => {
    component.data = [
      { name: 'Green' },
      { name: 'Orange' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('Orange');
    expect(component.lastSelectionChange).toBe(undefined);
    let selectedItems = component.selectedItems;
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBe(component.data[1]);

    expect(element.query(By.css('.sky-lookup-btn-clear'))).not.toBeNull();
  }));

  it('should revert to empty on escape key', fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Brown' }
    ];
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('l');
    expect(inputEl.nativeElement.value).toBe('l');
    tick();
    fixture.detectChanges();

    expect(element.query(By.css('.sky-dropdown-menu.sky-dropdown-open'))).not.toBeNull();

    triggerInputKeyDown(Key.Escape);
    fixture.detectChanges();
    tick();

    expect(element.query(By.css('.sky-dropdown-menu.sky-dropdown-open'))).toBeNull();
    expect(inputEl.nativeElement.value).toBe('');
    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
    expect(component.selectedItems.length).toBe(0);
  }));

  it('should revert to previously selected item on escape key', fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Brown' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('b');
    expect(inputEl.nativeElement.value).toBe('b');
    tick();
    fixture.detectChanges();

    expect(element.query(By.css('.sky-dropdown-menu.sky-dropdown-open'))).not.toBeNull();

    triggerInputKeyDown(Key.Escape);
    fixture.detectChanges();
    tick();

    expect(element.query(By.css('.sky-dropdown-menu.sky-dropdown-open'))).toBeNull();
    expect(inputEl.nativeElement.value).toBe('Black');
    expect(element.query(By.css('.sky-lookup-btn-clear'))).not.toBeNull();
    expect(component.selectedItems[0]).toBe(component.data[1]);
  }));

  it('should handle key down events for letters and backspace', fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Brown' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    setInput('b');
    triggerInputKeyUp(66 /* letter b */);
    triggerInputKeyDown(66 /* letter b */);
    triggerInputKeyUp(76 /* letter l */);
    triggerInputKeyDown(76 /* letter l */);

    /* Escape\Up\Down should be entirely ignored by key up */
    triggerInputKeyUp(Key.Escape);
    triggerInputKeyUp(Key.Up);
    triggerInputKeyUp(Key.Down);

    triggerInputKeyUp(Key.Backspace);
    triggerInputKeyDown(Key.Backspace);

    tick();
    fixture.detectChanges();

    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('b');

    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item'));
    expect(menuItems.length).toBe(3);
  }));

  it('should clear the selection when clear button is clicked', fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Brown' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    triggerClearButton();
    tick();

    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('');
    expect(component.selectedItems.length).toBe(0);
  }));

  it('should respect properties to search', fakeAsync(() => {
    component.data = [
      { name: 'Apple', code: 'Alpha', number: 132 },
      { name: 'Orange', code: 'Omega' }
    ];
    component.propertiesToSearch = ['code', 'number'];
    fixture.detectChanges();
    tick();

    setInput('Ome');
    tick();
    fixture.detectChanges();

    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Orange');

    setInput('1');
    tick();
    fixture.detectChanges();

    menuItems = element.queryAll(By.css('.sky-lookup-menu-item'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Apple');
  }));
 });

 describe('multi-select lookup', () => {
  beforeEach(() => {
    component.multiple = true;
  });

  it('should not perform a search when focus gained or lost when the search field is empty', () => {
    fixture.detectChanges();
    triggerFocus();
    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('');
    triggerBlur();
    expect(inputEl.nativeElement.value).toBe('');

    expect(element.query(By.css('.sky-lookup-selected-item'))).toBeNull();
    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  });

  it('should search and clear when focus is lost when the search critera matches no item',
  fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('abc');
    expect(inputEl.nativeElement.value).toBe('abc');
    tick();

    triggerBlur();
    tick();

    expect(inputEl.nativeElement.value).toBe('');

    expect(element.query(By.css('.sky-lookup-selected-item'))).toBeNull();
    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  }));

  it('should search and select an item when the search critera matches a data entry',
  fakeAsync(() => {
    component.data = [
      { name: 'Red' }
    ];
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('red');
    expect(inputEl.nativeElement.value).toBe('red');
    tick();

    triggerBlur();
    tick();

    expect(inputEl.nativeElement.value).toBe('');

    let selectedItem = element.query(By.css('.sky-lookup-selected-item p'));
    expect(selectedItem.nativeElement.innerHTML).toBe('Red');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  }));

  it('should search and select an item when the search critera partially matches a data entry',
  fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Silver' }
    ];
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    setInput('b');
    expect(inputEl.nativeElement.value).toBe('b');
    tick();

    triggerBlur();
    tick();

    expect(inputEl.nativeElement.value).toBe('');

    let lastSelectionChange = component.lastSelectionChange;
    expect(lastSelectionChange.added.length).toBe(1);
    expect(lastSelectionChange.added[0].name).toBe('Blue');
    expect(lastSelectionChange.added[0]).toBe(component.data[0]);
    expect(lastSelectionChange.removed.length).toBe(0);
    expect(lastSelectionChange.result.length).toBe(1);
    expect(lastSelectionChange.result[0].name).toBe('Blue');
    expect(lastSelectionChange.result[0]).toBe(component.data[0]);
    let selectedItems = component.selectedItems;
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBe(component.data[0]);

    let selectedItem = element.query(By.css('.sky-lookup-selected-item p'));
    expect(selectedItem.nativeElement.innerHTML).toBe('Blue');

    /* Select 2nd item */
    setInput('silver');
    tick();

    triggerBlur();
    tick();

    expect(inputEl.nativeElement.value).toBe('');

    lastSelectionChange = component.lastSelectionChange;
    expect(lastSelectionChange.added.length).toBe(1);
    expect(lastSelectionChange.added[0].name).toBe('Silver');
    expect(lastSelectionChange.added[0]).toBe(component.data[2]);
    expect(lastSelectionChange.removed.length).toBe(0);
    expect(lastSelectionChange.result.length).toBe(2);
    expect(lastSelectionChange.result[0].name).toBe('Blue');
    expect(lastSelectionChange.result[0]).toBe(component.data[0]);
    expect(lastSelectionChange.result[1].name).toBe('Silver');
    expect(lastSelectionChange.result[1]).toBe(component.data[2]);
    selectedItems = component.selectedItems;
    expect(selectedItems.length).toBe(2);
    expect(selectedItems[0]).toBe(component.data[0]);
    expect(selectedItems[1]).toBe(component.data[2]);

    let selectionList = element.queryAll(By.css('.sky-lookup-selected-item p'));
    expect(selectionList[0].nativeElement.innerHTML).toBe('Blue');
    expect(selectionList[1].nativeElement.innerHTML).toBe('Silver');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  }));

  it('should respect default selection', fakeAsync(() => {
    component.data = [
      { name: 'Green' },
      { name: 'Orange' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('');
    expect(component.lastSelectionChange).toBe(undefined);
    let selectedItems = component.selectedItems;
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBe(component.data[1]);

    let selectedItem = element.query(By.css('.sky-lookup-selected-item p'));
    expect(selectedItem.nativeElement.innerHTML).toBe('Orange');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).toBeNull();
  }));

  it('should ignore key enter when there is no active item', fakeAsync(() => {
    component.data = [
      { name: 'White' },
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Beigh' },
      { name: 'Brown' },
      { name: 'Green' }
    ];
    fixture.detectChanges();
    tick();

    setInput('abc');
    tick();
    fixture.detectChanges();

    triggerInputKeyUp(Key.Enter);
    tick();

    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('abc');

    let menuItem = element.query(By.css('.sky-lookup-menu-item'));
    expect(menuItem.nativeElement.textContent.trim()).toBe('No results match criteria');
    expect(component.selectedItems.length).toBe(0);
  }));

  it('should handle backspace to remove selected items when appropriate', fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Brown' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    setInput('b');
    tick();
    fixture.detectChanges();

    triggerInputKeyDown(Key.Backspace);
    tick();
    fixture.detectChanges();
    expect(component.selectedItems[0]).toBe(component.data[1]);

    setInput('');
    tick();
    fixture.detectChanges();

    triggerInputKeyDown(Key.Backspace);
    tick();
    fixture.detectChanges();
    expect(component.selectedItems.length).toBe(0);

    triggerInputKeyDown(Key.Backspace);
    tick();
    fixture.detectChanges();
    expect(component.selectedItems.length).toBe(0);
  }));

  it('should remove the specified selected item when the x is clicked', fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Brown' }
    ];
    component.selectedItems = [component.data[1], component.data[2]];
    fixture.detectChanges();
    tick();

    let selectionList = element.queryAll(By.css('.sky-lookup-selected-item'));
    expect(selectionList.length).toBe(2);
    let clearEl = selectionList[0].query(By.css('.sky-lookup-item-delete'));
    clearEl.triggerEventHandler('click', undefined);
    fixture.detectChanges();
    tick();

    let lastSelectionChange = component.lastSelectionChange;
    expect(lastSelectionChange.added.length).toBe(0);
    expect(lastSelectionChange.removed.length).toBe(1);
    expect(lastSelectionChange.removed[0].name).toBe('Black');
    expect(lastSelectionChange.removed[0]).toBe(component.data[1]);
    expect(lastSelectionChange.result.length).toBe(1);
    expect(lastSelectionChange.result[0].name).toBe('Brown');
    expect(lastSelectionChange.result[0]).toBe(component.data[2]);
    let selectedItems = component.selectedItems;
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBe(component.data[2]);
  }));

  it('should select the first matching result item if there is no active item', fakeAsync(() => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Brown' }
    ];
    component.searchDelay = 5000;
    fixture.detectChanges();
    tick(1000);

    let inputEl = element.query(By.css('input'));
    setInput('b');
    expect(inputEl.nativeElement.value).toBe('b');
    tick(1000);

    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(0); /* assert the menu hasn't appeared yet */

    triggerBlur();
    tick(1000);

    expect(inputEl.nativeElement.value).toBe('');

    let lastSelectionChange = component.lastSelectionChange;
    expect(lastSelectionChange.added.length).toBe(1);
    expect(lastSelectionChange.added[0].name).toBe('Blue');
    expect(lastSelectionChange.added[0]).toBe(component.data[0]);
    expect(lastSelectionChange.removed.length).toBe(0);
    expect(lastSelectionChange.result.length).toBe(1);
    expect(lastSelectionChange.result[0].name).toBe('Blue');
    expect(lastSelectionChange.result[0]).toBe(component.data[0]);
    let selectedItems = component.selectedItems;
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBe(component.data[0]);
  }));

  it('should ignore select item if the item is already selected', () => {
    component.data = [
      { name: 'Blue' },
      { name: 'Brown' }
    ];
    component.selectedItems = [component.data[0]];
    fixture.detectChanges();

    component.lookupComponent.selectItem(component.data[0]);
    expect(component.selectedItems[0]).toBe(component.data[0]);
    expect(component.lastSelectionChange).toBe(undefined);
  });

 });

 describe('lookup menu', () => {
  it('should show the selected item as a menu item if single select mode', fakeAsync(() => {
    component.multiple = false;
    component.data = [
      { name: 'White' },
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Beigh' },
      { name: 'Brown' },
      { name: 'Green' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    setInput('b');
    tick();
    fixture.detectChanges();

    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item'));
    expect(menuItems.length).toBe(4);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Blue');
    expect(menuItems[1].nativeElement.textContent.trim()).toBe('Black');
    expect(menuItems[2].nativeElement.textContent.trim()).toBe('Beigh');
    expect(menuItems[3].nativeElement.textContent.trim()).toBe('Brown');
  }));

  it('should not show the selected item as a menu item if multi-select mode', fakeAsync(() => {
    component.multiple = true;
    component.data = [
      { name: 'White' },
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Beigh' },
      { name: 'Brown' },
      { name: 'Green' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    setInput('b');
    tick();
    fixture.detectChanges();

    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item'));
    expect(menuItems.length).toBe(3);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Black');
    expect(menuItems[1].nativeElement.textContent.trim()).toBe('Beigh');
    expect(menuItems[2].nativeElement.textContent.trim()).toBe('Brown');
  }));

  it('should respect up and down arrow keys', fakeAsync(() => {
    component.multiple = true;
    component.data = [
      { name: 'White' },
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Beigh' },
      { name: 'Brown' },
      { name: 'Green' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    tick();

    setInput('b');
    tick();
    fixture.detectChanges();

    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item'));
    expect(menuItems.length).toBe(3);

    /* Verify the first item in the menu is the active entry */
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Black');

    /* Verify up arrow does nothing */
    triggerInputKeyDown(Key.Up);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Black');

    /* Verify down arrow selects the 2nd entry */
    triggerInputKeyDown(Key.Down);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Beigh');

    /* Verify down arrow selects the 3rd entry */
    triggerInputKeyDown(Key.Down);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Brown');

    /* Verify down arrow does nothing */
    triggerInputKeyDown(Key.Down);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Brown');

    /* Verify up arrow selects the 2nd entry */
    triggerInputKeyDown(Key.Up);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Beigh');

    /* Verify blur uses active item from menu */
    triggerBlur();
    tick();

    let selectionList = element.queryAll(By.css('.sky-lookup-selected-item p'));
    expect(selectionList[0].nativeElement.innerHTML).toBe('Blue');
    expect(selectionList[1].nativeElement.innerHTML).toBe('Beigh');

    expect(element.query(By.css('input')).nativeElement.value).toBe('');
  }));

  it('should ignore up and down arrow keys when menu closed', fakeAsync(() => {
    component.multiple = true;
    component.data = [
      { name: 'Blue' }
    ];
    fixture.detectChanges();
    tick();

    triggerInputKeyDown(Key.Down);
    expect(element.query(By.css('.sky-dropdown-menu.sky-dropdown-open'))).toBeNull();
    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(0);
    triggerInputKeyDown(Key.Up);
    expect(element.query(By.css('.sky-dropdown-menu.sky-dropdown-open'))).toBeNull();
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(0);
  }));

  it('should handle key enter to select active item', fakeAsync(() => {
    component.multiple = true;
    component.data = [
      { name: 'White' },
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'Beigh' },
      { name: 'Brown' },
      { name: 'Green' }
    ];
    fixture.detectChanges();
    tick();

    setInput('bl');
    tick();
    fixture.detectChanges();
    triggerInputKeyDown(Key.Down); /* down arrow selects the 2nd entry */
    tick();

    triggerInputKeyUp(Key.Enter);
    tick();

    let selectionList = element.queryAll(By.css('.sky-lookup-selected-item p'));
    expect(selectionList[0].nativeElement.innerHTML).toBe('Black');
    expect(component.selectedItems.length).toBe(1);
    expect(component.selectedItems[0]).toBe(component.data[2]);
    expect(element.query(By.css('input')).nativeElement.value).toBe('');
  }));

  it('should respect the results limit', fakeAsync(() => {
    component.data = [
      { name: 'A1' },
      { name: 'A2' },
      { name: 'A3' },
      { name: 'A4' },
      { name: 'A5' },
      { name: 'A6' }
    ];
    component.resultsLimit = 3;
    fixture.detectChanges();
    tick();

    setInput('A');
    tick();
    fixture.detectChanges();

    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item'));
    expect(menuItems.length).toBe(3);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('A1');
    expect(menuItems[1].nativeElement.textContent.trim()).toBe('A2');
    expect(menuItems[2].nativeElement.textContent.trim()).toBe('A3');
  }));

 });

});

describe('Lookup with menu template component', () => {
  let fixture: ComponentFixture<LookupMenuTemplateTestComponent>;
  let nativeElement: HTMLElement;
  let component: LookupMenuTemplateTestComponent;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LookupMenuTemplateTestComponent
      ],
      imports: [
        SkyLookupModule
      ]
    });

    fixture = TestBed.createComponent(LookupMenuTemplateTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    element = fixture.debugElement as DebugElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should detect the provided menu item template',  fakeAsync(() => {
    component.data = [
      { name: 'White' },
      { name: 'Blue' },
      { name: 'Brown' },
      { name: 'Green' }
    ];
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    _setInput(element, fixture, 'b');
    tick();
    fixture.detectChanges();

    let menuItems = element.queryAll(By.css('.sky-lookup-menu-item'));
    expect(menuItems.length).toBe(2);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Name: Blue');
    expect(menuItems[1].nativeElement.textContent.trim()).toBe('Name: Brown');
  }));
});
