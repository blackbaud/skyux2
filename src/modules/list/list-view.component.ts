import { ListState } from './state';
import { OnDestroy } from '@angular/core';
import { SkyListComponent } from '../list/list.component';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

export abstract class ListViewComponent implements OnDestroy {
  protected viewName: string;
  protected state: ListState;
  protected list: SkyListComponent;
  protected subscriptions: Array<any> = [];
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

  get hasToolbar() {
    return this.state.map(s => s.toolbar.exists);
  }

  get active() {
    return this.state.map(s => s.views.active === this.viewId);
  }

  /* istanbul ignore next */
  public onViewActive() {
  }

  public onViewInactive() {
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
