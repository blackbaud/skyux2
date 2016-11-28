import { ListState } from './state';
import { BehaviorSubject } from 'rxjs';

export abstract class ListPagingComponent {
  protected initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected state: ListState;

  constructor(state: ListState) {
    this.state = state;
  }
}
