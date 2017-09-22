import { SkyLinkRecordsStateOrchestrator } from '../link-records-state.rxstate';
import { AsyncItem } from 'microedge-rxstate/dist';
let moment = require('moment');

import { SkyLinkRecordsFieldModel } from './field.model';
import {
  SkyLinkRecordsFieldsSetFieldsAction,
  SkyLinkRecordsFieldsClearFieldsAction
} from './actions';

export class SkyLinkRecordsFieldsOrchestrator
  extends SkyLinkRecordsStateOrchestrator<AsyncItem<{[key: string]:
    Array<SkyLinkRecordsFieldModel>}>> {
  constructor() {
    super();

    this
      .register(SkyLinkRecordsFieldsSetFieldsAction, this.setFields)
      .register(SkyLinkRecordsFieldsClearFieldsAction, this.clearFields);
  }

  private setFields(
    state: AsyncItem<{[key: string]: Array<SkyLinkRecordsFieldModel>}>,
    action: SkyLinkRecordsFieldsSetFieldsAction):
      AsyncItem<{[key: string]: Array<SkyLinkRecordsFieldModel>}> {
      let newStateItem = Object.assign({}, state.item);
      let fields = (newStateItem[action.key]) ? newStateItem[action.key] : [];
      let newFields = Object.assign(fields, action.fields).filter(f => f);
      newStateItem[action.key] = newFields;

      return new AsyncItem<{[key: string]: Array<SkyLinkRecordsFieldModel>}>(
        newStateItem, moment(), state.loading);
  }

  private clearFields(
    state: AsyncItem<{[key: string]: Array<SkyLinkRecordsFieldModel>}>,
    action: SkyLinkRecordsFieldsSetFieldsAction):
      AsyncItem<{[key: string]: Array<SkyLinkRecordsFieldModel>}> {
      let newStateItem = Object.assign({}, state.item);
      newStateItem[action.key] = undefined;

      return new AsyncItem<{[key: string]: Array<SkyLinkRecordsFieldModel>}>(
        newStateItem, moment(), state.loading);
  }
}
