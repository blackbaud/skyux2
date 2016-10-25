import { ListStateOrchestrator } from '../list-state.rxstate';
import { ListSearchModel } from './search.model';
import { ListSearchSetSearchTextAction } from './set-search-text.action';
import { ListSearchSetFunctionsAction } from './set-functions.action';

export class ListSearchOrchestrator extends ListStateOrchestrator<ListSearchModel> {
  constructor() {
    super();

    this
      .register(ListSearchSetSearchTextAction, this.setSearchText)
      .register(ListSearchSetFunctionsAction, this.setFunctions);
  }

  private setSearchText(state, action: ListSearchSetSearchTextAction): ListSearchModel {
    return new ListSearchModel(
      Object.assign({}, state, { searchText: action.searchText ? action.searchText : '' })
    );
  }

  private setFunctions(state, action: ListSearchSetFunctionsAction): ListSearchModel {
    return new ListSearchModel(Object.assign({}, state, { functions: [...action.functions] }));
  }
}
