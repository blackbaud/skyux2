import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  SkyLookupSearchFunction,
  SkyLookupSearchFunctionConfig
} from './types';

import {
  skyLookupDefaultSearchFunction
} from './lookup-default-search-function';

@Directive({
  selector: '[skyLookupSearch]'
})
export class SkyLookupSearchDirective implements OnInit {
  @Input()
  public data: any[] = [];

  @Input()
  public searchFunction: SkyLookupSearchFunction;

  @Input()
  public searchFunctionConfigStream: Observable<SkyLookupSearchFunctionConfig>;

  @Output()
  public searchApplied = new EventEmitter<any>();

  private searchFunctionConfig: SkyLookupSearchFunctionConfig;

  public constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('keyup')
  public handleKeyUp(event: KeyboardEvent, searchText: string) {
    // const key = event.key.toLowerCase();

    const results = this.searchFunction.call(
      {},
      this.elementRef.nativeElement.value,
      this.searchFunctionConfig,
      this.data
    );

    this.searchApplied.emit({
      results
    });
  }

  public ngOnInit() {
    if (!this.searchFunction) {
      this.searchFunction = skyLookupDefaultSearchFunction;
    }

    this.searchFunctionConfig = {
      propertiesToSearch: ['name']
    };

    // this.searchFunctionConfigStream
    //   .subscribe((config: SkyLookupSearchFunctionConfig) => {
    //     console.log('search config?', config);
    //     this.searchFunctionConfig = config;
    //   });
  }

  // public searchTextChanged(searchText: string) {
  //   if (this.isTextEmpty(searchText)) {
  //     this.resetSearch();
  //     return;
  //   }

  //   if (searchText !== this.searchText) {
  //     this.searchText = searchText.trim();
  //     this.performSearch();
  //   }
  // }

  // private performSearch() {
  //   this.updateSearchResults(() => {});
  // }

  // private defaultSearchFunction(searchText: string) {
  //   const searchTextLower = this.searchText.toLowerCase();
  //   const results = [];

  //   for (let i = 0, n = this.data.length; i < n; i++) {
  //     if (this.searchResultsLimit && results.length >= this.searchResultsLimit) {
  //       return results;
  //     }

  //     const item = this.data[i];

  //     if (
  //       (!this.multiple || !this.isItemSelected(item)) &&
  //       this.isSearchMatch(item, searchTextLower)
  //     ) {
  //       results.push(item);
  //     }
  //   }

  //   return results;
  // }

  // private isSearchMatch(item: any, searchTextLower: string) {
  //   let n = this.propertiesToSearch.length;
  //   while (n--) {
  //     let val = item[this.propertiesToSearch[n]] || '';
  //     if (val.toString().toLowerCase().indexOf(searchTextLower) > -1) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // private isItemSelected(item: any): boolean {
  //   return this.selectedItems.filter((selectedItem: any) => {
  //     return (selectedItem === item);
  //   })[0];
  // }

  // private updateSearchResults(callback: Function) {
  //   const loadResults = (results: any[]) => {
  //     this.searchResults = results.filter((result: any) => {
  //       return !this.isItemSelected(result);
  //     });

  //     callback.call(this);
  //   };

  //   const searchResult = this.searchFunction(
  //     this.searchText,
  //     this.searchFunctionConfig
  //   );

  //   if (searchResult instanceof Array) {
  //     loadResults(searchResult);
  //   } else {
  //     searchResult.then(loadResults);
  //   }
  // }
}
