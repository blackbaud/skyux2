import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/core';
import { ListStateAction } from './list-state-action.type';

@Injectable()
export class ListStateDispatcher extends StateDispatcher<ListStateAction> {
}

export class ListStateOrchestrator<T> extends StateOrchestrator<T, ListStateAction> {
}
