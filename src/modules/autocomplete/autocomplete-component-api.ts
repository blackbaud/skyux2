import {
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionFilter
} from './types';

import { skyAutocompleteDefaultSearchFunction } from './autocomplete-default-search-function';

export class SkyAutocompleteComponentAPI {
  @Input()
  public data: any[];

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
    return (this._searchTextMinimumCharacters > 0)
      ? this._searchTextMinimumCharacters : 1;
  }

  @Input()
  public searchFilters: SkyAutocompleteSearchFunctionFilter[];

  @Input()
  public searchResultsLimit: number;

  @ViewChild('defaultSearchResultTemplate')
  protected defaultSearchResultTemplate: TemplateRef<any>;

  protected _descriptorProperty: string;
  protected _propertiesToSearch: string[];
  protected _search: SkyAutocompleteSearchFunction;
  protected _searchResultTemplate: TemplateRef<any>;
  protected _searchTextMinimumCharacters: number;
}
