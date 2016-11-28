import {
  ListToolbarConfigSetFilterEnabledAction, ListToolbarConfigSetSearchEnabledAction,
  ListToolbarConfigSetSortSelectorEnabledAction, ListToolbarConfigSetViewSelectorEnabledAction
} from './config/actions';

export type ListToolbarStateAction =
  ListToolbarConfigSetFilterEnabledAction | ListToolbarConfigSetSearchEnabledAction |
  ListToolbarConfigSetSortSelectorEnabledAction | ListToolbarConfigSetViewSelectorEnabledAction;
