import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/dist';
import { LinkRecordsStateAction } from './link-records-state-action.type';

@Injectable()
export class LinkRecordsStateDispatcher extends StateDispatcher<LinkRecordsStateAction> {
}

export class LinkRecordsStateOrchestrator<T> extends StateOrchestrator<T, LinkRecordsStateAction> {
}
