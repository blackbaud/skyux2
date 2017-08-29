import { Injectable } from '@angular/core';
import { StateNode } from 'microedge-rxstate/dist';
import { LinkRecordsStateModel } from './link-records-state.model';
import { LinkRecordsStateDispatcher } from './link-records-state.rxstate';
import { LinkRecordsMatchesOrchestrator } from './matches/matches.orchestrator';
import { LinkRecordsFieldsOrchestrator } from './fields/fields.orchestrator';
import { LinkRecordsResultsOrchestrator } from './results/results.orchestrator';
import { LinkRecordsSelectedOrchestrator } from './selected/selected.orchestrator';

@Injectable()
export class LinkRecordsState extends StateNode<LinkRecordsStateModel> {
  constructor(initialState: LinkRecordsStateModel, dispatcher: LinkRecordsStateDispatcher) {
    super(initialState, dispatcher);

    this
      .register('matches', LinkRecordsMatchesOrchestrator)
      .register('fields', LinkRecordsFieldsOrchestrator)
      .register('results', LinkRecordsResultsOrchestrator)
      .register('selected', LinkRecordsSelectedOrchestrator)
      .begin();
  }
}
