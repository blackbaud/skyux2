import { ListStateOrchestrator } from '../list-state.rxstate';
import { ListFilterModel } from './filter.model';
import { ListFiltersLoadAction, ListFiltersUpdateAction } from './actions';

export class ListFiltersOrchestrator extends ListStateOrchestrator<ListFilterModel[]> {
  constructor() {
    super();

    this
      .register(ListFiltersUpdateAction, this.update)
      .register(ListFiltersLoadAction, this.load);
  }

  private update(state: ListFilterModel[], action: ListFiltersUpdateAction): ListFilterModel[] {
    return [...action.filters];
  }

  private load(state: ListFilterModel[], action: ListFiltersLoadAction): ListFilterModel[] {
    const newListItems = action.filters.map(f => new ListFilterModel(f, f.view));
    return [...newListItems];
  }
}
