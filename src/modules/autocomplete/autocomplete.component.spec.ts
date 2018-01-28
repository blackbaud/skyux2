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

import { SkyAutocompleteFixturesModule } from './fixtures/autocomplete-fixtures.module';
import { SkyAutocompleteTestComponent } from './fixtures/autocomplete.component.fixture';

import { SkyAutocompleteComponent } from './autocomplete.component';
import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';
import {
  SkyAutocompleteSearchFunction
} from './types';

fdescribe('SkyAutocompleteComponent', () => {
  let fixture: ComponentFixture<SkyAutocompleteTestComponent>;
  let component: SkyAutocompleteTestComponent;
  let autocomplete: SkyAutocompleteComponent;
  let input: SkyAutocompleteInputDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAutocompleteFixturesModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyAutocompleteTestComponent);
    component = fixture.componentInstance;
    autocomplete = component.autocomplete;
    input = component.autocompleteInput;
  });

  describe('basic setup', () => {
    it('should set defaults', () => {
      fixture.detectChanges();
      expect(autocomplete.descriptorProperty).toEqual('name');
      expect(autocomplete.propertiesToSearch).toEqual(['name']);
      expect(autocomplete.search).toBeDefined();
      expect(autocomplete.searchFilters).toBeUndefined();
      expect(autocomplete.searchResultsLimit).toBeUndefined();
      expect(autocomplete.searchResultTemplate).toBeDefined();
      expect(autocomplete.searchTextMinimumCharacters).toEqual(1);
    });

    it('should handle preselected values', fakeAsync(() => {
      const selectedValue = { name: 'Red' };
      component.model.favoriteColor = selectedValue;

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(component.myForm.value.favoriteColor).toEqual(selectedValue);
      expect(input.selectedItem).toEqual(selectedValue);
    }));

    it('should search', fakeAsync(() => {
      fixture.detectChanges();

      const inputElement = input['elementRef'].nativeElement;
      const spy = spyOn(autocomplete, 'search').and.callThrough();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy.calls.argsFor(0)[0]).toEqual('r');
    }));

    it('should search with filters', fakeAsync(() => {
      fixture.detectChanges();

      let inputElement = input['elementRef'].nativeElement;
      inputElement.value = 'r';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      fixture.detectChanges();

      // First, test that 'Red' is included in the results:
      let found = autocomplete.searchResults.find((result: any) => {
        return (result.name === 'Red');
      });

      // The number of search results that contain the letter 'r':
      expect(autocomplete.searchResults.length).toEqual(6);
      expect(found).toBeDefined();

      fixture.destroy();

      // Now, setup a filter, removing 'Red' from the results.
      fixture = TestBed.createComponent(SkyAutocompleteTestComponent);
      component = fixture.componentInstance;
      autocomplete = fixture.componentInstance.autocomplete;
      input = component.autocompleteInput;
      inputElement = input['elementRef'].nativeElement;

      fixture.componentInstance.searchFilters = [
        (searchText: string, item: any): boolean => {
          return (item.name !== 'Red');
        }
      ];

      fixture.detectChanges();

      inputElement.value = 'r';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      fixture.detectChanges();
      tick();

      found = autocomplete.searchResults.find((result: any) => {
        return (result.name === 'Red');
      });

      expect(found).toBeUndefined();
      expect(autocomplete.searchResults.length).toEqual(5);
    }));

    it('should limit search results', fakeAsync(() => {
      component.searchResultsLimit = 1;
      fixture.detectChanges();

      const inputElement = input['elementRef'].nativeElement;

      // The letter 'r' should return multiple results:
      inputElement.value = 'r';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      fixture.detectChanges();
      tick();

      expect(autocomplete.searchResults.length).toEqual(1);
    }));

    it('should not search if search text empty', fakeAsync(() => {
      fixture.detectChanges();

      const inputElement = input['elementRef'].nativeElement;
      const spy = spyOn(autocomplete, 'search').and.callThrough();

      inputElement.value = '';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy).not.toHaveBeenCalled();
    }));

    it('should not search if search text is not long enough', fakeAsync(() => {
      component.searchTextMinimumCharacters = 3;
      fixture.detectChanges();

      const inputElement = input['elementRef'].nativeElement;
      const spy = spyOn(autocomplete, 'search').and.callThrough();

      // First, verify that the search will run with 3 characters.
      inputElement.value = '123';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy).toHaveBeenCalled();
      spy.calls.reset();

      // Finally, verify that it will not search with fewer characters.
      inputElement.value = '1';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy).not.toHaveBeenCalled();
    }));

    it('should allow for custom search function', fakeAsync(() => {
      let customSearchCalled = false;
      const customFunction: SkyAutocompleteSearchFunction =
        (searchText: string): Promise<any> => {
          return new Promise((resolve: Function) => {
            customSearchCalled = true;
            resolve([
              { name: 'Red' }
            ]);
          });
        };

      component.search = customFunction;

      fixture.detectChanges();

      const inputElement = input['elementRef'].nativeElement;
      const spy = spyOn(autocomplete, 'search').and.callThrough();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy.calls.argsFor(0)[0]).toEqual('r');
      expect(customSearchCalled).toEqual(true);
    }));

    it('should handle items that do not have the descriptor property', fakeAsync(() => {
      component.data = [{
        foo: 'bar'
      }];

      fixture.detectChanges();

      const inputElement = input['elementRef'].nativeElement;
      const spy = spyOn(autocomplete, 'search').and.callThrough();

      inputElement.value = 'r';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      fixture.detectChanges();
      tick();

      expect(autocomplete.searchResults.length).toEqual(0);
      expect(spy.calls.argsFor(0)[0]).toEqual('r');
    }));

    it('should handle disabled input', fakeAsync(() => {
      input['elementRef'].nativeElement.disabled = true;

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const inputElement = input['elementRef'].nativeElement;
      const spy = spyOn(autocomplete, 'search').and.callThrough();

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy).not.toHaveBeenCalled();
    }));

    it('should handle missing skyAutocomplete directive', fakeAsync(() => {
      component.autocomplete['inputDirective'] = undefined;
      try {
        fixture.detectChanges();
      } catch (e) {
        expect(e.message.indexOf('The SkyAutocompleteComponent requires a ContentChild input') > -1).toEqual(true);
      }
    }));
  });

  describe('keyboard interactions', () => {
    it('should notify selection when enter key pressed', fakeAsync(() => {}));

    it('should notify selection when tab key pressed', fakeAsync(() => {}));

    it('should navigate items with arrow keys', fakeAsync(() => {}));

    it('should close menu when escape key pressed', fakeAsync(() => {}));

    it('should reset input text value to descriptor value on blur', fakeAsync(() => {}));

    it('should clear the input selected value if text value empty on blur', fakeAsync(() => {}));
  });
});
