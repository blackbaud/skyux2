import {
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
  SkyLookupComponent
  // SkyLookupMessageType
} from './index';

import { SkyLookupFixturesModule } from './fixtures/lookup-fixtures.module';
import { SkyLookupTestComponent } from './fixtures/lookup.component.fixture';

fdescribe('Tokens component', () => {
  let fixture: ComponentFixture<SkyLookupTestComponent>;
  let component: SkyLookupTestComponent;
  let lookupComponent: SkyLookupComponent;

  function performSearch(searchText: string) {
    const inputElement = getInputElement();
    inputElement.value = searchText;
    TestUtility.fireKeyboardEvent(inputElement, 'keyup', {
      key: ''
    });
    tick();
    fixture.detectChanges();
    tick();
  }

  function selectSearchResult(index: number) {
    const dropdownButtons = document.querySelectorAll('.sky-dropdown-menu button');
    (dropdownButtons.item(index) as HTMLElement).click();
    tick();
    fixture.detectChanges();
    tick();
  }

  function dismissSelectedItem(index: number) {
    const tokenElements = document.querySelectorAll('.sky-token');
    (tokenElements.item(index).querySelector('.sky-token-btn-close') as HTMLElement).click();
    tick();
    fixture.detectChanges();
    tick();
  }

  function getInputElement(): HTMLInputElement {
    return lookupComponent['lookupInput'].nativeElement as HTMLInputElement;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyLookupFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkyLookupTestComponent);
    component = fixture.componentInstance;
    lookupComponent = component.lookupComponent;
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('basic setup', () => {
    it('should set defaults', () => {
      expect(lookupComponent.ariaLabel).toEqual(undefined);
      expect(lookupComponent.ariaLabelledBy).toEqual(undefined);
      expect(lookupComponent.disabled).toEqual(false);
      expect(lookupComponent.placeholderText).toEqual(undefined);
      expect(lookupComponent.tokens).toEqual(undefined);
      expect(lookupComponent.value).toEqual([]);
    });

    it('should share the same inputs as autocomplete', () => {
      fixture.detectChanges();
      expect(typeof lookupComponent.data).not.toBeUndefined();
      expect(typeof lookupComponent.descriptorProperty).not.toBeUndefined();
      expect(typeof lookupComponent.propertiesToSearch).not.toBeUndefined();
      expect(typeof lookupComponent.search).not.toBeUndefined();
      expect(typeof lookupComponent.searchResultTemplate).not.toBeUndefined();
      expect(typeof lookupComponent.searchTextMinimumCharacters).not.toBeUndefined();
      expect(typeof lookupComponent.searchFilters).not.toBeUndefined();
      expect(typeof lookupComponent.searchResultsLimit).not.toBeUndefined();
    });

    it('should allow preselected items', () => {
      const friends = [{ name: 'Rachel' }];
      component.friends = friends;
      expect(lookupComponent.value).toEqual([]);
      fixture.detectChanges();
      expect(lookupComponent.value).toEqual(friends);
    });

    it('should add new selected items', fakeAsync(() => {
      fixture.detectChanges();
      expect(lookupComponent.value).toEqual([]);

      performSearch('s');
      selectSearchResult(0);

      const selectedItems = lookupComponent.value;
      expect(selectedItems.length).toEqual(1);
      expect(selectedItems[0].name).toEqual('Isaac');
    }));

    it('should change the value of the lookup if selected items change', fakeAsync(() => {
      fixture.detectChanges();
      expect(lookupComponent.value).toEqual([]);

      performSearch('s');
      selectSearchResult(0);

      performSearch('s');
      selectSearchResult(1);

      expect(lookupComponent.value.length).toEqual(2);

      dismissSelectedItem(0);

      expect(lookupComponent.value.length).toEqual(1);
    }));
  });

  // describe('input focus', () => {
  //   it('should focus if all selected items are dismissed', fakeAsync(() => {
  //     component.friends = [{ name: 'Rachel' }];
  //     fixture.detectChanges();

  //     dismissSelectedItem(0);

  //     const inputElement = getInputElement();
  //     expect(lookupComponent.value.length).toEqual(0);
  //     expect(document.activeElement).toEqual(inputElement);
  //   }));

  //   it('should focus if ArrowRight key is pressed on the last selected item', fakeAsync(() => {
  //     component.friends = [{ name: 'Rachel' }];
  //     fixture.detectChanges();

  //     const tokenHostElements = document.querySelectorAll('sky-token');
  //     TestUtility.fireKeyboardEvent(tokenHostElements.item(0), 'keyup', {
  //       key: 'ArrowRight'
  //     });
  //     tick();
  //     fixture.detectChanges();
  //     tick();

  //     const inputElement = getInputElement();
  //     expect(document.activeElement).toEqual(inputElement);
  //   }));
  // });

  // describe('events', () => {
  //   it('should not add event listeners if disabled', () => {
  //     lookupComponent.disabled = true;
  //     const spy = spyOn(lookupComponent as any, 'addEventListeners').and.callThrough();
  //     fixture.detectChanges();
  //     expect(spy).not.toHaveBeenCalled();
  //   });
  // });

  // describe('keyboard interactions', () => {});

  // describe('mouse interactions', () => {});
});
