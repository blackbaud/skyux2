// import {
//   ComponentFixture,
//   fakeAsync,
//   TestBed,
//   tick
// } from '@angular/core/testing';

// import {
//   expect,
//   TestUtility
// } from '../testing';

// import {
//   SkyLookupComponent
// } from './index';

// import { SkyLookupFixturesModule } from './fixtures/lookup-fixtures.module';
// import { SkyLookupTestComponent } from './fixtures/lookup.component.fixture';

// describe('Lookup component', () => {
//   let fixture: ComponentFixture<SkyLookupTestComponent>;
//   let component: SkyLookupTestComponent;
//   let lookupComponent: SkyLookupComponent;

//   function getInputElement(): HTMLInputElement {
//     return lookupComponent['lookupInput'].nativeElement as HTMLInputElement;
//   }

//   function getTokenElements(): NodeListOf<Element> {
//     return document.querySelectorAll('.sky-token');
//   }

//   function performSearch(searchText: string) {
//     const inputElement = getInputElement();
//     inputElement.value = searchText;
//     inputElement.focus();
//     TestUtility.fireKeyboardEvent(inputElement, 'keyup', {
//       key: ''
//     });
//     tick();
//     fixture.detectChanges();
//     tick();
//   }

//   function selectSearchResult(index: number) {
//     const dropdownButtons = document.querySelectorAll('.sky-dropdown-menu button');
//     (dropdownButtons.item(index) as HTMLElement).click();
//     tick();
//     fixture.detectChanges();
//     tick();
//   }

//   function dismissSelectedItem(index: number) {
//     const tokenElements = document.querySelectorAll('.sky-token');
//     (tokenElements.item(index).querySelector('.sky-token-btn-close') as HTMLElement).click();
//     tick();
//     fixture.detectChanges();
//     tick();
//   }

//   function triggerClick(element: Element, focusable = false) {
//     TestUtility.fireDomEvent(element, 'mousedown', {
//       bubbles: true,
//       cancelable: true
//     });
//     tick();
//     fixture.detectChanges();
//     tick();

//     if (focusable) {
//       (element as HTMLElement).focus();
//       tick();
//       fixture.detectChanges();
//       tick();
//     }

//     TestUtility.fireDomEvent(element, 'mouseup', {
//       bubbles: true,
//       cancelable: true
//     });
//     tick();
//     fixture.detectChanges();
//     tick();
//   }

//   function triggerKeyPress(element: Element, key: string) {
//     TestUtility.fireKeyboardEvent(element, 'keydown', { key });
//     tick();
//     fixture.detectChanges();
//     tick();

//     TestUtility.fireKeyboardEvent(element, 'keyup', { key });
//     tick();
//     fixture.detectChanges();
//     tick();
//   }

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         SkyLookupFixturesModule
//       ]
//     });

//     fixture = TestBed.createComponent(SkyLookupTestComponent);
//     component = fixture.componentInstance;
//     lookupComponent = component.lookupComponent;
//   });

//   afterEach(() => {
//     fixture.destroy();
//   });

//   describe('basic setup', () => {
//     it('should set defaults', () => {
//       expect(lookupComponent.ariaLabel).toEqual(undefined);
//       expect(lookupComponent.ariaLabelledBy).toEqual(undefined);
//       expect(lookupComponent.disabled).toEqual(false);
//       expect(lookupComponent.placeholderText).toEqual(undefined);
//       expect(lookupComponent.tokens).toEqual(undefined);
//       expect(lookupComponent.value).toEqual([]);
//     });

//     it('should share the same inputs as autocomplete', () => {
//       fixture.detectChanges();
//       expect(typeof lookupComponent.data).not.toBeUndefined();
//       expect(typeof lookupComponent.descriptorProperty).not.toBeUndefined();
//       expect(typeof lookupComponent.propertiesToSearch).not.toBeUndefined();
//       expect(typeof lookupComponent.search).not.toBeUndefined();
//       expect(typeof lookupComponent.searchResultTemplate).not.toBeUndefined();
//       expect(typeof lookupComponent.searchTextMinimumCharacters).not.toBeUndefined();
//       expect(typeof lookupComponent.searchFilters).not.toBeUndefined();
//       expect(typeof lookupComponent.searchResultsLimit).not.toBeUndefined();
//     });

//     it('should allow preselected tokens', () => {
//       const friends = [{ name: 'Rachel' }];
//       component.friends = friends;
//       expect(lookupComponent.value).toEqual([]);
//       fixture.detectChanges();
//       expect(lookupComponent.value).toEqual(friends);
//     });

//     it('should add new tokens', fakeAsync(() => {
//       fixture.detectChanges();
//       expect(lookupComponent.value).toEqual([]);

//       performSearch('s');
//       selectSearchResult(0);

//       const selectedItems = lookupComponent.value;
//       expect(selectedItems.length).toEqual(1);
//       expect(selectedItems[0].name).toEqual('Isaac');
//     }));

//     it('should change the value of the lookup if tokens change', fakeAsync(() => {
//       fixture.detectChanges();
//       expect(lookupComponent.value).toEqual([]);

