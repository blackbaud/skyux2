import {
  ListToolbarConfigSetFilterEnabledAction, ListToolbarConfigSetSearchEnabledAction,
  ListToolbarConfigSetSortSelectorEnabledAction, ListToolbarConfigSetViewSelectorEnabledAction
} from './config/actions';
import { ListToolbarItemsLoadAction } from './items/actions';

export type ListToolbarStateAction =
  ListToolbarConfigSetFilterEnabledAction | ListToolbarConfigSetSearchEnabledAction |
  ListToolbarConfigSetSortSelectorEnabledAction | ListToolbarConfigSetViewSelectorEnabledAction |
  ListToolbarItemsLoadAction;
