import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  QueryList,
  Renderer
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SkyDropdownAdapterService} from '../dropdown/dropdown-adapter.service';
import { SkyWindowRefService } from '../window';
import { SkyResourcesService } from '../resources';

export class SkyLookupSelectionChange {
  public before: Array<any>;
  public after: Array<any>;
}

@Component({
  selector: 'sky-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  providers: [
    SkyDropdownAdapterService,
    SkyResourcesService
  ]
})
export class SkyLookupComponent implements OnDestroy, OnInit {
  @Output()
  public selectionChange = new EventEmitter<SkyLookupSelectionChange>();

  @Input()
  public searchText: string;

  @Input()
  public get placeholderText(): string {
    if (this._placeholderText === undefined) {
      return this.resources.getString('search_placeholder');
    } else {
      return this._placeholderText;
    }
  }

  @Input()
  public multiple?: boolean = false;

  @Input()
  public data?: Array<any> = [];

  @Input()
  public selectedItems?: Array<any> = [];

  @Input()
  public searchDelay?: number = 300;

  @Input()
  public minChars?: number = 1;

  @Input()
  public propertiesToSearch?: Array<string> = ['name'];

  @Input()
  public descriptorProperty?: string = 'name';

  @Input()
  public resultsLimit?: number;

  public results: Array<any>;
  
  public set placeholderText(value: string) {
    this._placeholderText = value;
  }

  public searchInputFocused: boolean = false;

  private _placeholderText: string;

  @Input('template')
  public templateInput: TemplateRef<any>;

  public onChange: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(TemplateRef)
  private templates: QueryList<TemplateRef<any>>;

  public get template(): TemplateRef<any> {
    return this.templates.length > 0 ? this.templates.first : this.templateInput;
  }

  constructor(
    private renderer: Renderer,
    private elRef: ElementRef,
    private dropdownAdapter: SkyDropdownAdapterService,
    private resources: SkyResourcesService,
    private windowObj: SkyWindowRefService
  ) {
    this.dropdownAdapter.dropdownClose.subscribe(() => {
      this.open = false;
    });
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.closeMenu();
  }

  public inputFocused(isFocused: boolean) {
    this.searchInputFocused = isFocused;

    // When focus is lost, resolve the pending text to either select or clear the input field
    // WARNING: focus is allowed to walk into the context menu.
    if (!isFocused && !this.open) {
      this.resolvePartialSearch();
    }
  }

  public clearSearchText() {
    this.searchText = '';

    //this.searchAdapter.focusInput(this.elRef);
    // this.searchChange.emit(this.searchText);

    // this.searchApply.emit(this.searchText);
    // this.searchClear.emit();
    
    if (!this.multiple) {
      this.selectedItems.splice(0, this.selectedItems.length);
    }
  }

  public enterPress(event: KeyboardEvent, searchText: string) {
    if (event.which === 13 /* Enter Key */ || event.which === 40 /* Down Key */) {
      this.applySearchText(searchText);
      this.performSearch();
    } else if (event.which === 39 /* Right Key */) {
      this.resolvePartialSearch();
      this.closeMenu();
    } else if (event.which === 27 /* Escape Key */) {
      this.revertSelection();
      this.closeMenu();
    } else {
      this.queueSearch();
    }
  }

  public applySearchText(searchText: string) {
    if (searchText !== this.searchText) {
      this.searchText = searchText;
    }

    // this.searchApply.emit(searchText);
  }

  public searchTextChanged(searchText: string) {
    this.searchText = searchText;
  }

  // A search will be performed after the configured delay (default 300ms)
  // This delay prevents excessive work by waiting for the user to stop typing
  private currentWait: any;
  private queueSearch() {
    this.clearQueuedSearch();
    this.currentWait = setTimeout(() => this.performSearch(), this.searchDelay);
  }

  private clearQueuedSearch() {
    if (this.currentWait) {
      clearTimeout(this.currentWait);
      this.currentWait = undefined;
    }
  }

  private resolvePartialSearch() {
    // 1) If the search text has been cleared, clear the field
    if (!this.searchText || this.searchText.match(/^\s+$/)) {
      this.clearSearchText();
      return;
    }

    // 2) Select the first valid result (if the selected item isn't currently the value)
    if (this.multiple || !this.isSearchTextMatchingSelectedItem()) {
      this.updateSearchResults();
      if (this.results.length > 0) {
        this.selectItem(this.results[0]);
      } else {
        this.clearSearchText();
      }
    }
  }

  private performSearch() {
    this.clearQueuedSearch();
    if (this.searchText && this.searchText.length >= this.minChars
      && !this.isSearchTextMatchingSelectedItem()) {
      this.updateSearchResults();
      this.openMenu();
    }
  }
  private updateSearchResults() {
    let searchTextLower = this.searchText.toLowerCase();
    this.results = [];
    for (let i = 0, n = this.data.length; i < n; i++) {
      if (this.resultsLimit && this.results.length >= this.resultsLimit) {
        return;
      }
      let item = this.data[i];
      if ((!this.multiple || !this.isItemSelected(item))
        && this.isSearchMatch(item, searchTextLower)) {
        this.results.push(item);
      }
    }
  }
  private isItemSelected(item: any) {
    return this.selectedItems.findIndex((n) => { return (n === item); }) > -1;
  }
  private isSearchMatch(item: any, searchTextLower: string) {
    let n = this.propertiesToSearch.length;
    while (n--) {
      if ((item[this.propertiesToSearch[n]] || '').toLowerCase().indexOf(searchTextLower) > -1) {
        return true;
      }
    }
    return false;
  }
  private isSearchTextMatchingSelectedItem() {
    return !this.multiple && this.selectedItems.length > 0 &&
      this.selectedItems[0][this.descriptorProperty] === this.searchText.trim();
  }

  public selectItem(item: any) {
    if (this.multiple) {
      if (!this.isItemSelected(item)) {
        this.selectedItems.push(item);
      }
      this.searchText = '';
    } else {
      this.selectedItems.splice(0, this.selectedItems.length);
      this.selectedItems.push(item);
      this.searchText = item[this.descriptorProperty];
    }
    this.closeMenu();
  }
  public removeSelectedItem(item: any) {
    if (this.selectedItems) {
      let index = this.selectedItems.findIndex((n) => { return (n === item); });
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
    }
  }

  private revertSelection() {
    if (!this.multiple && this.selectedItems && this.selectedItems.length > 0) {
      this.searchText = this.selectedItems[0][this.descriptorProperty];
    } else {
      this.searchText = '';
    }
  }

  public windowClick() {
    if (this.searchInputFocused || this.open) {
      this.resolvePartialSearch();
    }
    this.closeMenu();
  }

  private open = false;
  private alignment: string = 'left';
  private openMenu() {
    if (!this.open) {
      this.dropdownAdapter.showDropdown(
        this.elRef,
        this.renderer,
        this.windowObj.getWindow(),
        this.alignment
      );
      this.open = true;
    }
  }

  public closeMenu() {
    this.clearQueuedSearch();
    this.dropdownAdapter.hideDropdown(this.elRef, this.renderer, this.windowObj.getWindow());
  }
}
