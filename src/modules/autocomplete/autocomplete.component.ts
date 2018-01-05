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

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import {
  SkyDropdownMenuChanges,
  SkyDropdownMessageType,
  SkyDropdownMessageEventArgs
} from '../dropdown';

import {
  SkyAutocompleteInputChangeEventArgs,
  SkyAutocompleteSelectionChangeEventArgs,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchResponse,
  SkyAutocompleteSearchResultSelectedEventArgs
} from './types';

import {
  SkyAutocompleteInputDirective
} from './autocomplete-input.directive';

@Component({
  selector: 'sky-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAutocompleteComponent implements AfterContentInit, OnDestroy {
  @Input()
  public search: SkyAutocompleteSearchFunction = this.defaultSearchFunction;

  // Only applicable to default search
  @Input()
  public data: any[];

  // Only applicable to default search
  @Input()
  public propertiesToSearch = ['name'];

  // Only applicable to default search
  @Input()
  public searchResultsLimit: number;

  @Input()
  public descriptorProperty = 'name';

  @Input()
  public searchTextMinimumCharacters = 1;

  @Input()
  public searchResultTemplate: TemplateRef<any>;

  @Output()
  public selectionChange = new EventEmitter<SkyAutocompleteSelectionChangeEventArgs>();

  @ContentChild(SkyAutocompleteInputDirective)
  public inputDirective: SkyAutocompleteInputDirective;

  public dropdownMessageStream = new Subject<SkyDropdownMessageEventArgs>();
  public searchResults: any[];
  public searchText: string;

  private isMouseEnter = false;
  private searchResultsIndex = 0;
  private subscriptions: Subscription[] = [];

  public constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterContentInit() {
    this.subscriptions.push(
      this.inputDirective.valueChange
        .subscribe((args: SkyAutocompleteInputChangeEventArgs) => {
          this.searchTextChanged(args.value);
        })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  // Handles keyboard events that affect usability and interaction.
  // ('keydown' is needed to override default browser behavior.)
  @HostListener('keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    switch (key) {
      case 'arrowdown':
      this.sendDropdownMessage(SkyDropdownMessageType.FocusNextItem);
      event.preventDefault();
      break;

      case 'arrowup':
      this.sendDropdownMessage(SkyDropdownMessageType.FocusPreviousItem);
      event.preventDefault();
      break;

      case 'tab':
      case 'enter':
      if (this.hasSearchResults()) {
        this.selectActiveSearchResult();
        event.preventDefault();
      }
      break;

      case 'escape':
      this.resetSearchResults();
      this.inputDirective.focusElement();
      event.preventDefault();
      event.stopPropagation();
      break;

      default:
      break;
    }
  }

  // Close search results when clicking outside of the component.
  @HostListener('document:click')
  public onDocumentClick() {
    if (!this.isMouseEnter) {
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

  public onMenuChange(changes: SkyDropdownMenuChanges) {
    this.searchResultsIndex = changes.activeIndex;
  }

  public openDropdown() {
    this.sendDropdownMessage(SkyDropdownMessageType.Open);
  }

  public closeDropdown() {
    this.sendDropdownMessage(SkyDropdownMessageType.Close);
  }

  public onSearchResultClick(index: number) {
    this.searchResultsIndex = index;
    this.selectActiveSearchResult();
  }

  public hasSearchResults(): boolean {
    return (this.searchResults && this.searchResults.length > 0);
  }

  private searchTextChanged(searchText = '') {
    const isSearchTextEmpty = (!searchText || searchText.match(/^\s+$/));

    if (isSearchTextEmpty) {
      this.resetSearchResults();
      this.changeDetector.markForCheck();
      return;
    }

    const isSearchTextLongEnough = (searchText.length >= this.searchTextMinimumCharacters);
    const isSearchTextDifferent = (searchText !== this.searchText);

    if (isSearchTextLongEnough && isSearchTextDifferent) {
      searchText = searchText.trim();
      this.searchText = searchText;

      this.performSearch(searchText).then((results: any[]) => {
        this.searchResults = results;
        this.openDropdown();
        this.changeDetector.markForCheck();
      });
    }
  }

  private performSearch(searchText: string): Promise<any> {
    const searchResult: SkyAutocompleteSearchResponse = this.search(searchText);

    if (searchResult instanceof Array) {
      return Promise.resolve(searchResult);
    }

    return searchResult;
  }

  private defaultSearchFunction(searchText: string): SkyAutocompleteSearchResponse {
    const searchTextLower = searchText.toLowerCase();
    const results = [];

    for (let i = 0, n = this.data.length; i < n; i++) {
      const limitReached = (
        this.searchResultsLimit &&
        this.searchResultsLimit <= results.length
      );

      if (limitReached) {
        return results;
      }

      const result = this.data[i];
      const isMatch = this.propertiesToSearch.find((property: string) => {
        const value = (result[property] || '').toString().toLowerCase();
        return (value.indexOf(searchTextLower) > -1);
      });

      if (isMatch) {
        results.push(result);
      }
    }

    return results;
  }

  private selectActiveSearchResult() {
    if (this.hasSearchResults()) {
      const result = this.searchResults[this.searchResultsIndex];
      const value = result[this.descriptorProperty];

      this.searchText = value;
      this.inputDirective.value = value;

      this.resetSearchResults();
      this.selectionChange.emit({
        searchResult: result
      });
    }
  }

  private resetSearchResults() {
    this.searchResults = [];
    this.closeDropdown();
  }

  private sendDropdownMessage(message: SkyDropdownMessageType) {
    this.dropdownMessageStream.next({ message });
  }
}
