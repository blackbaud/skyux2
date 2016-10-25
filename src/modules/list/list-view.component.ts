import { ListState } from './state';
import { OnDestroy } from '@angular/core';
import { SkyListComponent } from '../list/list.component';
import { BehaviorSubject } from 'rxjs';
const moment = require('moment');

export abstract class ListViewComponent implements OnDestroy {
  protected viewName: string;
  protected state: ListState;
  protected list: SkyListComponent;
  protected hasToolbar: boolean = true;
  protected subscriptions: Array<any> = [];
  /* tslint:disable */
  private initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /* tslint:enable */
  private viewId: string = moment().toDate().getTime();

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

  get active() {
    return this.state.map(s => s.views.active === this.viewId);
  }

  public onListInit(list: SkyListComponent) {
    this.list = list;
  }

  public onViewActive() {
  }

  public onViewInactive() {
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
