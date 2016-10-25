import { RepeaterStateOrchestrator } from '../repeater-state.rxstate';
import { ListViewRepeaterSetEditingAction } from './actions';

export class ListViewRepeaterEditingOrchestrator extends RepeaterStateOrchestrator<{}> {
  constructor() {
    super();

    this
      .register(ListViewRepeaterSetEditingAction, this.setEditing);
  }

  private setEditing(state, action: ListViewRepeaterSetEditingAction): {} {
    state[action.id] = action.editing;
    return state;
  }
}
