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
  ListToolbarSetExistsAction,
  ListToolbarSetTypeAction
} from './toolbar/actions';

import {
  ListSearchSetSearchTextAction,
  ListSearchSetFunctionsAction,
  ListSearchSetFieldSelectorsAction
} from './search/actions';

import {
  ListSelectedSetLoadingAction,
  ListSelectedLoadAction,
  ListSelectedSetItemSelectedAction,
  ListSelectedSetItemsSelectedAction
} from './selected/actions';

export type ListStateAction =
  ListItemsSetLoadingAction | ListItemsLoadAction |
  ListPagingSetMaxPagesAction | ListPagingSetItemsPerPageAction | ListPagingSetPageNumberAction |
  ListViewsLoadAction | ListViewsSetActiveAction | ListToolbarItemsLoadAction |
  ListToolbarSetExistsAction | ListSearchSetSearchTextAction | ListSearchSetFunctionsAction |
  ListSearchSetFieldSelectorsAction | ListSelectedSetLoadingAction | ListSelectedLoadAction |
  ListSelectedSetItemSelectedAction | ListSelectedSetItemsSelectedAction | ListToolbarSetTypeAction;
