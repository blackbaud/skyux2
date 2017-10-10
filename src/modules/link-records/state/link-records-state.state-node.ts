import { Injectable } from '@angular/core';
import { StateNode } from 'microedge-rxstate/dist';
import { SkyLinkRecordsStateModel } from './link-records-state.model';
import { SkyLinkRecordsStateDispatcher } from './link-records-state.rxstate';
import { SkyLinkRecordsMatchesOrchestrator } from './matches/matches.orchestrator';
import { SkyLinkRecordsFieldsOrchestrator } from './fields/fields.orchestrator';
import { SkyLinkRecordsResultsOrchestrator } from './results/results.orchestrator';
import { SkyLinkRecordsSelectedOrchestrator } from './selected/selected.orchestrator';

@Injectable()
export class SkyLinkRecordsState extends StateNode<SkyLinkRecordsStateModel> {
  constructor(initialState: SkyLinkRecordsStateModel, dispatcher: SkyLinkRecordsStateDispatcher) {
    super(initialState, dispatcher);

    this
      .register('matches', SkyLinkRecordsMatchesOrchestrator)
      .register('fields', SkyLinkRecordsFieldsOrchestrator)
      .register('results', SkyLinkRecordsResultsOrchestrator)
      .register('selected', SkyLinkRecordsSelectedOrchestrator)
      .begin();
  }
}
