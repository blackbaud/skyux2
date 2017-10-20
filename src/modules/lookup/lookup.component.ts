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

import { SkyDropdownAdapterService} from '../dropdown/dropdown-adapter.service';
import { SkySearchAdapterService} from '../search/search-adapter.service';
import { SkyWindowRefService } from '../window';
import { SkyResourcesService } from '../resources';

export class SkyLookupSelectionChange {
  public added: Array<any>;
  public removed: Array<any>;
  public result: Array<any>;
}

@Component({
  selector: 'sky-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  providers: [
    SkyDropdownAdapterService,
    SkyResourcesService,
    SkySearchAdapterService
  ]
})
export class SkyLookupComponent implements OnDestroy, OnInit {
  @Output()
  public selectionChange = new EventEmitter<SkyLookupSelectionChange>();

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
  public data?: Array<any>;

  @Input()
  public selectedItems?: Array<any>;

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

  public set placeholderText(value: string) {
    this._placeholderText = value;
  }

  public searchText: string;
  public searchInputFocused: boolean = false;
  public activeSelectedItem: any;
  public activeMenuItem: any;
  public results: Array<any>;

  /* tslint:disable:no-input-rename */
  @Input('template')
  public templateInput: TemplateRef<any>;
  /* tslint:enable:no-input-rename */

  @ContentChildren(TemplateRef)
  private templates: QueryList<TemplateRef<any>>;

  public get template(): TemplateRef<any> {
    return this.templates.length > 0 ? this.templates.first : this.templateInput;
  }

  private _placeholderText: string;
  private _currentWait: any;
  private open = false;

  constructor(
    private renderer: Renderer,
    private elRef: ElementRef,
    private dropdownAdapter: SkyDropdownAdapterService,
    private searchAdapter: SkySearchAdapterService,
    private resources: SkyResourcesService,
    private windowObj: SkyWindowRefService
  ) {
    this.dropdownAdapter.dropdownClose.subscribe(() => {
      this.open = false;
    });
  }

  public ngOnInit() {
    this.data = this.data || [];
    this.selectedItems = this.selectedItems || [];
    if (!this.multiple && this.selectedItems.length > 0) {
      this.searchText = this.selectedItems[0][this.descriptorProperty];
    }
  }

  public ngOnDestroy() {
    this.closeMenu();
  }

  public inputFocused(event: FocusEvent, isFocused: boolean) {
    this.searchInputFocused = isFocused;
  }

  public clearSearchText() {
    this.searchText = '';
    if (!this.multiple) {
      let removedItems = this.selectedItems.splice(0, this.selectedItems.length);
      this.notifySelectionChange(undefined, removedItems);
    }
    this.closeMenu();
  }

  public keydown(event: KeyboardEvent, searchText: string) {
    if (event.which === 27 /* Escape Key */) {
      event.preventDefault();
      this.revertSelection();
      return;
    } else if (event.which === 46 /* Delete */) {
      if (this.activeSelectedItem) {
        event.preventDefault();
        this.removeSelectedItem(this.activeSelectedItem);
      }
    }else if (event.which === 8 /* Backspace */) {
      if (this.multiple && this.isSearchTextEmpty()) {
        event.preventDefault();
        let activeItem = this.activeSelectedItem;
        this.moveActiveSelectedItemLeft();
        if (activeItem) {
          this.removeSelectedItem(activeItem);
        }
      }
    } else if (event.which === 38 /* Up Key */ || event.which === 37 /* Left Key */) {
      event.preventDefault();
      if (this.open) {
        this.moveActiveMenuItemUp();
      } else if (this.multiple && this.isSearchTextEmpty()) {
        this.moveActiveSelectedItemLeft();
      }
    } else if (event.which === 40 /* Down Key */ || event.which === 39 /* Right Key */) {
      event.preventDefault();
      if (this.open) {
        this.moveActiveMenuItemDown();
      } else if (this.multiple && this.isSearchTextEmpty()) {
        this.moveActiveSelectedItemRight();
      }
    } if (event.which === 9 /* Tab */) {
      if (this.activeSelectedItem) {
        event.preventDefault();
        this.activeSelectedItem = undefined;
      } else {
        this.resolvePartialSearch();
      }
    }
    /* Supress all key messages if there is an active selected item */
    if (this.activeSelectedItem) {
      event.preventDefault();
    }
  }

  /* If a key is handled in keydown, ignore it in keyup */
  public keyup(event: KeyboardEvent, searchText: string) {
    if (searchText !== this.searchText) {
      this.searchText = searchText;
    }

    if (event.which === 13 /* Enter Key */ && this.activeMenuItem) {
      this.selectItem(this.activeMenuItem);
    } else if (
      event.which !== 9 /* Tab Key */
      && event.which !== 27 /* Escape Key */
      && event.which !== 37 /* Left Key */
      && event.which !== 38 /* Up Key */
      && event.which !== 39 /* Right Key */
      && event.which !== 40 /* Down Key */
    ) {
      this.queueSearch();
    }
  }

  public searchTextChanged(searchText: string) {
    this.searchText = searchText;
    this.queueSearch();
  }

  public selectMenuItem(item: any) {
    this.selectItem(item);
    this.searchAdapter.focusInput(this.elRef);
  }

