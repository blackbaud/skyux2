import { RepeaterStateOrchestrator } from '../repeater-state.rxstate';
import { HashTable } from '../repeater-state.model';
import { ListViewRepeaterSetExpandedAction } from './actions';

export class ListViewRepeaterExpandedOrchestrator extends RepeaterStateOrchestrator<HashTable> {
  constructor() {
    super();

    this
      .register(ListViewRepeaterSetExpandedAction, this.setExpanded);
  }

  private setExpanded(state: HashTable, action: ListViewRepeaterSetExpandedAction): HashTable {
    state[action.id] = action.expanded;
    return state;
  }
}
