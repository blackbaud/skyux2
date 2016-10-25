import {
  ListPagingConfigSetMaxPagesAction, ListPagingConfigSetItemsPerPageAction
} from './config/actions';
import {
  ListPagingCurrentSetPageCountAction, ListPagingCurrentSetPageNumberAction,
  ListPagingCurrentSetDisplayedPagesAction
} from './current/actions';

export type PagingStateAction =
  ListPagingConfigSetMaxPagesAction | ListPagingConfigSetItemsPerPageAction |
  ListPagingCurrentSetPageCountAction | ListPagingCurrentSetPageNumberAction |
  ListPagingCurrentSetDisplayedPagesAction;
