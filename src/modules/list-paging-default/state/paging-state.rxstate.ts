import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/dist';
import { PagingStateAction } from './paging-state-action.type';

@Injectable()
export class PagingStateDispatcher extends StateDispatcher<PagingStateAction> {
}

export class PagingStateOrchestrator<T> extends StateOrchestrator<T, PagingStateAction> {
}
