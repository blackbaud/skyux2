import {
  SkyAutocompleteSearchFunctionResponse
} from './autocomplete-search-function-response';

export type SkyAutocompleteSearchFunction =
  (searchText: string) => SkyAutocompleteSearchFunctionResponse;
