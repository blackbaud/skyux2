// #region imports
import {
  EventEmitter
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';
// #endregion

export class SkyToastInstance {
  public get closed(): Observable<void> {
    return this._closed;
  }

  private _closed = new EventEmitter<void>();

  // TODO: Jsdoc here!
  public close() {
    this._closed.emit();
    this._closed.complete();
  }
}
