import { Injectable } from '@angular/core';
import { StateNode } from 'microedge-rxstate/dist';
import { PagingStateModel } from './paging-state.model';
import { PagingStateDispatcher } from './paging-state.rxstate';
import { ListPagingConfigOrchestrator } from './config/config.orchestrator';
import { ListPagingCurrentOrchestrator } from './current/current.orchestrator';

@Injectable()
export class PagingState extends StateNode<PagingStateModel> {
  constructor(initialState: PagingStateModel, dispatcher: PagingStateDispatcher) {
    super(initialState, dispatcher);

    this
      .register('config', ListPagingConfigOrchestrator)
      .register('current', ListPagingCurrentOrchestrator)
      .begin();
  }
}
