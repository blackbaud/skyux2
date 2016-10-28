import { ListToolbarStateOrchestrator } from '../toolbar-state.rxstate';
import { ListToolbarConfigModel } from './config.model';

import {
  ListToolbarConfigSetFilterEnabledAction, ListToolbarConfigSetSearchEnabledAction,
  ListToolbarConfigSetSortSelectorEnabledAction, ListToolbarConfigSetViewSelectorEnabledAction
} from './actions';

export class ListToolbarConfigOrchestrator
  extends ListToolbarStateOrchestrator<ListToolbarConfigModel> {
  constructor() {
    super();

    this
      .register(ListToolbarConfigSetFilterEnabledAction, this.setFilterEnabled)
      .register(ListToolbarConfigSetSearchEnabledAction, this.setSearchEnabled)
      .register(ListToolbarConfigSetSortSelectorEnabledAction, this.setSortSelectorEnabled)
      .register(ListToolbarConfigSetViewSelectorEnabledAction, this.setViewSelectorEnabled);
  }

  private setFilterEnabled(
    state: ListToolbarConfigModel,
    action: ListToolbarConfigSetFilterEnabledAction): ListToolbarConfigModel {
    return new ListToolbarConfigModel(Object.assign({}, state, { filterEnabled: action.enabled }));
  }

  private setSearchEnabled(
    state: ListToolbarConfigModel,
    action: ListToolbarConfigSetFilterEnabledAction): ListToolbarConfigModel {
    return new ListToolbarConfigModel(Object.assign({}, state, { searchEnabled: action.enabled }));
  }

  private setSortSelectorEnabled(
    state: ListToolbarConfigModel,
    action: ListToolbarConfigSetFilterEnabledAction): ListToolbarConfigModel {
    return new ListToolbarConfigModel(
      Object.assign({}, state, { sortSelectorEnabled: action.enabled })
    );
  }

  private setViewSelectorEnabled(
    state: ListToolbarConfigModel,
    action: ListToolbarConfigSetFilterEnabledAction): ListToolbarConfigModel {
    return new ListToolbarConfigModel(
      Object.assign({}, state, { viewSelectorEnabled: action.enabled })
    );
  }
}
