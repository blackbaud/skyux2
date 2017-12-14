import {
  SkyAutocompleteSearchResponse
} from './autocomplete-search-function-result';

export type SkyAutocompleteSearchFunction =
  (searchText: string) => SkyAutocompleteSearchResponse;
