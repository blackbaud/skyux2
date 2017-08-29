import {
  LinkRecordsMatchesLoadAction,
  LinkRecordsMatchesSetStatusAction,
  LinkRecordsMatchesSetItemAction
} from './matches/actions';
import {
  LinkRecordsFieldsSetFieldsAction,
  LinkRecordsFieldsClearFieldsAction
} from './fields/actions';
import { LinkRecordsResultsLoadAction } from './results/actions';
import {
  LinkRecordsSelectedSetSelectedAction,
  LinkRecordsSelectedClearSelectedAction
} from './selected/actions';

export type LinkRecordsStateAction =
  LinkRecordsMatchesLoadAction | LinkRecordsMatchesSetStatusAction |
  LinkRecordsMatchesSetItemAction |
  LinkRecordsFieldsSetFieldsAction | LinkRecordsFieldsClearFieldsAction |
  LinkRecordsResultsLoadAction |
  LinkRecordsSelectedSetSelectedAction | LinkRecordsSelectedClearSelectedAction;
