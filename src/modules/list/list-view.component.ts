import {
  OnDestroy
} from '@angular/core';

import { ListState } from './state';
import { SkyListComponent } from '../list/list.component';

import {
  Observable
} from 'rxjs/Observable';

const moment = require('moment');

export abstract class ListViewComponent implements OnDestroy {
  public active: Observable<boolean>;

  protected viewName: string;
  protected state: ListState;
  protected list: SkyListComponent;
  protected subscriptions: Array<any> = [];
  protected hasToolbar: Observable<boolean>;

  private viewId: string = moment().toDate().getTime().toString();

  constructor(state: ListState, defaultName: string) {
    this.state = state;
    this.viewName = defaultName;

    this.hasToolbar = this.state.map(s => s.toolbar.exists);

    this.active = this.state.map(s => s.views.active === this.viewId);

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

  /* istanbul ignore next */
  public onViewActive() {
  }

  public onViewInactive() {
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
