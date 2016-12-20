import { ListStateOrchestrator } from '../list-state.rxstate';
import { ListSortModel } from './sort.model';
import { ListSortLabelModel } from './label.model';
import { ListSortFieldSelectorModel } from './field-selector.model';
import {
  ListSortSetFieldSelectorsAction, ListSortSetAvailableAction, ListSortSetGlobalAction
} from './actions';

export class ListSortOrchestrator extends ListStateOrchestrator<ListSortModel> {
  constructor() {
    super();

    this
      .register(ListSortSetFieldSelectorsAction, this.setFieldSelectors)
      .register(ListSortSetAvailableAction, this.setAvailable)
      .register(ListSortSetGlobalAction, this.setGlobal);
  }

  private setFieldSelectors(
    state: ListSortModel,
    action: ListSortSetFieldSelectorsAction): ListSortModel {
    let fieldSelectors = action.fieldSelectors;
    let selectors = fieldSelectors.map(selector => {
      let fieldSelector: string = selector;
      let descending: boolean = false;
      let colonIndex = fieldSelector.indexOf(':');
      if (colonIndex > -1) {
        descending = fieldSelector.substr(colonIndex + 1).toLowerCase() === 'desc';
        fieldSelector = fieldSelector.substr(0, colonIndex);
      }

      return new ListSortFieldSelectorModel({ fieldSelector, descending });
    });

    return new ListSortModel(Object.assign({}, state, { fieldSelectors: selectors }));
  }

  private setAvailable(state: ListSortModel, action: ListSortSetAvailableAction): ListSortModel {
    const newAvailable = action.available.map(a => new ListSortLabelModel(a));
    return new ListSortModel(Object.assign({}, state, { available: newAvailable }));
  }

  private setGlobal(state: ListSortModel, action: ListSortSetGlobalAction): ListSortModel {
    const newGlobal = action.global.map(a => new ListSortLabelModel(a));
    return new ListSortModel(Object.assign({}, state, { global: newGlobal }));
  }
}
