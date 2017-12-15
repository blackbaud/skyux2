import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
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
  public multiple: boolean = false;

  @Input()
  public data: Array<any>;

  @Input()
  public selectedItems: Array<any>;

  @Input()
  public minChars: number = 1;

  @Input()
  public propertiesToSearch: Array<string> = ['name'];

  @Input()
  public descriptorProperty: string = 'name';

  @Input()
  public resultsLimit: number;

  @Input()
  public search: (searchText: string) => Array<any> | Promise<Array<any>>
    = this.defaultSearchFunction;

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

  public keydown(event: KeyboardEvent) {
    switch (event.which) {
      case 27: /* Escape Key */
        event.preventDefault();
        this.revertSelection();
        return;
      case 46: /* Delete */
        if (this.activeSelectedItem) {
          event.preventDefault();
          this.removeSelectedItem(this.activeSelectedItem);
        }
        break;
      case 8: /* Backspace */
        if (this.multiple && this.isSearchTextEmpty()) {
          event.preventDefault();
          let activeItem = this.activeSelectedItem;
          this.moveActiveSelectedItemLeft();
          if (activeItem) {
            this.removeSelectedItem(activeItem);
          }
        }
        break;
      case 37: /* Left Key */
        if (this.multiple && this.isSearchTextEmpty()) {
          event.preventDefault();
          this.moveActiveSelectedItemLeft();
        }
        break;
      case 38: /* Up Key */
        event.preventDefault();
        if (this.open) {
          this.moveActiveMenuItemUp();
        }
        break;
      case 39: /* Right Key */
        if (this.multiple && this.isSearchTextEmpty()) {
          event.preventDefault();
          this.moveActiveSelectedItemRight();
        }
        break;
      case 40: /* Down Key */
        event.preventDefault();
        if (this.open) {
          this.moveActiveMenuItemDown();
        }
        break;
      case 9: /* Tab Key */
        if (this.activeSelectedItem) {
          event.preventDefault();
          this.activeSelectedItem = undefined;
        } else {
          this.resolvePartialSearch();
        }
        break;
      default:
        // Ignore the key press
    }
    /* Supress all key messages if there is an active selected item */
    if (this.activeSelectedItem) {
      event.preventDefault();
    }
  }

  /* If a key is handled in keydown, ignore it in keyup */
  public keyup(event: KeyboardEvent, searchText: string) {
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
      this.searchTextChanged(searchText);
    }
  }

  public searchTextChanged(searchText: string) {
    if (searchText !== this.searchText) {
      this.searchText = searchText;
      this.performSearch();
    }
  }

  public selectMenuItem(item: any) {
    this.selectItem(item);
    this.selectInput();
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

  public setActiveMenuItem(item: any) {
    this.activeMenuItem = item;
  }

  @HostListener('document:click')
  public windowClick() {
    this.revertSelection();
  }

  public closeMenu() {
    this.dropdownAdapter.hideDropdown(this.elRef, this.renderer, this.windowObj.getWindow());
    this.activeMenuItem = undefined;
  }

  public selectInput() {
    this.searchInputFocused = true;
    this.searchAdapter.focusInput(this.elRef);
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
        this.closeMenu();
        this.updateSearchResults(() => {
          if (this.results.length > 0) {
            this.selectItem(this.results[0]);
          } else {
            this.clearSearchText();
          }
        });
      }
    }
  }

  private performSearch() {
    if (this.searchText && this.searchText.length >= this.minChars
      && !this.isSearchTextMatchingSelectedItem()) {
        this.updateSearchResults(this.openMenu);
    } else {
      this.closeMenu();
    }
  }

  private updateSearchResults(callback: Function) {
    let view = this;
    let loadResults = (results: Array<any>) => {
      if (view.multiple) { // reject entry duplication
        view.results = results.filter(item => !view.isItemSelected(item));
      } else {
        view.results = results;
      }
      callback.call(view);
    };

    let searchResult = this.search(this.searchText);
    if (searchResult instanceof Array) {
      loadResults(searchResult);
    } else {
      searchResult.then(loadResults);
    }
  }

  private defaultSearchFunction(searchText: string) {
    let searchTextLower = this.searchText.toLowerCase();
    let results = [];
    for (let i = 0, n = this.data.length; i < n; i++) {
      if (this.resultsLimit && results.length >= this.resultsLimit) {
        return results;
      }
      let item = this.data[i];
      if ((!this.multiple || !this.isItemSelected(item))
        && this.isSearchMatch(item, searchTextLower)) {
        results.push(item);
      }
    }
    return results;
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
    if (!this.open && this.searchInputFocused) {
      this.dropdownAdapter.showDropdown(
        this.elRef,
        this.renderer,
        this.windowObj.getWindow(),
        'left'
      );
      this.open = true;
    }
    if (this.open && this.results.length > 0) {
      this.activeMenuItem = this.results[0];
    }
  }

  private findIndex(list: Array<any>, item: any) {
    return list.findIndex((n) => { return (n === item); });
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
      this.setActiveMenuItem(this.results[index + 1]);
    }
  }

  private moveActiveMenuItemUp() {
    let index = this.findIndex(this.results, this.activeMenuItem);
    if (index > 0) {
      this.setActiveMenuItem(this.results[index - 1]);
    }
  }

  private notifySelectionChange(added: Array<any>, removed?: Array<any>) {
    this.selectionChange.emit({
      added: added || [], removed: removed || [], result: this.selectedItems
    });
  }
}
