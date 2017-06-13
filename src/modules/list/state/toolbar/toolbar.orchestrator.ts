import { ListStateOrchestrator } from '../list-state.rxstate';
import { ListToolbarModel } from './toolbar.model';
import { ListToolbarItemModel } from './toolbar-item.model';
import {
  ListToolbarItemsLoadAction,
  ListToolbarSetExistsAction,
  ListToolbarSetTypeAction
} from './actions';

export class ListToolbarOrchestrator
  extends ListStateOrchestrator<ListToolbarModel> {

  constructor() {
    super()/* istanbul ignore next */;

    this
      .register(ListToolbarSetExistsAction, this.setExists)
      .register(ListToolbarItemsLoadAction, this.load)
      .register(ListToolbarSetTypeAction, this.setType);
  }

  private setExists(
    state: ListToolbarModel,
    action: ListToolbarSetExistsAction
  ): ListToolbarModel {
    const newModel = new ListToolbarModel(state);
    newModel.exists = action.exists;
    return newModel;
  }

  private setType(
    state: ListToolbarModel,
    action: ListToolbarSetTypeAction
  ): ListToolbarModel {
    const newModel = new ListToolbarModel(state);
    newModel.type = action.type;
    return newModel;
  }

  private load(
    state: ListToolbarModel,
    action: ListToolbarItemsLoadAction
  ): ListToolbarModel {
    const newModel = new ListToolbarModel(state);
    const newListItems = action.items.map(item => new ListToolbarItemModel(item));

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
