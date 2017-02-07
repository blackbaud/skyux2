import { ListToolbarStateOrchestrator } from '../toolbar-state.rxstate';
import { ListToolbarConfigModel } from './config.model';

import {
  ListToolbarConfigSetSearchEnabledAction
} from './actions';

export class ListToolbarConfigOrchestrator
  extends ListToolbarStateOrchestrator<ListToolbarConfigModel> {
  constructor() {
    super();

    this
      .register(ListToolbarConfigSetSearchEnabledAction, this.setSearchEnabled);
  }

  private setSearchEnabled(
    state: ListToolbarConfigModel,
    action: ListToolbarConfigSetSearchEnabledAction): ListToolbarConfigModel {
    return new ListToolbarConfigModel(Object.assign({}, state, { searchEnabled: action.enabled }));
  }

}
