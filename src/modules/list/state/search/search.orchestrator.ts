import { ListStateOrchestrator } from '../list-state.rxstate';
import { ListSearchModel } from './search.model';
import { ListSearchSetSearchTextAction } from './set-search-text.action';
import { ListSearchSetFunctionsAction } from './set-functions.action';
import { ListSearchSetFieldSelectorsAction } from './set-field-selectors.action';

export class ListSearchOrchestrator extends ListStateOrchestrator<ListSearchModel> {
  constructor() {
    super();

    this
      .register(ListSearchSetSearchTextAction, this.setSearchText)
      .register(ListSearchSetFunctionsAction, this.setFunctions)
      .register(ListSearchSetFieldSelectorsAction, this.setFieldSelectors);
  }

  private setSearchText(
    state: ListSearchModel,
    action: ListSearchSetSearchTextAction): ListSearchModel {
    return new ListSearchModel(
      Object.assign({}, state, { searchText: action.searchText ? action.searchText : '' })
    );
  }

  private setFunctions(
    state: ListSearchModel,
    action: ListSearchSetFunctionsAction): ListSearchModel {
    return new ListSearchModel(Object.assign({}, state, { functions: [...action.functions] }));
  }

  private setFieldSelectors(
    state: ListSearchModel,
    action: ListSearchSetFieldSelectorsAction): ListSearchModel {
    return new ListSearchModel(
      Object.assign({}, state, { fieldSelectors: [...action.fieldSelectors] })
    );
  }
}
