import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/dist';
import { RepeaterStateAction } from './repeater-state-action.type';

@Injectable()
export class RepeaterStateDispatcher extends StateDispatcher<RepeaterStateAction> {
}

export class RepeaterStateOrchestrator<T> extends StateOrchestrator<T, RepeaterStateAction> {
}
