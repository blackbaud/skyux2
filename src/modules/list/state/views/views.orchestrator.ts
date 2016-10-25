import { ListStateOrchestrator } from '../list-state.rxstate';
import { ListViewsModel } from './views.model';
import { ListViewsLoadAction } from './load.action';
import { ListViewsSetActiveAction } from './set-active.action';

export class ListViewsOrchestrator extends ListStateOrchestrator<ListViewsModel> {
  constructor() {
    super();

    this
      .register(ListViewsSetActiveAction, this.setActive)
      .register(ListViewsLoadAction, this.load);
  }

  private setActive(state, action: ListViewsSetActiveAction): ListViewsModel {
    return new ListViewsModel(Object.assign({}, state, { active: action.view }));
  }

  private load(state, action: ListViewsLoadAction): ListViewsModel {
    return new ListViewsModel(Object.assign({}, state, { views: action.views }));
  }
}
