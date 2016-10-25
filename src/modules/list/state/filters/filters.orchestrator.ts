import { ListStateOrchestrator } from '../list-state.rxstate';
import { AsyncList } from 'microedge-rxstate/core';
import { ListFilterModel } from './filter.model';
import { ListFiltersLoadAction, ListFiltersUpdateAction } from './actions';

export class ListFiltersOrchestrator extends ListStateOrchestrator<AsyncList<ListFilterModel>> {
  constructor() {
    super();

    this
      .register(ListFiltersUpdateAction, this.update)
      .register(ListFiltersLoadAction, this.load);
  }

  private update(state, action: ListFiltersUpdateAction): ListFilterModel[] {
    return [...action.filters];
  }

  private load(state, action: ListFiltersLoadAction): ListFilterModel[] {
    const newListItems = action.filters.map(f => new ListFilterModel(f, f.view));
    return [...newListItems];
  }
}
