import { Injectable } from '@angular/core';
import { StateNode } from 'microedge-rxstate/dist';

import { ListStateModel } from './list-state.model';
import { ListStateDispatcher } from './list-state.rxstate';

import { ListItemsOrchestrator } from './items/items.orchestrator';
import { ListPagingOrchestrator } from './paging/paging.orchestrator';
import { ListViewsOrchestrator } from './views/views.orchestrator';

@Injectable()
export class ListState extends StateNode<ListStateModel> {
  constructor(dispatcher: ListStateDispatcher) {
    super(new ListStateModel(), dispatcher);

    this
      .register('items', ListItemsOrchestrator)
      .register('paging', ListPagingOrchestrator)
      .register('views', ListViewsOrchestrator)
      .begin();
  }
}
