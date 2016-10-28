import { RepeaterStateOrchestrator } from '../repeater-state.rxstate';
import { HashTable } from '../repeater-state.model';
import { ListViewRepeaterSetEditingAction } from './actions';

export class ListViewRepeaterEditingOrchestrator extends RepeaterStateOrchestrator<HashTable> {
  constructor() {
    super();

    this
      .register(ListViewRepeaterSetEditingAction, this.setEditing);
  }

  private setEditing(state: HashTable, action: ListViewRepeaterSetEditingAction): HashTable {
    state[action.id] = action.editing;
    return state;
  }
}
