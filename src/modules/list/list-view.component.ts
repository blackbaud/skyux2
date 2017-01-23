import { ListState } from './state';
import { SkyListComponent } from '../list/list.component';
import { BehaviorSubject, Observable } from 'rxjs';

let moment = require('moment');

export abstract class ListViewComponent {
  protected viewName: string;
  protected state: ListState;
  protected list: SkyListComponent;
  /* tslint:disable */
  private initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /* tslint:enable */
  private viewId: string = moment().toDate().getTime().toString();

  constructor(state: ListState, defaultName: string) {
    this.state = state;
    this.viewName = defaultName;
    this.active.distinctUntilChanged().subscribe(
      isActive => isActive ? this.onViewActive() : this.onViewInactive()
    );
  }

  get id() {
    return this.viewId;
  }

  get label() {
    return this.viewName;
  }

  get active(): Observable<boolean> {
    return this.state.map(s => s.views.active === this.viewId);
  }

  /* istanbul ignore next */
  public onViewActive() {
  }

  public onViewInactive() {
  }
}
