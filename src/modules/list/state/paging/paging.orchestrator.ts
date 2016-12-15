import { ListStateOrchestrator } from '../list-state.rxstate';
import { ListPagingModel } from './paging.model';
import {
  ListPagingSetMaxPagesAction,
  ListPagingSetItemsPerPageAction,
  ListPagingSetPageCountAction,
  ListPagingSetPageNumberAction,
  ListPagingSetDisplayedPagesAction
} from './actions';

export class ListPagingOrchestrator extends ListStateOrchestrator<ListPagingModel> {
  constructor() {
    super();

    this
      .register(ListPagingSetMaxPagesAction, this.setMaxPages)
      .register(ListPagingSetItemsPerPageAction, this.setItemsPerPage)
      .register(ListPagingSetPageCountAction, this.setPageCount)
      .register(ListPagingSetPageNumberAction, this.setPageNumber)
      .register(ListPagingSetDisplayedPagesAction, this.setDisplayedPages);
  }

  private setMaxPages(
    state: ListPagingModel,
    action: ListPagingSetMaxPagesAction): ListPagingModel {
    return new ListPagingModel(
      Object.assign({}, state, { maxDisplayedPages: Number(action.maxPages) })
    );
  }

  private setItemsPerPage(
    state: ListPagingModel,
    action: ListPagingSetItemsPerPageAction): ListPagingModel {
    return new ListPagingModel(
      Object.assign({}, state, { itemsPerPage: Number(action.itemsPerPage) })
    );
  }

  private setPageCount(
    state: ListPagingModel,
    action: ListPagingSetPageCountAction): ListPagingModel {
    return new ListPagingModel(
      Object.assign({}, state, { pageCount: Number(action.pageCount) })
    );
  }

  private setPageNumber(
    state: ListPagingModel,
    action: ListPagingSetPageNumberAction): ListPagingModel {
    return new ListPagingModel(
      Object.assign({}, state, { pageNumber: Number(action.pageNumber) })
    );
  }

  private setDisplayedPages(
    state: ListPagingModel,
    action: ListPagingSetDisplayedPagesAction): ListPagingModel {
    return new ListPagingModel(
      Object.assign({}, state, { displayedPages: action.displayedPages.map(n => Number(n)) })
    );
  }
}
