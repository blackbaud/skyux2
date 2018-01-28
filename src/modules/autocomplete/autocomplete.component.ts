import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyDropdownMenuChange,
  SkyDropdownMessageType,
  SkyDropdownMessage
} from '../dropdown';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyAutocompleteInputTextChange,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionFilter,
  SkyAutocompleteSelectionChange
} from './types';

import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';
import { skyAutocompleteDefaultSearchFunction } from './autocomplete-default-search-function';

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
    return this._search || skyAutocompleteDefaultSearchFunction({
      propertiesToSearch: this.propertiesToSearch,
      searchFilters: this.searchFilters,
      searchResultsLimit: this.searchResultsLimit
    });
  }

  @Input()
  public set searchResultTemplate(value: TemplateRef<any>) {
    this._searchResultTemplate = value;
  }

  public get searchResultTemplate(): TemplateRef<any> {
    return this._searchResultTemplate || this.defaultSearchResultTemplate;
  }

  @Input()
  public set searchTextMinimumCharacters(value: number) {
    this._searchTextMinimumCharacters = value;
  }

  public get searchTextMinimumCharacters(): number {
    return (this._searchTextMinimumCharacters > 0) ? this._searchTextMinimumCharacters : 1;
  }

  @Input()
  public data: any[];

  @Input()
  public searchFilters: SkyAutocompleteSearchFunctionFilter[] = [];

  @Input()
  public searchResultsLimit: number;

  @Output()
  public selectionChange = new EventEmitter<SkyAutocompleteSelectionChange>();

  public dropdownController = new Subject<SkyDropdownMessage>();
  public searchResults: any[];
  public searchText: string;
  public highlightText: string;

  @ViewChild('defaultSearchResultTemplate')
  private defaultSearchResultTemplate: TemplateRef<any>;

  @ContentChild(SkyAutocompleteInputDirective)
  private inputDirective: SkyAutocompleteInputDirective;

  private destroy = new Subject<boolean>();
  private searchResultsIndex = 0;

  private _descriptorProperty: string;
  private _propertiesToSearch: string[];
  private _search: SkyAutocompleteSearchFunction;
  private _searchResultTemplate: TemplateRef<any>;
  private _searchTextMinimumCharacters: number;

  constructor(
    private windowRef: SkyWindowRefService
  ) { }

  public ngAfterContentInit() {
    if (!this.inputDirective) {
      throw Error([
        'The SkyAutocompleteComponent requires a ContentChild input or textarea bound with',
        'the SkyAutocomplete directive. For example: `<input type="text" skyAutocomplete>`.'
      ].join(' '));
    }

    this.inputDirective.displayWith = this.descriptorProperty;

    this.inputDirective.textChanges
      .takeUntil(this.destroy)
      .subscribe((change: SkyAutocompleteInputTextChange) => {
        this.searchTextChanged(change.value);
      });
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  // Handles keyboard events that affect usability and interaction.
  // ('keydown' is needed to override default browser behavior.)
  @HostListener('keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    /* tslint:disable-next-line:switch-default */
    switch (key) {
      case 'arrowup':
      this.sendDropdownMessage(SkyDropdownMessageType.FocusPreviousItem);
      event.preventDefault();
      break;

      case 'arrowdown':
      this.sendDropdownMessage(SkyDropdownMessageType.FocusNextItem);
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
      break;
    }
  }

  public onMenuChanges(change: SkyDropdownMenuChange) {
    if (change.activeIndex !== undefined) {
      this.searchResultsIndex = change.activeIndex;
    } else if (change.selectedItem) {
      this.selectActiveSearchResult();
    }
  }

  public hasSearchResults(): boolean {
    return (this.searchResults && this.searchResults.length > 0);
  }

  private searchTextChanged(searchText: string) {
    const isSearchTextEmpty = (!searchText || searchText.match(/^\s+$/));

    if (isSearchTextEmpty) {
      this.searchText = '';
      this.closeDropdown();
      return;
    }

    const isSearchTextLongEnough = (searchText.length >= this.searchTextMinimumCharacters);
    const isSearchTextDifferent = (searchText !== this.searchText);
    this.searchText = searchText.trim();

    if (isSearchTextLongEnough && isSearchTextDifferent) {
      this.performSearch().then((results: any[]) => {
        this.searchResults = results;
        this.openDropdown();
        this.highlightText = this.searchText;
      });
    }
  }

  private performSearch(): Promise<any> {
    const result = this.search(this.searchText, this.data);

    if (result instanceof Array) {
      return Promise.resolve(result);
    }

    return result;
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

  private notifySelectionChange(selection: any) {
    this.selectionChange.emit({
      selectedItem: selection
    });
  }

  private openDropdown() {
    this.sendDropdownMessage(SkyDropdownMessageType.Open);
    // Focus the first item once the menu is opened.
    this.windowRef.getWindow().setTimeout(() => {
       this.sendDropdownMessage(SkyDropdownMessageType.FocusNextItem);
    });
  }

  private closeDropdown() {
    this.searchResults = [];
    this.sendDropdownMessage(SkyDropdownMessageType.Close);
  }

  private sendDropdownMessage(type: SkyDropdownMessageType) {
    this.dropdownController.next({ type });
  }
}
