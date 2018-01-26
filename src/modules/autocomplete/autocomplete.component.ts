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

import { Subject } from 'rxjs/Subject';

import {
  SkyDropdownMenuChange,
  SkyDropdownMessageType,
  SkyDropdownMessage
} from '../dropdown';

import {
  SkyAutocompleteInputTextChange,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionFilter,
  SkyAutocompleteSelectionChange
} from './types';

// import { SkyAutocompleteAdapterService } from './autocomplete-adapter.service';
import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';
import { skyAutocompleteDefaultSearchFunction } from './autocomplete-default-search-function';

@Component({
  selector: 'sky-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  // providers: [SkyAutocompleteAdapterService],
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
    return (this._searchTextMinimumCharacters > 0) ? this._searchTextMinimumCharacters : 1;
  }

  @Input()
  public data: any[];

  @Input()
  public searchFilters: SkyAutocompleteSearchFunctionFilter[] = [];

  @Input()
  public searchResultsLimit: number;

  @Input()
  public searchResultTemplate: TemplateRef<any>;

  @Output()
  public selectionChange = new EventEmitter<SkyAutocompleteSelectionChange>();

  public dropdownController = new Subject<SkyDropdownMessage>();
  public searchResults: any[];
  public searchText: string;

  @ContentChild(SkyAutocompleteInputDirective)
  private inputDirective: SkyAutocompleteInputDirective;
  private destroy = new Subject<boolean>();
  // private isMouseEnter = false;
  // private isOpen = false;
  private searchResultsIndex = 0;
  private defaultSearchFunction: SkyAutocompleteSearchFunction;

  private _descriptorProperty: string;
  private _propertiesToSearch: string[];
  private _search: SkyAutocompleteSearchFunction;
  private _searchTextMinimumCharacters: number;

  public constructor(
    // private adapterService: SkyAutocompleteAdapterService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.defaultSearchFunction = skyAutocompleteDefaultSearchFunction({
      propertiesToSearch: this.propertiesToSearch,
      searchFilters: this.searchFilters,
      searchResultsLimit: this.searchResultsLimit
    });
  }

  public ngAfterContentInit() {
    if (!this.inputDirective) {
      throw Error([
        'The SkyAutocompleteComponent requires a TemplateChild input or textarea bound with',
        'the SkyAutocomplete directive. For example: `<input type="text" skyAutocomplete>`.'
      ].join(' '));
    }

    this.inputDirective.descriptorProperty = this.descriptorProperty;
    this.inputDirective.inputTextChange
      .takeUntil(this.destroy)
      .subscribe((change: SkyAutocompleteInputTextChange) => {
        this.searchTextChanged(change.value);
      });
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  // @HostListener('keydown', ['$event'])
  // public onKeyDown(event: any) {
  //   this.adapterService.handleKeyDown(event);
  // }

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
      // if (!this.isOpen) {
      //   this.openDropdown();
      // }

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

  // @HostListener('document:click')
  // public onDocumentClick() {
  //   if (!this.isMouseEnter) {
  //     this.closeDropdown();
  //   }
  // }

  // @HostListener('mouseenter')
  // public onMouseEnter() {
  //   this.isMouseEnter = true;
  // }

  // @HostListener('mouseleave')
  // public onMouseLeave() {
  //   this.isMouseEnter = false;
  // }

  public onMenuChanges(change: SkyDropdownMenuChange) {
    if (change.activeIndex !== undefined) {
      this.searchResultsIndex = change.activeIndex;
    }

    if (change.selectedItem) {
      this.selectActiveSearchResult();
    }
  }

  // public onDropdownClose() {
  //   this.isOpen = false;
  // }

  public hasSearchResults(): boolean {
    return (this.searchResults && this.searchResults.length > 0);
  }

  private searchTextChanged(searchText = '') {
    const isSearchTextEmpty = (!searchText || searchText.match(/^\s+$/));

    if (isSearchTextEmpty) {
      this.searchText = '';
      this.closeDropdown();
      return;
    }

    const isSearchTextLongEnough = (searchText.length >= this.searchTextMinimumCharacters);
    const isSearchTextDifferent = (searchText !== this.searchText);

    if (isSearchTextLongEnough && isSearchTextDifferent) {
      this.searchText = searchText.trim();
      this.performSearch().then((results: any[]) => {
        this.searchResults = results;
        this.openDropdown();
        this.changeDetector.markForCheck();
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
      this.inputDirective.selectedItem = result;

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
    // this.isOpen = true;
    this.sendDropdownMessage(SkyDropdownMessageType.Open);
  }

  private closeDropdown() {
    this.searchResults = [];
    this.sendDropdownMessage(SkyDropdownMessageType.Close);
  }

  private sendDropdownMessage(type: SkyDropdownMessageType) {
    this.dropdownController.next({ type });
  }
}
