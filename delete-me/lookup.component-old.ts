import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { SkyResourcesService } from '../resources';

import {
  SkyLookupTokensComponent
} from './lookup-tokens.component';

import {
  SkyLookupChanges,
  SkyLookupSearchFunction
} from './types';

import {
  SkyAutocompleteInputDirective
} from '../autocomplete';

let nextId = 0;

@Component({
  selector: 'sky-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  providers: [
    SkyResourcesService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLookupComponent implements OnInit {
  @Input()
  public disabled = false;

  @Input()
  public placeholderText: string;

  @Input()
  public selectedItems: any[] = [];

  @Input()
  public descriptorProperty = 'name';

  @Input()
  public data: any[]; // passive

  @Input()
  public propertiesToSearch: string[]; // passive

  @Input()
  public searchResultsLimit: number; // passive

  @Input()
  public searchResultTemplate: TemplateRef<any>; // passive

  @Input()
  public search: SkyLookupSearchFunction; // passive

  @Output()
  public selectionChanges = new EventEmitter<SkyLookupChanges>();

  @Output()
  public inputIdChanges = new EventEmitter<SkyLookupChanges>();

  @ViewChild(SkyLookupTokensComponent)
  public tokensComponent: SkyLookupTokensComponent;

  @ViewChild(SkyAutocompleteInputDirective)
  public inputDirective: SkyAutocompleteInputDirective;

  public inputId: string;
  public searchText: string;

  constructor(
    private resources: SkyResourcesService
  ) {
    this.placeholderText = this.resources.getString('search_placeholder');
  }

  public ngOnInit() {
    this.inputId = `sky-lookup-input-${nextId++}`;
    this.inputIdChanges.emit({
      inputId: this.inputId
    });

    // Ensure preset selected items are immutable.
    // Otherwise, deleting one would delete all other references.
    this.selectedItems = this.selectedItems.map(item => {
      const copy = { ...item };
      return copy;
    });

    this.selectionChanges.emit({
      selectedItems: this.selectedItems
    });
  }

  public onSearchResultSelected(event: any) {
    this.addToSelected(event.result);
  }

  public resetSearch() {
    this.inputDirective.value = '';
  }

  // Handles keyboard events that affect usability and interaction.
  // (Keydown is needed to override default browser behavior.)
  public onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    switch (key) {
      case 'arrowleft':
      case 'backspace':
      if (this.isSearchEmpty()) {
        event.preventDefault();
        this.tokensComponent.focus();
      }
      break;

      case 'escape':
      event.preventDefault();
      this.resetSearch();
      break;

      default:
      break;
    }
  }

  public onTokenChanges(result: any) {
    this.selectedItems = result.tokens;
    this.selectionChanges.emit({
      selectedItems: this.selectedItems
    });
  }

  private isSearchEmpty() {
    return (!this.inputDirective.value);
  }

  private addToSelected(item: any) {
    const copy = { ...item };

    this.selectedItems.push(copy);

    this.selectionChanges.emit({
      selectedItems: this.selectedItems
    });

    this.resetSearch();
  }

  // Reset search when clicking outside of the component.
  // @HostListener('document:click')
  // public handleDocumentClicked() {
  //   if (!this.isMouseEnter) {
  //     this.handlePartialSearch();
  //     this.resetSearch();
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

  // // Handles keyboard events that affect usability and interaction.
  // // (Keydown is needed to override default browser behavior.)
  // public handleKeyDown(event: KeyboardEvent) {
  //   const key = event.key.toLowerCase();

  //   switch (key) {
  //     case 'arrowleft':
  //     case 'backspace':
  //     if (this.multiple && this.isTextEmpty(this.searchText)) {
  //       event.preventDefault();
  //       this.tokensComponent.focus();
  //     }
  //     break;

  //     case 'arrowdown':
  //     event.preventDefault();
  //     this.incrementActiveSearchResultIndex();
  //     break;

  //     case 'arrowup':
  //     event.preventDefault();
  //     this.decrementActiveSearchResultIndex();
  //     break;

  //     case 'tab':
  //     case 'enter':
  //     if (this.hasSearchResults()) {
  //       event.preventDefault();
  //       this.selectActiveSearchResult();
  //     }
  //     break;

  //     case 'escape':
  //     event.preventDefault();
  //     this.resetSearch();
  //     break;

  //     default:
  //     break;
  //   }
  // }

  // public onSearchTextChanged(searchText: string) {
  //   if (this.isTextEmpty(searchText)) {
  //     this.resetSearch();
  //     return;
  //   }

  //   if (searchText !== this.searchText) {
  //     this.searchText = searchText.trim();

  //     // For single entry lookups, reset selected items before every search.
  //     if (!this.multiple) {
  //       this.selectedItems = [];
  //     }

  //     this.performSearch()
  //       .then((results: any) => {
  //         this.searchResults = results;
  //       });
  //   }
  // }

  // public onSearchResultClicked(data: any) {
  //   this.addToSelected(data.result);
  // }

  // public onTokenChanges(result: any) {
  //   this.selectedItems = result.tokens;
  //   this.selectionChanges.emit({
  //     selectedItems: this.selectedItems
  //   });
  // }

  // public resetSearch() {
  //   if (this.multiple) {
  //     this.searchText = '';
  //   } else {
  //     // For single-entry lookups, we only want to clear the search
  //     // field under special circumstances.
  //     // If the search text doesn't exactly match the descriptor value, clear it out.
  //     const selectedItem = this.selectedItems[0];
  //     if (selectedItem) {
  //       if (this.searchText !== selectedItem[this.descriptorProperty]) {
  //         this.searchText = '';
  //       }
  //     } else {
  //       this.searchText = '';
  //     }
  //   }

  //   this.searchResults = [];
  //   this.searchResultsIndex = 0;
  // }

  // private performSearch(): Promise<any> {
  //   const searchResult: SkyLookupSearchFunctionResult = this.search(
  //     this.searchText
  //   );

  //   // Synchronous result should be wrapped in a promise.
  //   if (searchResult instanceof Array) {
  //     return Promise.resolve(searchResult);
  //   }

  //   return searchResult;
  // }

  // private handlePartialSearch() {
  //   if (this.hasSearchResults()) {
  //     const activeResult = this.searchResults[this.searchResultsIndex];

  //     if (activeResult[this.descriptorProperty] === this.searchText) {
  //       if (this.multiple) {
  //         this.selectedItems.push(activeResult);
  //       } else {
  //         this.selectedItems = [activeResult];
  //       }

  //       this.selectionChanges.emit({
  //         selectedItems: this.selectedItems
  //       });

  //       return;
  //     }
  //   }
  // }

  // private defaultSearchFunction(searchText: string): SkyLookupSearchFunctionResult {
  //   const searchTextLower = searchText.toLowerCase();
  //   const results = [];

  //   for (let i = 0, n = this.data.length; i < n; i++) {
  //     const limitReached = (
  //       this.searchResultsLimit &&
  //       results.length >= this.searchResultsLimit
  //     );

  //     if (limitReached) {
  //       return results;
  //     }

  //     const result = this.data[i];

  //     const isMatch = this.propertiesToSearch.filter((property: string) => {
  //       const val = result[property] || '';
  //       return (val.toString().toLowerCase().indexOf(searchTextLower) > -1);
  //     })[0];

  //     const isDuplicate = this.selectedItems.filter((item: any) => {
  //       return (item[this.descriptorProperty] === result[this.descriptorProperty]);
  //     })[0];

  //     if (isMatch && !isDuplicate) {
  //       results.push(result);
  //     }
  //   }

  //   return results;
  // }

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

  // private selectActiveSearchResult() {
  //   if (this.hasSearchResults()) {
  //     const result = this.searchResults[this.searchResultsIndex];
  //     this.addToSelected(result);
  //   }
  // }

  // private addToSelected(item: any) {
  //   const copy = { ...item };

  //   if (this.multiple) {
  //     this.selectedItems.push(copy);
  //   } else {
  //     this.selectedItems = [copy];
  //     // For single-entry lookups, set the search text to the descriptor's value
  //     // so that it behaves like a normal input field.
  //     this.searchText = copy[this.descriptorProperty];
  //   }

  //   this.selectionChanges.emit({
  //     selectedItems: this.selectedItems
  //   });

  //   this.resetSearch();
  // }

  // private hasSearchResults(): boolean {
  //   return (this.searchResults && this.searchResults.length > 0);
  // }

  // private isTextEmpty(text: string) {
  //   return (!text || text.match(/^\s+$/));
  // }
}
