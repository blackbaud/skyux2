import { Injectable } from '@angular/core';
import {
  StateDispatcher,
  StateOrchestrator
} from 'microedge-rxstate/dist';
import { ListStateAction } from './list-state-action.type';

import { ListViewsSetActiveAction } from './views/actions';

import {
  ListToolbarItemsLoadAction,
  ListToolbarSetExistsAction
} from './toolbar/actions';

import { ListToolbarItemModel } from './toolbar/toolbar-item.model';

import {
  ListSearchSetFunctionsAction,
  ListSearchSetSearchTextAction,
  ListSearchSetFieldSelectorsAction
} from './search/actions';

export class ListStateOrchestrator<T> extends StateOrchestrator<T, ListStateAction> {
}

@Injectable()
export class ListStateDispatcher extends StateDispatcher<ListStateAction> {

  public viewsSetActive(id: string) {
    this.next(new ListViewsSetActiveAction(id));
  }

  public toolbarExists(exists: boolean): void {
    this.next(new ListToolbarSetExistsAction(exists));
  }

  public toolbarAddItems(items: ListToolbarItemModel[], index: number = -1): void {
    setTimeout(() => this.next(new ListToolbarItemsLoadAction(items, index)));
  }

  public searchSetFunctions(sortFunctions: ((data: any, searchText: string) => boolean)[]): void {
    this.next(new ListSearchSetFunctionsAction(sortFunctions));
  }

  public searchSetFieldSelectors(fieldSelectors: Array<string>): void {
    this.next(new ListSearchSetFieldSelectorsAction(fieldSelectors));
  }

  public searchSetText(searchText: string) {
    this.next(new ListSearchSetSearchTextAction(searchText));
  }
}
