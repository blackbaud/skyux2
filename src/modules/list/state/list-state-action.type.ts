import {
  ListItemsSetLoadingAction, ListItemsLoadAction
} from './items/actions';

import {
  ListPagingSetMaxPagesAction,
  ListPagingSetItemsPerPageAction,
  ListPagingSetPageCountAction,
  ListPagingSetPageNumberAction,
  ListPagingSetDisplayedPagesAction
} from './paging/actions';

export type ListStateAction =
  ListItemsSetLoadingAction | ListItemsLoadAction |
  ListPagingSetMaxPagesAction | ListPagingSetItemsPerPageAction |
  ListPagingSetPageCountAction | ListPagingSetPageNumberAction |
  ListPagingSetDisplayedPagesAction;
