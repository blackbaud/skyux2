import {
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
} from '../dropdown';

import { SkyAutocompleteFixturesModule } from './fixtures/autocomplete-fixtures.module';
import { SkyAutocompleteTestComponent } from './fixtures/autocomplete.component.fixture';

import {
  SkyAutocompleteSearchFunction
} from './types';

describe('Autocomplete component', function () {
  function getAutocompleteElement(): HTMLElement {
    return document.querySelector('sky-autocomplete') as HTMLElement;
  }

  function getInputElement(): HTMLInputElement {
    return document.getElementById('my-autocomplete-input') as HTMLInputElement;
  }

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [
        SkyAutocompleteFixturesModule
      ]
    });

    this.fixture = TestBed.createComponent(SkyAutocompleteTestComponent);
    this.component = this.fixture.componentInstance;
    this.autocomplete = this.component.autocomplete;
    this.input = this.component.autocompleteInput;
  });

  afterEach(function () {
    this.fixture.destroy();
  });

  describe('basic setup', function () {
    it('should set defaults', function () {
      this.fixture.detectChanges();
      expect(this.autocomplete.descriptorProperty).toEqual('name');
      expect(this.autocomplete.propertiesToSearch).toEqual(['name']);
      expect(this.autocomplete.search).toBeDefined();
      expect(this.autocomplete.searchFilters).toBeUndefined();
      expect(this.autocomplete.searchResultsLimit).toBeUndefined();
      expect(this.autocomplete.searchResultTemplate).toBeDefined();
      expect(this.autocomplete.searchTextMinimumCharacters).toEqual(1);
    });

    it('should handle preselected values', fakeAsync(function () {
      const selectedValue = { name: 'Red' };
      this.component.model.favoriteColor = selectedValue;

      this.fixture.detectChanges();
      tick();
      this.fixture.detectChanges();

      expect(this.component.myForm.value.favoriteColor).toEqual(selectedValue);
      expect(this.input.value).toEqual(selectedValue);
    }));

    it('should search', fakeAsync(function () {
      this.fixture.detectChanges();

      const inputElement = getInputElement();
      const spy = spyOn(this.autocomplete, 'search').and.callThrough();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy.calls.argsFor(0)[0]).toEqual('r');
    }));

    it('should search against multiple properties', fakeAsync(function () {
      this.component.propertiesToSearch = ['name', 'objectid'];
      this.fixture.detectChanges();

      const inputElement = getInputElement();

      inputElement.value = 'y';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      this.fixture.detectChanges();
      tick();

      expect(this.autocomplete.searchResults.length).toEqual(2);
      expect(this.autocomplete.searchResults[0].name).toEqual('Yellow');
      // The letter 'y' is in the objectid of 'Turquoise':
      expect(this.autocomplete.searchResults[1].name).toEqual('Turquoise');
    }));

    it('should search with filters', fakeAsync(function () {
      this.fixture.detectChanges();

      let inputElement = getInputElement();
      inputElement.value = 'r';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      this.fixture.detectChanges();

      // First, test that 'Red' is included in the results:
      let found = this.autocomplete.searchResults.find((result: any) => {
        return (result.name === 'Red');
      });

      // The number of search results that contain the letter 'r':
      expect(this.autocomplete.searchResults.length).toEqual(6);
      expect(found).toBeDefined();

      this.fixture.destroy();

      // Now, setup a filter, removing 'Red' from the results.
      this.fixture = TestBed.createComponent(SkyAutocompleteTestComponent);
      this.component = this.fixture.componentInstance;
      this.autocomplete = this.fixture.componentInstance.autocomplete;
      this.input = this.component.autocompleteInput;
      inputElement = getInputElement();

      this.fixture.componentInstance.searchFilters = [
        (searchText: string, item: any): boolean => {
          return (item.name !== 'Red');
        }
      ];

      this.fixture.detectChanges();

      inputElement.value = 'r';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      this.fixture.detectChanges();
      tick();

      found = this.autocomplete.searchResults.find((result: any) => {
        return (result.name === 'Red');
      });

      expect(found).toBeUndefined();
      expect(this.autocomplete.searchResults.length).toEqual(5);
    }));

    it('should allow custom search result template', fakeAsync(function () {
      this.component.searchResultTemplate = this.component.customSearchResultTemplate;
      this.fixture.detectChanges();

      const inputElement = getInputElement();
      inputElement.value = 'r';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      this.fixture.detectChanges();
      tick();

      const customElement = getAutocompleteElement()
        .querySelector('.custom-search-result-id') as HTMLElement;

      expect(customElement).not.toBeNull();
    }));

    it('should focus the first search result after being opened',
      fakeAsync(function () {
        this.fixture.detectChanges();

        const inputElement = getInputElement();
        const messageSpy = spyOn(this.autocomplete as any, 'sendDropdownMessage')
          .and.callThrough();

        inputElement.value = 'r';
        TestUtility.fireKeyboardEvent(inputElement, 'keyup');
        tick();
        this.fixture.detectChanges();
        tick();

        expect(messageSpy)
          .toHaveBeenCalledWith(SkyDropdownMessageType.Open);
        expect(messageSpy)
          .toHaveBeenCalledWith(SkyDropdownMessageType.FocusFirstItem);
      })
    );

    it('should only open the dropdown one time on keypress',
      fakeAsync(function () {
        this.fixture.detectChanges();

        const inputElement = getInputElement();
        const messageSpy = spyOn(this.autocomplete as any, 'sendDropdownMessage')
          .and.callThrough();

        inputElement.value = 'r';
        TestUtility.fireKeyboardEvent(inputElement, 'keyup');
        tick();

        inputElement.value = 're';
        TestUtility.fireKeyboardEvent(inputElement, 'keyup');
        tick();

        expect(messageSpy)
          .toHaveBeenCalledWith(SkyDropdownMessageType.Open);
        expect(messageSpy.calls.count()).toEqual(1);
      })
    );

    it('should limit search results', fakeAsync(function () {
      this.component.searchResultsLimit = 1;
      this.fixture.detectChanges();

      const inputElement = getInputElement();

      // The letter 'r' should return multiple results:
      inputElement.value = 'r';

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      this.fixture.detectChanges();
      tick();

      expect(this.autocomplete.searchResults.length).toEqual(1);
    }));

    it('should not search if search text empty', fakeAsync(function () {
      this.fixture.detectChanges();

      const inputElement = getInputElement();
      const spy = spyOn(this.autocomplete, 'search').and.callThrough();

      inputElement.value = '';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy).not.toHaveBeenCalled();
    }));

    it('should not search if search text is not long enough', fakeAsync(function () {
      this.component.searchTextMinimumCharacters = 3;
      this.fixture.detectChanges();

      const inputElement = getInputElement();
      const spy = spyOn(this.autocomplete, 'search').and.callThrough();

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

    it('should allow for custom search function', fakeAsync(function () {
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

      this.component.search = customFunction;

      this.fixture.detectChanges();

      const inputElement = getInputElement();
      const spy = spyOn(this.autocomplete, 'search').and.callThrough();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy.calls.argsFor(0)[0]).toEqual('r');
      expect(customSearchCalled).toEqual(true);
    }));

    it('should handle items that do not have the descriptor property',
      fakeAsync(function () {
        this.component.data = [{
          foo: 'bar'
        }];

        this.fixture.detectChanges();

        const inputElement = this.input['elementRef'].nativeElement;
        const spy = spyOn(this.autocomplete, 'search').and.callThrough();

        inputElement.value = 'r';

        TestUtility.fireKeyboardEvent(inputElement, 'keyup');
        tick();
        this.fixture.detectChanges();
        tick();

        expect(this.autocomplete.searchResults.length).toEqual(0);
        expect(spy.calls.argsFor(0)[0]).toEqual('r');
      })
    );

    it('should handle disabled input', fakeAsync(function () {
      const inputElement = getInputElement();

      inputElement.disabled = true;

      this.fixture.detectChanges();
      tick();
      this.fixture.detectChanges();

      const spy = spyOn(this.autocomplete, 'search').and.callThrough();

      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      expect(spy).not.toHaveBeenCalled();
    }));

    it('should handle missing skyAutocomplete directive', fakeAsync(function () {
      this.fixture.detectChanges();
      this.component.autocomplete['inputDirective'] = undefined;
      tick();

      try {
        this.autocomplete.ngAfterContentInit();
      } catch (e) {
        expect(e.message.indexOf('The SkyAutocompleteComponent requires a ContentChild input') > -1).toEqual(true);
      }
    }));

    it('should set the width of the dropdown on window resize', fakeAsync(function () {
      const adapterSpy = spyOn(this.autocomplete['adapter'], 'watchDropdownWidth').and.callThrough();
      const rendererSpy = spyOn(this.autocomplete['adapter']['renderer'], 'setStyle').and.callThrough();

      this.fixture.detectChanges();

      const inputElement = getInputElement();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      const event = document.createEvent('CustomEvent');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
      tick();

      expect(adapterSpy).toHaveBeenCalledWith(this.autocomplete['elementRef']);

      const dropdownElement = document.querySelector('.sky-popover-container');
      const autocompleteElement = getAutocompleteElement();
      const formattedWidth = `${autocompleteElement.getBoundingClientRect().width}px`;

      expect(rendererSpy).toHaveBeenCalledWith(dropdownElement, 'width', formattedWidth);
    }));
  });

  describe('keyboard interactions', function () {
    it('should notify selection when enter key pressed', fakeAsync(function () {
      this.fixture.detectChanges();

      const inputElement = getInputElement();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      const messageSpy = spyOn(this.autocomplete as any, 'sendDropdownMessage')
        .and.callThrough();
      const notifySpy = spyOn(this.autocomplete.selectionChange, 'emit')
        .and.callThrough();
      const autocompleteElement = getAutocompleteElement();

      TestUtility.fireKeyboardEvent(autocompleteElement, 'keydown', {
        key: 'Enter'
      });
      tick();

      expect(this.input.value.name).toEqual('Red');
      expect(messageSpy).toHaveBeenCalledWith(SkyDropdownMessageType.Close);
      expect(notifySpy).toHaveBeenCalledWith({
        selectedItem: this.input.value
      });
    }));

    it('should notify selection when tab key pressed', fakeAsync(function () {
      this.fixture.detectChanges();

      const inputElement = getInputElement();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      const messageSpy = spyOn(this.autocomplete as any, 'sendDropdownMessage')
        .and.callThrough();
      const notifySpy = spyOn(this.autocomplete.selectionChange, 'emit')
        .and.callThrough();
      const autocompleteElement = getAutocompleteElement();

      TestUtility.fireKeyboardEvent(autocompleteElement, 'keydown', {
        key: 'Tab'
      });
      tick();

      expect(this.input.value.name).toEqual('Red');
      expect(messageSpy).toHaveBeenCalledWith(SkyDropdownMessageType.Close);
      expect(notifySpy).toHaveBeenCalledWith({
        selectedItem: this.input.value
      });
    }));

    it('should navigate items with arrow keys', fakeAsync(function () {
      this.fixture.detectChanges();

      this.input.textValue = 'r';
      this.input.textChanges.emit({ value: 'r' });
      tick();
      this.fixture.detectChanges();

      const spy = spyOn(this.autocomplete as any, 'sendDropdownMessage')
        .and.callThrough();
      const autocompleteElement = getAutocompleteElement();
      const dropdownElement = autocompleteElement
        .querySelector('sky-dropdown-menu') as HTMLElement;

      TestUtility.fireKeyboardEvent(dropdownElement, 'keydown', {
        key: 'arrowdown'
      });
      tick();

      TestUtility.fireKeyboardEvent(dropdownElement, 'keydown', {
        key: 'arrowup'
      });
      tick();

      expect(spy)
        .toHaveBeenCalledWith(SkyDropdownMessageType.FocusPreviousItem);
      expect(spy)
        .toHaveBeenCalledWith(SkyDropdownMessageType.FocusNextItem);
    }));

    it('should trigger a new search when the down arrow key is pressed',
      fakeAsync(function () {
        this.fixture.detectChanges();

        const inputElement = getInputElement();
        const spy = spyOn(this.autocomplete, 'search').and.callThrough();

        inputElement.value = 'r';
        TestUtility.fireKeyboardEvent(inputElement, 'keyup');
        tick();

        expect(spy.calls.argsFor(0)[0]).toEqual('r');

        spy.calls.reset();
        this.autocomplete['_searchResults'] = [];
        this.fixture.detectChanges();

        const autocompleteElement = getAutocompleteElement();
        TestUtility.fireKeyboardEvent(autocompleteElement, 'keydown', {
          key: 'arrowdown'
        });
        tick();

        expect(spy.calls.argsFor(0)[0]).toEqual('r');
      })
    );

    it('should close the menu when escape key pressed', fakeAsync(function () {
      this.fixture.detectChanges();

      const inputElement = getInputElement();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();

      const spy = spyOn(this.autocomplete as any, 'sendDropdownMessage').and.callThrough();
      const autocompleteElement = getAutocompleteElement();

      TestUtility.fireKeyboardEvent(autocompleteElement, 'keydown', { key: 'Escape' });
      tick();

      expect(spy).toHaveBeenCalledWith(SkyDropdownMessageType.Close);
      expect(this.autocomplete.searchResults.length).toEqual(0);
    }));

    it('should reset input text value to descriptor value on blur',
      fakeAsync(function () {
        this.fixture.detectChanges();

        const selectedValue = { name: 'Red' };
        this.component.model.favoriteColor = selectedValue;

        this.fixture.detectChanges();
        tick();
        this.fixture.detectChanges();

        const inputElement = getInputElement();
        this.input.textValue = 're';

        expect(inputElement.value).toEqual('re');

        TestUtility.fireKeyboardEvent(inputElement, 'blur');
        tick();

        expect(this.component.myForm.value.favoriteColor).toEqual(selectedValue);
        expect(this.input.value).toEqual(selectedValue);
        expect(inputElement.value).toEqual(selectedValue.name);
      })
    );

    it('should not reset input text value if unchanged', fakeAsync(function () {
      this.fixture.detectChanges();

      const selectedValue = { name: 'Red' };
      this.component.model.favoriteColor = selectedValue;

      this.fixture.detectChanges();
      tick();
      this.fixture.detectChanges();

      const inputElement = getInputElement();
      this.input.textValue = 'Red';

      const spy = spyOnProperty(this.input, 'textValue', 'set').and.callThrough();

      expect(inputElement.value).toEqual('Red');

      TestUtility.fireKeyboardEvent(inputElement, 'blur');
      tick();

      expect(spy).not.toHaveBeenCalled();
    }));

    it('should clear the input selected value if text value empty on blur',
      fakeAsync(function () {
        this.fixture.detectChanges();

        const selectedValue = { name: 'Red' };
        this.component.model.favoriteColor = selectedValue;

        this.fixture.detectChanges();
        tick();
        this.fixture.detectChanges();

        const inputElement = getInputElement();
        this.input.textValue = '';

        expect(inputElement.value).toEqual('');

        TestUtility.fireKeyboardEvent(inputElement, 'blur');
        tick();

        expect(this.component.myForm.value.favoriteColor).toEqual({ });
        expect(this.input.value).toEqual({ });
        expect(inputElement.value).toEqual('');
      })
    );
  });

  describe('mouse interactions', function () {
    it('should notify selection change on item click', fakeAsync(function () {
      this.fixture.detectChanges();

      const inputElement = getInputElement();

      inputElement.value = 'r';
      TestUtility.fireKeyboardEvent(inputElement, 'keyup');
      tick();
      this.fixture.detectChanges();

      const messageSpy = spyOn(this.autocomplete as any, 'sendDropdownMessage')
        .and.callThrough();
      const notifySpy = spyOn(this.autocomplete.selectionChange, 'emit')
        .and.callThrough();
      const firstItem = getAutocompleteElement()
        .querySelector('.sky-dropdown-item') as HTMLElement;

      firstItem.querySelector('button').click();
      tick();

      expect(this.input.value.name).toEqual('Red');
      expect(messageSpy).toHaveBeenCalledWith(SkyDropdownMessageType.Close);
      expect(notifySpy).toHaveBeenCalledWith({
        selectedItem: this.input.value
      });
    }));

    it('should not close the dropdown during input blur if mouseenter',
      fakeAsync(function () {
        this.fixture.detectChanges();

        const inputElement = getInputElement();

        inputElement.value = 'r';
        TestUtility.fireKeyboardEvent(inputElement, 'keyup');
        tick();
        this.fixture.detectChanges();
        tick();

        const spy = spyOn(this.autocomplete as any, 'sendDropdownMessage').and.callThrough();

        TestUtility.fireKeyboardEvent(inputElement, 'mouseenter');
        tick();
        this.fixture.detectChanges();
        tick();

        this.input.blur.emit();
        tick();

        expect(spy).not.toHaveBeenCalled();
        spy.calls.reset();

        TestUtility.fireKeyboardEvent(inputElement, 'mouseleave');
        tick();
        this.fixture.detectChanges();
        tick();

        this.input.blur.emit();
        tick();

        expect(spy).toHaveBeenCalled();
      })
    );
  });
});
