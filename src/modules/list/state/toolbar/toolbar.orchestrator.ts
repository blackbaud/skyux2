import { ListStateOrchestrator } from '../list-state.rxstate';
import { ListToolbarModel } from './toolbar.model';
import { ListToolbarItemModel } from './toolbar-item.model';
import { ListToolbarItemsLoadAction, ListToolbarSetExistsAction } from './actions';

export class ListToolbarOrchestrator
  extends ListStateOrchestrator<ListToolbarModel> {
  constructor() {
    super();

    this
      .register(ListToolbarSetExistsAction, this.setExists)
      .register(ListToolbarItemsLoadAction, this.load);
  }

  private setExists(
    state: ListToolbarModel,
    action: ListToolbarSetExistsAction): ListToolbarModel {
    const newModel = new ListToolbarModel(state);
    newModel.exists = action.exists;
    return newModel;
  }

  private load(
    state: ListToolbarModel,
    action: ListToolbarItemsLoadAction): ListToolbarModel {
    const newModel = new ListToolbarModel(state);
    const newListItems = action.items.map(g => new ListToolbarItemModel(g));

    let resultItems = [...state.items];
    if (action.index === -1 || action.index > state.items.length) {
      resultItems = [...resultItems, ...newListItems];
    } else if (action.index === 0) {
      resultItems = [...newListItems, ...resultItems];
    } else {
      newListItems.reverse().forEach(item => resultItems.splice(action.index, 0, item));
    }

    newModel.items = resultItems;
    return newModel;
  }
}
