import {
  SkyAutocompleteSearchResponse
} from './autocomplete-search-response';

export type SkyAutocompleteSearchFunction =
  (searchText: string) => SkyAutocompleteSearchResponse;
