import {
  ListItemsSetLoadingAction, ListItemsLoadAction
} from './items/actions';

import {
  ListPagingSetMaxPagesAction,
  ListPagingSetItemsPerPageAction,
  ListPagingSetPageNumberAction
} from './paging/actions';

export type ListStateAction =
  ListItemsSetLoadingAction | ListItemsLoadAction |
  ListPagingSetMaxPagesAction | ListPagingSetItemsPerPageAction | ListPagingSetPageNumberAction;
