import {
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionResponse,
  SkyAutocompleteDefaultSearchFunctionOptions
} from './types';

export function skyAutocompleteDefaultSearchFunction(
  options: SkyAutocompleteDefaultSearchFunctionOptions
): SkyAutocompleteSearchFunction {
  const search = function (searchText: string, data: any[]): SkyAutocompleteSearchFunctionResponse {
    const searchTextLower = searchText.toLowerCase();
    const filteredData = filterData(searchText, data);
    const results = [];

    for (let i = 0, n = filteredData.length; i < n; i++) {
      const limitReached = (
        options.searchResultsLimit &&
        options.searchResultsLimit <= results.length
      );

      if (limitReached) {
        return results;
      }

      const result = filteredData[i];
      const isMatch = options.propertiesToSearch.find((property: string) => {
        const value = (result[property] || '').toString().toLowerCase();
        return (value.indexOf(searchTextLower) > -1);
      });

      if (isMatch) {
        results.push(result);
      }
    }

    return results;
  };

  const filterData = function (searchText: string, data: any[]): any[] {
    return data.filter((item: any) => {
      if (!options.searchFilters.length) {
        return true;
      }

      let isValid = true;
      options.searchFilters.forEach((filter: Function) => {
        if (isValid) {
          isValid = filter.call({}, searchText, item);
        }
      });

      return isValid;
    });
  };

  return search;
}
