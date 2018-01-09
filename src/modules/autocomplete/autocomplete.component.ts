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
  SkyDropdownMenuChange,
  SkyDropdownMessageType,
  SkyDropdownMessage
} from '../dropdown';

import {
  SkyAutocompleteInputTextChange,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionResponse,
  SkyAutocompleteSelectionChange
} from './types';

import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';

@Component({
  selector: 'sky-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAutocompleteComponent implements AfterContentInit, OnDestroy {
  @Input()
  public set descriptorProperty(value: string) {
    this._descriptorProperty = value;
  }

  public get descriptorProperty(): string {
    return this._descriptorProperty || 'name';
  }

  @Input()
  public set propertiesToSearch(value: string[]) {
    this._propertiesToSearch = value;
  }

  public get propertiesToSearch(): string[] {
    return this._propertiesToSearch || ['name'];
  }

  @Input()
  public set search(value: SkyAutocompleteSearchFunction) {
    this._search = value;
  }

  public get search(): SkyAutocompleteSearchFunction {
    return this._search || this.defaultSearchFunction;
  }

  @Input()
  public set searchTextMinimumCharacters(value: number) {
    this._searchTextMinimumCharacters = value;
  }

  public get searchTextMinimumCharacters(): number {
    if (this._searchTextMinimumCharacters > 0) {
      return this._searchTextMinimumCharacters;
    }

    return 1;
  }

  @Input()
  public data: any[];

  @Input()
  public searchResultsLimit: number;

  @Input()
  public searchResultTemplate: TemplateRef<any>;

  @Output()
  public selectionChange = new EventEmitter<SkyAutocompleteSelectionChange>();

  @ContentChild(SkyAutocompleteInputDirective)
  public inputDirective: SkyAutocompleteInputDirective;

  public dropdownMessageStream = new Subject<SkyDropdownMessage>();
  public searchResults: any[];
  public searchText: string;

  private isMouseEnter = false;
  private searchResultsIndex = 0;
  private subscriptions: Subscription[] = [];

  private _descriptorProperty: string;
  private _propertiesToSearch: string[];
  private _search: SkyAutocompleteSearchFunction;
  private _searchTextMinimumCharacters: number;

  public constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterContentInit() {
    if (!this.inputDirective) {
      throw Error([
        'The SkyAutocompleteComponent requires a TemplateChild input or textarea bound with',
        'the SkyAutocomplete directive. For example: `<input type="text" skyAutocomplete>`.'
      ].join(' '));
    }

    this.inputDirective.descriptorProperty = this.descriptorProperty;

    this.subscriptions.push(
      this.inputDirective.inputTextChange.subscribe((change: SkyAutocompleteInputTextChange) => {
        this.searchTextChanged(change.value);
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
      this.closeDropdown();
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
      this.closeDropdown();
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

  public onMenuChange(change: SkyDropdownMenuChange) {
    this.searchResultsIndex = change.activeIndex;
  }

  public openDropdown() {
    this.sendDropdownMessage(SkyDropdownMessageType.Open);
  }

  public closeDropdown() {
    this.searchResults = [];
    this.sendDropdownMessage(SkyDropdownMessageType.Close);
    this.changeDetector.markForCheck();
  }

  public onSearchResultClick(index: number) {
    this.searchResultsIndex = index;
    this.selectActiveSearchResult();
  }

  public hasSearchResults(): boolean {
    return (this.searchResults && this.searchResults.length > 0);
  }

  public searchTextChanged(searchText = '') {
    const isSearchTextEmpty = (!searchText || searchText.match(/^\s+$/));

    if (isSearchTextEmpty) {
      this.searchText = '';
      this.closeDropdown();
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
    const searchResult: SkyAutocompleteSearchFunctionResponse = this.search(searchText);

    if (searchResult instanceof Array) {
      return Promise.resolve(searchResult);
    }

    return searchResult;
  }

  private defaultSearchFunction(searchText: string): SkyAutocompleteSearchFunctionResponse {
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
      this.searchText = result[this.descriptorProperty];
      this.inputDirective.value = result;
      this.notifySelectionChange(result);
      this.closeDropdown();
    }
  }

  private sendDropdownMessage(type: SkyDropdownMessageType) {
    this.dropdownMessageStream.next({ type });
  }

  private notifySelectionChange(selection: any) {
    this.selectionChange.emit({
      searchResult: selection
    });
  }
}
