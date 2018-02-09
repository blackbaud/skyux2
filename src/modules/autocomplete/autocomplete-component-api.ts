import {
  Input,
  TemplateRef
} from '@angular/core';

import {
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionFilter
} from './types';

export class SkyAutocompleteComponentAPI {
  @Input()
  public data: any[];

  @Input()
  public descriptorProperty: string;

  @Input()
  public propertiesToSearch: string[];

  @Input()
  public search: SkyAutocompleteSearchFunction;

  @Input()
  public searchFilters: SkyAutocompleteSearchFunctionFilter[];

  @Input()
  public searchResultsLimit: number;

  @Input()
  public searchResultTemplate: TemplateRef<any>;

  @Input()
  public searchTextMinimumCharacters: number;
}
