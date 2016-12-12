import { Injectable } from '@angular/core';
import {
  ListSortSetAvailableAction, ListSortSetFieldSelectorsAction, ListSortSetGlobalAction
} from './sort/actions';
import { ListSortLabelModel } from './sort/label.model';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/dist';
import { ListStateAction } from './list-state-action.type';
import { ListToolbarItemsLoadAction, ListToolbarSetExistsAction } from './toolbar/actions';
import { ListToolbarItemModel } from './toolbar/toolbar-item.model';
import {
  ListSearchSetFunctionsAction,
  ListSearchSetSearchTextAction,
  ListSearchSetFieldSelectorsAction
} from './search/actions';
import { ListItemModel } from './items/item.model';
import { ListViewsSetActiveAction } from './views/actions';
import { ListFilterModel } from './filters/filter.model';
import { ListFiltersUpdateAction, ListFiltersLoadAction } from './filters/actions';
import { ListItemsLoadAction } from './items/actions';

export class ListStateOrchestrator<T> extends StateOrchestrator<T, ListStateAction> {
}

@Injectable()
export class ListStateDispatcher extends StateDispatcher<ListStateAction> {
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

  public sortSetAvailable(sortLabels: ListSortLabelModel[]): void {
    this.next(new ListSortSetAvailableAction(sortLabels));
  }

  public sortSetFieldSelectors(fieldSelectors: any[]): void {
    this.next(new ListSortSetFieldSelectorsAction(fieldSelectors));
  }

  public sortSetGlobal(sortLabels: ListSortLabelModel[]): void {
    this.next(new ListSortSetGlobalAction(sortLabels));
  }

  public itemsSet(items: ListItemModel[]): void {
    this.next(new ListItemsLoadAction(items));
  }

  public viewsSetActive(id: string) {
    this.next(new ListViewsSetActiveAction(id));
  }

  public filtersUpdate(filters: ListFilterModel[]): void {
    this.next(new ListFiltersUpdateAction(filters));
  }

  public filtersLoad(filters: ListFilterModel[]): void {
    this.next(new ListFiltersLoadAction(filters));
  }
}
