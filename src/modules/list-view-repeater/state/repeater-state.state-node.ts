import { Injectable } from '@angular/core';
import { StateNode } from 'microedge-rxstate/core';

import { RepeaterStateModel } from './repeater-state.model';
import { RepeaterStateDispatcher } from './repeater-state.rxstate';
import { ListViewRepeaterExpandedOrchestrator } from './expanded/expanded.orchestrator';
import { ListViewRepeaterEditingOrchestrator } from './editing/editing.orchestrator';

@Injectable()
export class RepeaterState extends StateNode<RepeaterStateModel> {
  constructor(initialState: RepeaterStateModel, dispatcher: RepeaterStateDispatcher) {
    super(initialState, dispatcher);

    this
      .register('expanded', ListViewRepeaterExpandedOrchestrator)
      .register('editing', ListViewRepeaterEditingOrchestrator)
      .begin();
  }
}
