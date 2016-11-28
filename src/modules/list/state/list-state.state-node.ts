import { Injectable } from '@angular/core';
import { StateNode } from 'microedge-rxstate/dist';

import { ListStateModel } from './list-state.model';
import { ListStateDispatcher } from './list-state.rxstate';
import { ListItemsOrchestrator } from './items/items.orchestrator';
import { ListDisplayedItemsOrchestrator } from './displayed-items/displayed-items.orchestrator';
import { ListViewsOrchestrator } from './views/views.orchestrator';
import { ListSearchOrchestrator } from './search/search.orchestrator';
import { ListSortOrchestrator } from './sort/sort.orchestrator';
import { ListFiltersOrchestrator } from './filters/filters.orchestrator';
import { ListToolbarOrchestrator } from './toolbar/toolbar.orchestrator';
import { ListSelectedOrchestrator } from './selected/selected.orchestrator';

@Injectable()
export class ListState extends StateNode<ListStateModel> {
  constructor(dispatcher: ListStateDispatcher) {
    super(new ListStateModel(), dispatcher);

    this
      .register('views', ListViewsOrchestrator)
      .register('items', ListItemsOrchestrator)
      .register('displayedItems', ListDisplayedItemsOrchestrator)
      .register('search', ListSearchOrchestrator)
      .register('sort', ListSortOrchestrator)
      .register('filters', ListFiltersOrchestrator)
      .register('toolbar', ListToolbarOrchestrator)
      .register('selected', ListSelectedOrchestrator)
      .begin();
  }
}
