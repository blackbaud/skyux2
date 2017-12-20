import {
  AfterContentInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  TemplateRef
} from '@angular/core';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyDropdownMessageType,
  SkyDropdownMessageEventArgs
} from '../dropdown';

import {
  SkyAutocompleteInputDirective
} from './autocomplete-input.directive';

import {
  SkyAutocompleteChanges,
  SkyAutocompleteSearchResultSelectedEventArgs,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchResponse
} from './types';

@Component({
  selector: 'sky-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAutocompleteComponent implements AfterContentInit, OnDestroy {
  @Input()
  public set search(value: SkyAutocompleteSearchFunction) {
    this._searchFunction = value;
  }
  public get search(): SkyAutocompleteSearchFunction {
    return this._searchFunction || this.defaultSearchFunction;
  }

  @Input()
  public set propertiesToSearch(value: string[]) {
    this._propertiesToSearch = value;
  }
  public get propertiesToSearch(): string[] {
    return this._propertiesToSearch || ['name'];
  }

  @Input()
  public data: any[];

  @Input()
  public descriptorProperty = 'name';

  @Input()
  public searchResultTemplate: TemplateRef<any>;

  @Input()
  public searchResultsLimit: number;
  public searchResults: any[];
  public searchResultsIndex = 0;

  @Output()
  public resultSelected = new EventEmitter<SkyAutocompleteSearchResultSelectedEventArgs>();

  @ContentChild(SkyAutocompleteInputDirective)
  public inputDirective: SkyAutocompleteInputDirective;

  public dropdownMessages = new Subject<SkyDropdownMessageEventArgs>();

  public selectedItem: any;
  public searchText: string;

  private isMouseEnter = false;
  private subscriptions: Subscription[] = [];

  private _searchFunction: SkyAutocompleteSearchFunction;
  private _propertiesToSearch: string[];

  public constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterContentInit() {
    this.subscriptions.push(
      this.inputDirective.valueChanges
        .subscribe((changes: SkyAutocompleteChanges) => {
          const searchText = changes.inputValue;

          if (this.isTextEmpty(searchText)) {
            this.searchText = '';
            this.resetSearchResults();
            this.changeDetector.markForCheck();
            return;
          }

          if (searchText !== this.searchText) {
            this.searchText = searchText.trim();

            this.performSearch(searchText)
              .then((results: any[]) => {
                this.searchResults = results;
                this.openDropdown();
                this.changeDetector.markForCheck();
              });
          }
        })
      );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  // Handles keyboard events that affect usability and interaction.
  // (Keydown is needed to override default browser behavior.)
  @HostListener('keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    switch (key) {
      case 'arrowdown':
      event.preventDefault();
      this.dropdownMessages.next({
        message: SkyDropdownMessageType.FocusNextItem
      });
      break;

      case 'arrowup':
      event.preventDefault();
      this.dropdownMessages.next({
        message: SkyDropdownMessageType.FocusPreviousItem
      });
      break;

      case 'tab':
      case 'enter':
      if (this.hasSearchResults()) {
        event.preventDefault();
        this.selectActiveSearchResult();
      }
      break;

      case 'escape':
      event.preventDefault();
      event.stopPropagation();
      this.resetSearch();
      this.inputDirective.focusElement();
      break;

      default:
      break;
    }
  }

  // Close search results when clicking outside of the component.
  @HostListener('document:click')
  public onDocumentClick() {
    if (!this.isMouseEnter) {
      // this.handlePartialSearch();
      this.resetSearchResults();
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.isMouseEnter = true;
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.isMouseEnter = false;
  }

  public resetSearch() {
    /* sanity check */
    if (this.selectedItem) {
      if (this.searchText !== this.selectedItem[this.descriptorProperty]) {
        this.searchText = '';
      }
    } else {
      this.searchText = '';
    }

    this.inputDirective.value = this.searchText;
    this.resetSearchResults();
  }

  public resetSearchResults() {
    this.searchResults = [];
    this.closeDropdown();
  }

  public onMenuChanges(changes: any) {
    this.searchResultsIndex = changes.activeIndex;
  }

  public closeDropdown() {
    this.dropdownMessages.next({
      message: SkyDropdownMessageType.Close
    });
  }

  public openDropdown() {
    this.dropdownMessages.next({
      message: SkyDropdownMessageType.Open
    });
  }

  public onSearchResultClicked(index: number) {
    this.searchResultsIndex = index;
    this.selectActiveSearchResult();
  }

  private selectActiveSearchResult() {
    if (this.hasSearchResults()) {
      const result = this.searchResults[this.searchResultsIndex];

      this.searchText = result[this.descriptorProperty];
      this.selectedItem = result;

      this.resetSearch();
      this.notifyResultSelected(result);
    }
  }

  private performSearch(searchText: string): Promise<any> {
    const searchResult: SkyAutocompleteSearchResponse = this.search(searchText);

    // Synchronous result should be wrapped in a promise.
    if (searchResult instanceof Array) {
      return Promise.resolve(searchResult);
    }

    return searchResult;
  }

  // If the search text matches an unselected result, and the user clicks
  // off of the component, automatically select the result.
  // private handlePartialSearch() {
  //   if (this.hasSearchResults()) {
  //     const activeResult = this.searchResults[this.searchResultsIndex];
  //     const resultTextLower = activeResult[this.descriptorProperty].toLowerCase();
  //     const searchTextLower = this.searchText.toLowerCase();

  //     if (resultTextLower === searchTextLower) {
  //       this.selectActiveSearchResult();
  //     }
  //   }
  // }

  private defaultSearchFunction(searchText: string): SkyAutocompleteSearchResponse {
    const searchTextLower = searchText.toLowerCase();
    const results = [];

    for (let i = 0, n = this.data.length; i < n; i++) {
      // TODO: add filters here (limit included)!
      const limitReached = (
        this.searchResultsLimit &&
        results.length >= this.searchResultsLimit
      );

      if (limitReached) {
        return results;
      }

      const result = this.data[i];

      const isMatch = this.propertiesToSearch.filter((property: string) => {
        const val = result[property] || '';
        return (val.toString().toLowerCase().indexOf(searchTextLower) > -1);
      })[0];

      if (isMatch) {
        results.push(result);
      }
    }

    return results;
  }

  // private incrementActiveSearchResultIndex() {
  //   this.searchResultsIndex++;

  //   if (this.searchResultsIndex >= this.searchResults.length) {
  //     this.searchResultsIndex = 0;
  //   }
  // }

  // private decrementActiveSearchResultIndex() {
  //   if (!this.hasSearchResults()) {
  //     this.searchResultsIndex = 0;
  //     return;
  //   }

  //   this.searchResultsIndex--;

  //   if (this.searchResultsIndex < 0) {
  //     this.searchResultsIndex = this.searchResults.length - 1;
  //   }
  // }

  private notifyResultSelected(result: any) {
    this.resultSelected.emit({
      result
    });
  }

  private hasSearchResults(): boolean {
    return (this.searchResults && this.searchResults.length > 0);
  }

  private isTextEmpty(text: string) {
    return (!text || text.match(/^\s+$/));
  }
}
