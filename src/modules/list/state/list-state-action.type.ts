import {
  ListItemsSetLoadingAction, ListItemsLoadAction, ListItemsSetItemSelectedAction,
  ListItemsSetItemsSelectedAction
} from './items/actions';
import { ListDisplayedItemsLoadAction } from './displayed-items/actions';
import { ListViewsLoadAction, ListViewsSetActiveAction } from './views/actions';
import { ListSearchSetSearchTextAction, ListSearchSetFunctionsAction } from './search/actions';
import {
  ListSortSetFieldSelectorsAction, ListSortSetAvailableAction, ListSortSetGlobalAction
} from './sort/actions';
import { ListFiltersLoadAction, ListFiltersUpdateAction } from './filters/actions';
import { ListToolbarItemsLoadAction, ListToolbarSetExistsAction } from './toolbar/actions';

export type ListStateAction =
  ListItemsSetLoadingAction | ListItemsLoadAction | ListItemsSetItemSelectedAction |
  ListItemsSetItemsSelectedAction |
  ListDisplayedItemsLoadAction |
  ListViewsLoadAction | ListViewsSetActiveAction |
  ListSearchSetSearchTextAction | ListSearchSetFunctionsAction |
  ListSortSetFieldSelectorsAction | ListSortSetAvailableAction | ListSortSetGlobalAction |
  ListFiltersLoadAction | ListFiltersUpdateAction |
  ListToolbarItemsLoadAction | ListToolbarSetExistsAction;
