import { PagingStateOrchestrator } from '../paging-state.rxstate';
import { ListPagingCurrentModel } from './current.model';
import {
  ListPagingCurrentSetPageCountAction, ListPagingCurrentSetPageNumberAction,
  ListPagingCurrentSetDisplayedPagesAction
} from './actions';

export class ListPagingCurrentOrchestrator extends PagingStateOrchestrator<ListPagingCurrentModel> {
  constructor() {
    super();

    this
      .register(ListPagingCurrentSetPageCountAction, this.setPageCount)
      .register(ListPagingCurrentSetPageNumberAction, this.setPageNumber)
      .register(ListPagingCurrentSetDisplayedPagesAction, this.setDisplayedPages);
  }

  private setPageCount(
    state: ListPagingCurrentModel,
    action: ListPagingCurrentSetPageCountAction): ListPagingCurrentModel {
    return new ListPagingCurrentModel(
      Object.assign({}, state, { pageCount: Number(action.pageCount) })
    );
  }

  private setPageNumber(
    state: ListPagingCurrentModel,
    action: ListPagingCurrentSetPageNumberAction): ListPagingCurrentModel {
    return new ListPagingCurrentModel(
      Object.assign({}, state, { pageNumber: Number(action.pageNumber) })
    );
  }

  private setDisplayedPages(
    state: ListPagingCurrentModel,
    action: ListPagingCurrentSetDisplayedPagesAction): ListPagingCurrentModel {
    return new ListPagingCurrentModel(
      Object.assign({}, state, { displayedPages: action.displayedPages.map(n => Number(n)) })
    );
  }
}
