import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/core';
import { ChecklistStateAction } from './checklist-state-action.type';

@Injectable()
export class ChecklistStateDispatcher extends StateDispatcher<ChecklistStateAction> {
}

export class ChecklistStateOrchestrator<T> extends StateOrchestrator<T, ChecklistStateAction> {
}
