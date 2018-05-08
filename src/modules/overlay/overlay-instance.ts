import {
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subject
} from 'rxjs/Subject';

import 'rxjs/add/operator/asObservable';

@Injectable()
export class SkyOverlayInstance<T> {
  public get componentInstance(): T {
    return this._componentInstance;
  }

  public get destroyStream(): Observable<void> {
    return this._destroyStream;
  }

  private _componentInstance: T;
  private _destroyStream = new Subject<void>();

  public destroy(): void {
    this._destroyStream.next();
    this._destroyStream.complete();
  }
}