  public selectItem(item: any) {
    if (this.multiple) {
      if (!this.isItemSelected(item)) {
        this.selectedItems.push(item);
        this.notifySelectionChange([item]);
      }
      this.searchText = '';
    } else {
      let removedItems = this.selectedItems.splice(0, this.selectedItems.length);
      this.selectedItems.push(item);
      this.notifySelectionChange([item], removedItems);
      this.searchText = item[this.descriptorProperty];
    }
    this.closeMenu();
  }

  public removeSelectedItem(item: any) {
    let index = this.findIndex(this.selectedItems, item);
    if (index > -1) {
      let removedItems = this.selectedItems.splice(index, 1);
      this.notifySelectionChange(undefined, removedItems);
    }
    if (this.activeSelectedItem === item) {
      this.activeSelectedItem = undefined;
    }
  }

  public windowClick() {
    this.revertSelection();
  }

  public closeMenu() {
    this.clearQueuedSearch();
    this.dropdownAdapter.hideDropdown(this.elRef, this.renderer, this.windowObj.getWindow());
    this.activeMenuItem = undefined;
  }

  // A search will be performed after the configured delay (default 300ms)
  // This delay prevents excessive work by waiting for the user to stop typing
  private queueSearch() {
    this.clearQueuedSearch();
    this._currentWait = setTimeout(() => this.performSearch(), this.searchDelay);
  }

  private clearQueuedSearch() {
    if (this._currentWait) {
      clearTimeout(this._currentWait);
      this._currentWait = undefined;
    }
  }

  private resolvePartialSearch() {
    // 1) If the search text has been cleared, clear the field
    if (this.isSearchTextEmpty()) {
      this.clearSearchText();
      return;
    }

    // 2) Select the first valid result (if the selected item isn't currently the value)
    if (this.multiple || !this.isSearchTextMatchingSelectedItem()) {
      if (this.activeMenuItem) {
        this.selectItem(this.activeMenuItem);
      } else {
        this.updateSearchResults();
        if (this.results.length > 0) {
          this.selectItem(this.results[0]);
        } else {
          this.clearSearchText();
        }
      }
    }
  }

  private performSearch() {
    this.clearQueuedSearch();
    if (this.searchText && this.searchText.length >= this.minChars
      && !this.isSearchTextMatchingSelectedItem()) {
      this.updateSearchResults();
      this.openMenu();
    } else {
      this.closeMenu();
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

  private isSearchTextEmpty() {
    return !this.searchText || this.searchText.match(/^\s+$/);
  }

  private isItemSelected(item: any) {
    return this.findIndex(this.selectedItems, item) > -1;
  }

  private isSearchMatch(item: any, searchTextLower: string) {
    let n = this.propertiesToSearch.length;
    while (n--) {
      let val = item[this.propertiesToSearch[n]] || '';
      if (val.toString().toLowerCase().indexOf(searchTextLower) > -1) {
        return true;
      }
    }
    return false;
  }

  private isSearchTextMatchingSelectedItem() {
    return !this.multiple && this.selectedItems.length > 0 &&
      this.selectedItems[0][this.descriptorProperty] === this.searchText.trim();
  }

  private revertSelection() {
    if (!this.multiple && this.selectedItems && this.selectedItems.length > 0) {
      this.searchText = this.selectedItems[0][this.descriptorProperty];
    } else {
      this.searchText = '';
    }
    this.closeMenu();
    this.activeSelectedItem = undefined;
  }

  private openMenu() {
    if (!this.open) {
      this.dropdownAdapter.showDropdown(
        this.elRef,
        this.renderer,
        this.windowObj.getWindow(),
        'left'
      );
      this.open = true;
    }
    if (this.results.length > 0) {
      this.activeMenuItem = this.results[0];
    }
  }

  private findIndex(list: Array<any>, item: any) {
    return list.findIndex((n) => { return (n === item); });;
  }

  private moveActiveSelectedItemRight() {
    if (this.selectedItems.length > 0) {
      let index = this.findIndex(this.selectedItems, this.activeSelectedItem);
      if (index > -1 && this.selectedItems.length > index + 1) {
        this.activeSelectedItem = this.selectedItems[index + 1];
      } else {
        this.activeSelectedItem = undefined;
      }
    }
  }

  private moveActiveSelectedItemLeft() {
    if (this.selectedItems.length > 0) {
      let index = this.findIndex(this.selectedItems, this.activeSelectedItem);
      if (index > 0) {
        this.activeSelectedItem = this.selectedItems[index - 1];
      } else if (index < 0) {
        this.activeSelectedItem = this.selectedItems[this.selectedItems.length - 1];
      }
      /* If index = 0, leave the active item alone */
    }
  }

  private moveActiveMenuItemDown() {
    let index = this.findIndex(this.results, this.activeMenuItem);
    if (index > -1 && this.results.length > index + 1) {
      this.activeMenuItem = this.results[index + 1];
    }
  }

  private moveActiveMenuItemUp() {
    let index = this.findIndex(this.results, this.activeMenuItem);
    if (index > 0) {
      this.activeMenuItem = this.results[index - 1];
    }
  }

  private notifySelectionChange(added: Array<any>, removed?: Array<any>) {
    this.selectionChange.emit({
      added: added || [], removed: removed || [], result: this.selectedItems
    });
  }
}
