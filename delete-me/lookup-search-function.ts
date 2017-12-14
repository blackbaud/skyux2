import {
  SkyLookupSearchFunctionResult
} from './lookup-search-function-result';

export type SkyLookupSearchFunction = (searchText: string) => SkyLookupSearchFunctionResult;
