import { ListViewRepeaterSetExpandedAction } from './expanded/actions';
import { ListViewRepeaterSetEditingAction } from './editing/actions';

export type RepeaterStateAction =
  ListViewRepeaterSetExpandedAction |
  ListViewRepeaterSetEditingAction;
