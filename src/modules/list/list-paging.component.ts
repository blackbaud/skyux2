import { ListState, ListStateDispatcher } from './state';

export abstract class ListPagingComponent {
  protected state: ListState;
  protected dispatcher: ListStateDispatcher;

  constructor(
    state: ListState,
    dispatcher: ListStateDispatcher
  ) {
    this.state = state;
    this.dispatcher = dispatcher;
  }
}
