import { ListState, ListStateDispatcher } from './state';
import { BehaviorSubject } from 'rxjs';

export abstract class ListPagingComponent {
  protected initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected state: ListState;
  protected dispatcher: ListStateDispatcher;

  constructor(state: ListState, dispatcher: ListStateDispatcher) {
    this.state = state;
    this.dispatcher = dispatcher;
  }
}
