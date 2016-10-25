import { PagingStateOrchestrator } from '../paging-state.rxstate';
import { ListPagingConfigModel } from './config.model';
import {
  ListPagingConfigSetMaxPagesAction, ListPagingConfigSetItemsPerPageAction
} from './actions';

export class ListPagingConfigOrchestrator extends PagingStateOrchestrator<ListPagingConfigModel> {
  constructor() {
    super();

    this
      .register(ListPagingConfigSetMaxPagesAction, this.setMaxPages)
      .register(ListPagingConfigSetItemsPerPageAction, this.setItemsPerPage);
  }

  private setMaxPages(
    state: ListPagingConfigModel,
    action: ListPagingConfigSetMaxPagesAction): ListPagingConfigModel {
    return new ListPagingConfigModel(
      Object.assign({}, state, { maxDisplayedPages: Number(action.maxPages) })
    );
  }

  private setItemsPerPage(
    state: ListPagingConfigModel,
    action: ListPagingConfigSetItemsPerPageAction): ListPagingConfigModel {
    return new ListPagingConfigModel(
      Object.assign({}, state, { itemsPerPage: Number(action.itemsPerPage) })
    );
  }
}
