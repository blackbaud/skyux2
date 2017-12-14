import {
  SkyLookupSearchFunction,
  SkyLookupSearchFunctionConfig,
  SkyLookupSearchFunctionResult
} from './types';

export const skyLookupDefaultSearchFunction: SkyLookupSearchFunction = function (
  searchText: string,
  config: SkyLookupSearchFunctionConfig,
  staticData: any[]
): SkyLookupSearchFunctionResult {
  const searchTextLower = searchText.toLowerCase();
  const results = [];

  for (let i = 0, n = staticData.length; i < n; i++) {
    if (config.searchResultsLimit && results.length >= config.searchResultsLimit) {
      return results;
    }

    const item = staticData[i];
    const isMatch = config.propertiesToSearch.filter((property: string) => {
      const val = item[property] || '';
      return (val.toString().toLowerCase().indexOf(searchTextLower) > -1);
    })[0];

    if (isMatch) {
      results.push(item);
    }
  }

  return results;
};
