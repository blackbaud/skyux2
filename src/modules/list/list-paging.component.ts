import { ListState } from './state';
import { SkyListComponent } from '../list/list.component';
import { BehaviorSubject } from 'rxjs';

export abstract class ListPagingComponent {
  protected initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected state: ListState;
  protected list: SkyListComponent;

  constructor(state: ListState) {
    this.state = state;
  }

  public onListInit(list: SkyListComponent) {
    this.list = list;
  }
}
