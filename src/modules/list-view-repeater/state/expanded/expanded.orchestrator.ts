import { RepeaterStateOrchestrator } from '../repeater-state.rxstate';
import { ListViewRepeaterSetExpandedAction } from './actions';

export class ListViewRepeaterExpandedOrchestrator extends RepeaterStateOrchestrator<{}> {
  constructor() {
    super();

    this
      .register(ListViewRepeaterSetExpandedAction, this.setExpanded);
  }

  private setExpanded(state, action: ListViewRepeaterSetExpandedAction): {} {
    state[action.id] = action.expanded;
    return state;
  }
}
