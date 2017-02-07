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

import {
  ListToolbarItemsLoadAction,
  ListToolbarSetExistsAction
} from './toolbar/actions';

import {
  ListSearchSetSearchTextAction,
  ListSearchSetFunctionsAction,
  ListSearchSetFieldSelectorsAction
} from './search/actions';

export type ListStateAction =
  ListItemsSetLoadingAction | ListItemsLoadAction |
  ListPagingSetMaxPagesAction | ListPagingSetItemsPerPageAction | ListPagingSetPageNumberAction |
  ListViewsLoadAction | ListViewsSetActiveAction | ListToolbarItemsLoadAction |
  ListToolbarSetExistsAction | ListSearchSetSearchTextAction | ListSearchSetFunctionsAction |
  ListSearchSetFieldSelectorsAction;
