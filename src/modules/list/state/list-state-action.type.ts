import {
  ListItemsSetLoadingAction, ListItemsLoadAction
} from './items/actions';

import {
  ListPagingSetMaxPagesAction,
  ListPagingSetItemsPerPageAction,
  ListPagingSetPageNumberAction
} from './paging/actions';

import {
  ListViewsLoadAction,
  ListViewsSetActiveAction
} from './views/actions';

export type ListStateAction =
  ListItemsSetLoadingAction | ListItemsLoadAction |
  ListPagingSetMaxPagesAction | ListPagingSetItemsPerPageAction | ListPagingSetPageNumberAction |
  ListViewsLoadAction | ListViewsSetActiveAction;
