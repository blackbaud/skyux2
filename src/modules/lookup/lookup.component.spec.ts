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

import {
  LookupTestComponent
} from './fixtures/lookup.component.fixture';

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

  function triggerInputKeyDown(key: number) {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('keydown', {
      which: key,
      preventDefault: () => {}
    });
    fixture.detectChanges();
  }

  /*function triggerInputKeyUp(key: number) {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('keyup', { which: key});
    fixture.detectChanges();
  }*/

  /*function triggerClearButton() {
    let clearEl = element.query(By.css('.sky-search-btn-clear'));
    clearEl.triggerEventHandler('click', undefined);
    fixture.detectChanges();
  }*/

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

  it('should override default placeholder text when placeholder text is provided', () => {
    fixture.detectChanges();
    component.placeholderText = 'hey ya';
    fixture.detectChanges();
    expect(element.query(By.css('input')).attributes.placeholder).toBe('hey ya');
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

    expect(inputEl.nativeElement.value).toBe('Red');

    expect(element.query(By.css('.sky-lookup-btn-clear'))).not.toBeNull();
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
    triggerInputKeyDown(38 /* Up */);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Black');

    /* Verify down arrow selects the 2nd entry */
    triggerInputKeyDown(40 /* Down */);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Beigh');

    /* Verify down arrow selects the 3rd entry */
    triggerInputKeyDown(40 /* Down */);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Brown');

    /* Verify down arrow does nothing */
    triggerInputKeyDown(40 /* Down */);
    menuItems = element.queryAll(By.css('.sky-lookup-menu-item.sky-lookup-menu-item-focused'));
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent.trim()).toBe('Brown');

    /* Verify up arrow selects the 2nd entry */
    triggerInputKeyDown(38 /* Up */);
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
 });

});
