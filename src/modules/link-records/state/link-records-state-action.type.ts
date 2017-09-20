import {
  SkyLinkRecordsMatchesLoadAction,
  SkyLinkRecordsMatchesSetStatusAction,
  SkyLinkRecordsMatchesSetItemAction
} from './matches/actions';
import {
  SkyLinkRecordsFieldsSetFieldsAction,
  SkyLinkRecordsFieldsClearFieldsAction
} from './fields/actions';
import { SkyLinkRecordsResultsLoadAction } from './results/actions';
import {
  SkyLinkRecordsSelectedSetSelectedAction,
  SkyLinkRecordsSelectedClearSelectedAction
} from './selected/actions';

export type SkyLinkRecordsStateAction =
  SkyLinkRecordsMatchesLoadAction | SkyLinkRecordsMatchesSetStatusAction |
  SkyLinkRecordsMatchesSetItemAction |
  SkyLinkRecordsFieldsSetFieldsAction | SkyLinkRecordsFieldsClearFieldsAction |
  SkyLinkRecordsResultsLoadAction |
  SkyLinkRecordsSelectedSetSelectedAction | SkyLinkRecordsSelectedClearSelectedAction;