//       performSearch('s');
//       selectSearchResult(0);

//       performSearch('s');
//       selectSearchResult(1);

//       expect(lookupComponent.value.length).toEqual(2);

//       dismissSelectedItem(0);

//       expect(lookupComponent.value.length).toEqual(1);
//     }));

//     it('should focus the input if all tokens are dismissed', fakeAsync(() => {
//       component.friends = [{ name: 'Rachel' }];
//       fixture.detectChanges();

//       dismissSelectedItem(0);

//       const inputElement = getInputElement();
//       expect(lookupComponent.value.length).toEqual(0);
//       expect(document.activeElement).toEqual(inputElement);
//     }));
//   });

//   describe('events', () => {
//     it('should not add event listeners if disabled', () => {
//       lookupComponent.disabled = true;
//       const spy = spyOn(lookupComponent as any, 'addEventListeners').and.callThrough();
//       fixture.detectChanges();
//       expect(spy).not.toHaveBeenCalled();
//     });

//     it('should allow setting `disabled` after initialization', () => {
//       const addSpy = spyOn(lookupComponent as any, 'addEventListeners').and.callThrough();
//       const removeSpy = spyOn(lookupComponent as any, 'removeEventListeners').and.callThrough();

//       lookupComponent.disabled = false;
//       fixture.detectChanges();

//       expect(addSpy).toHaveBeenCalled();
//       expect(removeSpy).not.toHaveBeenCalled();

//       addSpy.calls.reset();
//       removeSpy.calls.reset();

//       component.disableLookup();
//       fixture.detectChanges();

//       expect(addSpy).not.toHaveBeenCalled();
//       expect(removeSpy).toHaveBeenCalled();

//       addSpy.calls.reset();
//       removeSpy.calls.reset();

//       component.enableLookup();
//       fixture.detectChanges();

//       expect(addSpy).toHaveBeenCalled();
//       expect(removeSpy).toHaveBeenCalled();
//     });
//   });

//   describe('keyboard interactions', () => {
//     it('should focus the input if arrowright key is pressed on the last token', fakeAsync(() => {
//       component.friends = [{ name: 'Rachel' }];
//       fixture.detectChanges();

//       const tokenHostElements = document.querySelectorAll('sky-token');
//       TestUtility.fireKeyboardEvent(tokenHostElements.item(0), 'keyup', {
//         key: 'ArrowRight'
//       });
//       tick();
//       fixture.detectChanges();
//       tick();

//       const inputElement = getInputElement();
//       expect(document.activeElement).toEqual(inputElement);
//     }));

//     it('should focus the last token if arrowleft or backspace pressed', fakeAsync(() => {
//       component.friends = [{ name: 'Rachel' }];
//       fixture.detectChanges();

//       const tokenElements = getTokenElements();
//       const inputElement = getInputElement();

//       triggerKeyPress(inputElement, 'ArrowLeft');
//       expect(document.activeElement).toEqual(tokenElements.item(tokenElements.length - 1));

//       inputElement.focus();
//       tick();
//       fixture.detectChanges();

//       triggerKeyPress(inputElement, 'Backspace');
//       expect(document.activeElement).toEqual(tokenElements.item(tokenElements.length - 1));

//       inputElement.focus();
//       tick();
//       fixture.detectChanges();

//       triggerKeyPress(inputElement, 'Space');
//       expect(document.activeElement).toEqual(inputElement);
//     }));

//     it('should not focus the last token if search text is present', fakeAsync(() => {
//       component.friends = [{ name: 'Rachel' }];
//       fixture.detectChanges();

//       const inputElement = getInputElement();

//       performSearch('s');

//       expect(inputElement.value).toEqual('s');

//       triggerKeyPress(inputElement, 'ArrowLeft');
//       expect(document.activeElement).toEqual(inputElement);
//     }));

//     it('should clear the search text if escape key is pressed', fakeAsync(() => {
//       const inputElement = getInputElement();

//       fixture.detectChanges();
//       performSearch('s');

//       expect(inputElement.value).toEqual('s');

//       TestUtility.fireKeyboardEvent(inputElement, 'keyup', { key: 'Escape' });
//       tick();
//       fixture.detectChanges();
//       tick();

//       expect(inputElement.value).toEqual('');
//     }));
//   });

//   describe('mouse interactions', () => {
//     it('should focus the input if the host is clicked', fakeAsync(() => {
//       fixture.detectChanges();

//       const hostElement = document.querySelector('.sky-lookup');
//       const input = getInputElement();

//       triggerClick(hostElement);

//       expect(document.activeElement).toEqual(input);
//     }));

//     it('should not focus the input if a token is clicked', fakeAsync(() => {
//       fixture.detectChanges();

//       performSearch('s');
//       selectSearchResult(0);

//       const tokenElements = getTokenElements();
//       const input = getInputElement();

//       triggerClick(tokenElements.item(0), true);

//       expect(document.activeElement).not.toEqual(input);
//     }));
//   });
// });
